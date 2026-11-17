---
version: alpha
name: Mohammed Apsal M
description: AI automation portfolio with a cobalt hero, warm paper surfaces, and real workflow examples.
colors:
  primary: "#1238ce"
  on-primary: "#ffffff"
  ink: "#151519"
  muted-ink: "#353536"
  paper: "#f6f4ee"
  mint: "#9de7d4"
  violet: "#c7b1f7"
  coral: "#ff795c"
  yellow: "#ffce2e"
  about-portrait: "#f0f2f5"
  contact-error: "#9e240f"
typography:
  hero-max:
    fontFamily: Instrument Sans
    fontSize: 5.6rem
    fontWeight: 700
    lineHeight: 1.01
    letterSpacing: -0.04em
  section-heading-max:
    fontFamily: Instrument Sans
    fontSize: 3.55rem
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: -0.04em
  body:
    fontFamily: DM Sans
    fontSize: 1rem
    lineHeight: 1.55
  about-caption:
    fontFamily: DM Sans
    fontSize: 0.875rem
rounded:
  square: 0px
spacing:
  content-max: 1216px
  gutter-desktop: 32px
  gutter-mobile: 20px
components:
  hero-action:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: 52px
  consultation-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.square}"
    height: 52px
---

# Portfolio design

## Overview

Lead with AI automation and show what Mohammed Apsal M built. The first screen explains the offer in plain language. Selected Work puts the voice assistant, real-estate lead qualification, and enquiry workflows directly below it. About carries the brief mention of digital marketing and personal branding.

The visual direction comes from the supplied portfolio screenshot and [Replyxor AI](https://replyxor-ai-website.vercel.app/). The token and component structure follows [Awesome DESIGN.md](https://github.com/VoltAgent/awesome-design-md).

## Colors

Use cobalt for the hero and navigation. Use warm paper for About and the project catalogue. Mint and violet distinguish the first two featured projects, coral marks services, yellow marks the process and hero portrait, and mint returns for Contact.

Keep the About portrait on its light gray backdrop. The name and location sit below the image on the same paper as the surrounding text. Keep project statuses and form errors readable in the context of their surfaces.

## Typography

Instrument Sans sets the headings and wordmark. DM Sans sets body copy, controls, and captions. The hero headline stays on two lines across the tested widths. Its desktop scale is defined by `clamp(2.35rem, 6.15vw, 5.6rem)`, with a separate mobile scale. Contact email, phone, and location use the same 16 px size.

## Layout

Align the navigation and page sections to the same content width and gutters. Stack the hero at 690 px and below. Featured projects use two columns from 760 px, with the enquiry workflow spanning the row. Use 64–88 px of vertical space for standard sections.

## Elevation & Depth

On the homepage and project catalogue, use changes in surface color to distinguish sections and cards. Keep the existing dark surfaces in case-study detail pages, where they frame workflow images and recordings.

## Shapes

Use square corners for the hero portrait, featured project tiles, consultation buttons, and contact fields. Leave the About portrait caption on the page surface.

## Components

- **Navigation and calls to action.** Spell the name `Mohammed Apsal M`. Use **Request a Free Consultation** for the main action and route it to the enquiry form. Keep **Explore My Work** as the secondary hero action.
- **Portraits.** Show the grayscale cutout on yellow in the hero. Reuse the cutout in color on light gray in About.
- **Project cards.** Use real workflow images or a labelled workflow diagram. Keep the project status close to the summary so visitors know which workflows have recorded tests and which are implementation previews.
- **Enquiry form.** Show inline errors, focus the first invalid field below the fixed header, and keep the email draft and WhatsApp options discoverable.

Use [portfolio-design.css](src/portfolio-design.css) for page colors and responsive component styling, and [styles.css](src/styles.css) for type, shared layout, and form behavior. Check desktop, tablet, and mobile after any change to these files.
