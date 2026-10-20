# PRITAM DUTTA — Senior Portfolio Website

An award-level personal portfolio website for **Pritam Dutta**, entrepreneur and founder of **Cyption**, **Offroute**, and **Course to Excellence**.

Designed with a high-end design-studio aesthetic inspired by *product.inc*, *mikewilcockdesign.com*, and *mubien.com*.

---

## ✦ Key Features

- **Aesthetics & Palette**: Dark cinematic near-black background (`#0A0A0A`), warm off-white text (`#F2EFE9`), and a single warm gold accent (`#C9A24B` → `#E8C877` gradient) tailored to harmonise with the attached plum-and-gold event photos.
- **Light & Dark Mode**: Persistent toggle with smooth color transitions and contrast preservation.
- **Real Photography & Lightbox**:
  - `/public/images/bellebirds-team-certificate.jpg`: Official Digital Partner certificate & trophy presentation at *Bellebirds: The Fashion Street (Season 1)*.
  - `/public/images/bellebirds-stage-trophy.jpg`: Stage trophy felicitation with Cyption logo on the LED screen.
  - Interactive Lightbox with keyboard support (`Esc` to close, Left/Right arrow navigation).
- **Interactive Motion**:
  - **Preloader**: 0–100% counter with split curtain reveal into the hero.
  - **Hero**: Giant typography with masked line-by-line reveal and word-by-word animated headline.
  - **Abstract Canvas**: Interactive ambient gold mesh and radiant light pools.
  - **Custom Cursor**: Dot + trailing ring with dynamic `VIEW`, `DRAG`, `OPEN` labels on desktop hover.
  - **Magnetic Buttons**: Spring physics attraction towards pointer.
  - **Motion Toggle**: Accessible pause/play motion control, respecting `prefers-reduced-motion`.
  - **Lenis Smooth Inertial Scroll**: Synchronized scrolling experience.
  - **Sticky Stacking Cards**: 3 full-width cards for *Cyption*, *Offroute*, and *Course to Excellence*.
  - **Interactive Timeline**: 2022 / 2023–2024 / 2025 / 2026 and beyond.
  - **Consultancy Services Accordion**: 4 services with interactive expand/collapse.
  - **Upcoming Ventures**: Incubator scope with "In the works / Coming soon" badges.
  - **Behind the Journey**: Horizontal drag/scroll gallery featuring photo crops and labeled placeholders.
  - **Contact Form**: Next.js route handler (`/api/contact`), live validation, 6-topic dropdown, and feedback states.
  - **Closing Statement**: Duotone low-opacity real photo backdrop behind the founder's manifesto.
- **SEO & Performance**:
  - JSON-LD `Person` schema markup.
  - Dynamic `sitemap.xml` and `robots.txt`.
  - Meta tags, Open Graph card, and semantic HTML5 heading hierarchy.

---

## ✦ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ✦ Content & Image Customization

All copy is centralized in a single file:
- **`src/data/content.ts`**: Edit any text, social links, email, or venture details word for word.

### Images & Placeholders
- **Real Photos**: Located in `/public/images/` (`bellebirds-team-certificate.jpg`, `bellebirds-stage-trophy.jpg`).
- **Placeholders**: Located in `/public/placeholders/`:
  - `portrait-placeholder.svg` → replace with your portrait photo.
  - `biswa-bangla-news.svg` → replace with news clip or certificate.
  - `gallery-strategy-session.svg`
  - `gallery-speaking.svg`
  - `gallery-cyption-office.svg`
  - `gallery-client-collab.svg`

---

## ✦ Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Vanilla CSS Tokens
- **Animations**: Framer Motion + GSAP ScrollTrigger + Lenis
- **Typography**: Instrument Serif, Geist Sans, Geist Mono (`next/font/google`)
- **Icons**: Lucide React
