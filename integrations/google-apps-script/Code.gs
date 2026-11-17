/** Portfolio enquiry intake. No Google credentials or signing keys belong in this file. */
var PORTFOLIO_CONFIG = {
  spreadsheetId: "1vtrkhfXy_XevIxgG284C0fds4ks7t-zw9SG0k-ZyCds",
  sheetName: "Leads",
  notificationEmail: "mohammed@apsalautomation.com",
};
var PORTFOLIO_HEADERS = [
  "Submission ID", "Received At", "Name", "Company", "Email", "WhatsApp", "Service",
  "Industry", "Budget", "Project Details", "Source", "Lead Status", "Notification Status",
  "Notified At", "Payload Hash", "Notification Attempted At", "Notification Error",
];

function doGet() {
  return json_({ service: "portfolio-enquiries", version: 1 });
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 20000) return json_({ received: false, error: "invalid_request" });
    var envelope = JSON.parse(raw);
    var secret = PropertiesService.getScriptProperties().getProperty("ENQUIRY_SIGNING_SECRET");
    if (!secret || secret.length < 32 || !validSignature_(envelope, secret))
      return json_({ received: false, error: "unauthorized" });
    var data = validate_(JSON.parse(envelope.data));
    if (!data) return json_({ received: false, error: "invalid_enquiry" });
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return json_({ received: false, error: "busy" });
    try {
      var sheet = sheet_();
      checkHeaders_(sheet, false);
      var hash = payloadHash_(data);
      var row = findRow_(sheet, data.submissionId);
      if (row) {
        var existing = sheet.getRange(row, 1, 1, PORTFOLIO_HEADERS.length).getValues()[0];
        if (existing[14] !== hash) return json_({ received: false, error: "submission_conflict" });
        return json_({ received: true, submissionId: data.submissionId, duplicate: true });
      }
      var values = [
        data.submissionId, new Date().toISOString(), data.name, data.company, data.email,
        data.whatsapp, data.service, data.industry, data.budget, data.details,
        "apsal-portfolio-apps-script", "New", "Pending", "", hash, "", "",
      ].map(sheetText_);
      sheet.getRange(sheet.getLastRow() + 1, 1, 1, values.length).setValues([values]);
      SpreadsheetApp.flush();
      return json_({ received: true, submissionId: data.submissionId });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    // No lead data, credentials or internal Google errors are returned to visitors.
    return json_({ received: false, error: "storage_unavailable" });
  }
}

/** Run once after configuring Script Properties and authorizing the Google permissions. */
function setupPortfolioEnquiries() {
  var secret = PropertiesService.getScriptProperties().getProperty("ENQUIRY_SIGNING_SECRET");
  if (!secret || secret.length < 32) throw new Error("Configure ENQUIRY_SIGNING_SECRET first.");
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    checkHeaders_(sheet_(), true);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  if (!ScriptApp.getProjectTriggers().some(function (t) {
    return t.getHandlerFunction() === "sendPendingNotifications";
  })) ScriptApp.newTrigger("sendPendingNotifications").timeBased().everyMinutes(1).create();
  return "Headers checked; notification worker installed.";
}

/** Only this migration's Pending rows are eligible. Historical n8n rows are untouched.
 * Claim before sending; an uncertain send remains Review instead of automatically duplicating email.
 */
function sendPendingNotifications() {
  for (var count = 0; count < 20; count++) {
    if (MailApp.getRemainingDailyQuota() < 1) return;
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return;
    var sheet;
    var lead;
    try {
      sheet = sheet_();
      checkHeaders_(sheet, false);
      if (sheet.getLastRow() < 2) return;
      var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, PORTFOLIO_HEADERS.length).getValues();
      lead = rows.find(function (r) {
        return r[10] === "apsal-portfolio-apps-script" && r[12] === "Pending" && /^[a-f0-9]{64}$/.test(r[14]);
      });
      if (!lead) return;
      var row = findRow_(sheet, String(lead[0]));
      sheet.getRange(row, 13).setValue("Sending");
      sheet.getRange(row, 16).setValue(new Date().toISOString());
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
    var sent = false;
    try {
      var body = [
        "A new portfolio enquiry has been saved.", "",
        "Name: " + lead[2], "Business: " + lead[3], "Email: " + lead[4],
        "WhatsApp: " + (lead[5] || "Not provided"), "Service: " + lead[6],
        "Industry: " + lead[7], "Budget: " + lead[8], "", "Project description:",
        String(lead[9]), "", "Submission ID: " + lead[0],
        "Saved: " + lead[1], "",
        "https://docs.google.com/spreadsheets/d/" + PORTFOLIO_CONFIG.spreadsheetId + "/edit",
      ].join("\n");
      MailApp.sendEmail({
        to: PORTFOLIO_CONFIG.notificationEmail,
        subject: "Portfolio enquiry — " + lead[6],
        body: body,
        replyTo: String(lead[4]).replace(/^'(?=[=+\-@])/, ""),
        name: "Apsal Portfolio Enquiries",
      });
      sent = true;
    } catch (error) {
      // Delivery may be uncertain. Do not automatically retry and send duplicate notifications.
    }
    lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return;
    try {
      row = findRow_(sheet, String(lead[0]));
      if (!row) return;
      sheet.getRange(row, 13).setValue(sent ? "Sent" : "Review");
      if (sent) sheet.getRange(row, 14).setValue(new Date().toISOString());
      sheet.getRange(row, 17).setValue(sent ? "" : "Delivery uncertain; review before retrying.");
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
  }
}

function validSignature_(envelope, secret) {
  if (!envelope || envelope.version !== 1 || typeof envelope.data !== "string" ||
      !/^\d{13}$/.test(envelope.timestamp) || !/^[a-f0-9]{64}$/.test(envelope.signature) ||
      Math.abs(Date.now() - Number(envelope.timestamp)) > 300000) return false;
  var expected = hex_(Utilities.computeHmacSha256Signature(
    envelope.timestamp + "." + envelope.data, secret, Utilities.Charset.UTF_8
  ));
  var different = 0;
  for (var i = 0; i < expected.length; i++)
    different |= expected.charCodeAt(i) ^ envelope.signature.charCodeAt(i);
  return different === 0;
}

function validate_(d) {
  if (!d || d.source !== "apsal-portfolio" ||
      typeof d.submissionId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(d.submissionId)) return null;
  var limits = { name: [2,100], company: [0,150], email: [3,254], whatsapp: [0,30],
    service: [1,100], industry: [1,100], budget: [1,100], details: [15,3000] };
  for (var key in limits) {
    if (typeof d[key] !== "string" || d[key].length < limits[key][0] ||
        d[key].length > limits[key][1] || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(d[key])) return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) ||
      (d.whatsapp && !/^[+()\d\s-]{7,30}$/.test(d.whatsapp))) return null;
  if (["Digital Marketing & Lead Generation", "AI Workflow Automation", "AI Voice Assistant",
       "AI Agents & Customer Support", "Website Development", "CRM Automation", "Not Sure Yet"].indexOf(d.service) < 0) return null;
  if (["Real Estate", "Clinics & Healthcare", "E-commerce & D2C", "Service Business / SME", "Other"].indexOf(d.industry) < 0) return null;
  if (["Prefer to discuss", "Below ₹25,000", "₹25,000–₹50,000", "₹50,000–₹1,00,000", "Above ₹1,00,000"].indexOf(d.budget) < 0) return null;
  return d;
}

function payloadHash_(d) {
  var fields = [d.name, d.company, d.email, d.whatsapp, d.service, d.industry, d.budget, d.details];
  return hex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
    JSON.stringify(fields), Utilities.Charset.UTF_8));
}
function hex_(bytes) {
  return bytes.map(function (b) { return ("0" + ((b + 256) % 256).toString(16)).slice(-2); }).join("");
}
function sheetText_(value) {
  var text = String(value);
  return /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
}
function sheet_() {
  var sheet = SpreadsheetApp.openById(PORTFOLIO_CONFIG.spreadsheetId).getSheetByName(PORTFOLIO_CONFIG.sheetName);
  if (!sheet) throw new Error("Configured lead sheet is missing.");
  return sheet;
}
function findRow_(sheet, id) {
  if (sheet.getLastRow() < 2) return 0;
  var cell = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1)
    .createTextFinder(id).matchEntireCell(true).useRegularExpression(false).findNext();
  return cell ? cell.getRow() : 0;
}
function checkHeaders_(sheet, extend) {
  var existing = sheet.getRange(1, 1, 1, PORTFOLIO_HEADERS.length).getValues()[0];
  PORTFOLIO_HEADERS.forEach(function (name, index) {
    if (existing[index] === name) return;
    if (extend && index >= 14 && !existing[index]) {
      sheet.getRange(1, index + 1).setValue(name).setFontWeight("bold");
      sheet.setColumnWidth(index + 1, index === 15 ? 190 : 200);
      return;
    }
    throw new Error("Lead headers differ from the reviewed schema.");
  });
}
function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
