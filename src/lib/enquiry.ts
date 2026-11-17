import { z } from "zod";
export const SERVICE_OPTIONS = [
  "Digital Marketing & Lead Generation",
  "AI Workflow Automation",
  "AI Voice Assistant",
  "AI Agents & Customer Support",
  "Website Development",
  "CRM Automation",
  "Not Sure Yet",
] as const;
export const INDUSTRY_OPTIONS = [
  "Real Estate",
  "Clinics & Healthcare",
  "E-commerce & D2C",
  "Service Business / SME",
  "Other",
] as const;
export const BUDGET_OPTIONS = [
  "Prefer to discuss",
  "Below ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "Above ₹1,00,000",
] as const;
export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name.").max(100),
    company: z.string().trim().max(150).default(""),
    email: z.string().trim().email("Please enter a valid email address.").max(254),
    whatsapp: z
      .string()
      .trim()
      .max(30)
      .refine(
        (value) => !value || /^[+()\d\s-]{7,30}$/.test(value),
        "Please enter a valid WhatsApp number, or leave it blank.",
      )
      .default(""),
    service: z.enum(SERVICE_OPTIONS),
    industry: z.enum(INDUSTRY_OPTIONS).default("Other"),
    budget: z.enum(BUDGET_OPTIONS).default("Prefer to discuss"),
    details: z
      .string()
      .trim()
      .min(15, "Please describe your business challenge in at least 15 characters.")
      .max(3000),
    website: z.string().max(0),
  })
  .strict();
export type Enquiry = z.infer<typeof enquirySchema>;
