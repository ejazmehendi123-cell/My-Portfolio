# Master Prompt: Reproducing Utkarsh Jain's Portfolio Style for Mohammad Ejaz Mehendi

Copy and paste the prompt below into any AI coding model to build or reproduce this cinematic portfolio.

---

### PROMPT:

```text
Act as a Principal Frontend Architect & UI/UX Specialist. Build a production-ready developer portfolio for Mohammad Ejaz Mehendi that visually and structurally mirrors the dark, cinematic, editorial design of https://jainutkarsh.vercel.app/.

### Key Aesthetic Requirements:
1. Palette: Pure black (#000000) background, deep dark card panels (#080808, #050505), crisp white typography, and vibrant electric crimson/red accents (#ff0033 / #ff1a47) with glowing borders and text shadows.
2. Typography: High-contrast condensed display font (Syne / Outfit) for headings, combined with JetBrains Mono for technical tags, dates, and labels.
3. Atmospheric Background: Interactive HTML5 Canvas particle star field with smooth parallax scrolling and subtle red radial glow behind section titles.
4. Custom Cursor: Circle-shaped custom cursor that follows mouse movement with smooth inertia interpolation and expands on interactive hover elements.
5. Smooth Motion: Scroll-triggered reveal animations using Framer Motion (`useInView`).

### Portfolio Sections & Content Structure:
- Navbar: Minimalist fixed header (`EJAZ`, `[ME]`), smooth-scroll links, mobile drawer navigation.
- Hero Section:
  - Heading: "MOHAMMAD EJAZ MEHENDI" with "FULL STACK DEVELOPER & COMPUTER VISION ENTHUSIAST"
  - Tagline: "BUILDING INTELLIGENT SYSTEMS & SCALABLE EXPERIENCES"
  - Status indicator: Pulsing red dot "AVAILABLE FOR FULL STACK DEVELOPER INTERNSHIPS"
  - Primary CTA: Download Resume (`Resume3.pdf`) & View Projects
- About Section:
  - Profile card with image fallback and quick stat badges (10+ Projects Built, CGPA 9.36, 200+ LeetCode problems solved, B.Tech CSE 3rd Year).
  - Concise bio highlighting Full Stack Development, Computer Vision, and Machine Learning.
- Projects Section:
  - Modern editorial project cards with index numbers (01, 02, 03), title, tech stack badges, description, and GitHub code link.
  - Featured Projects (3 total):
    1. Qstream – Micro-Learning Platform (React.js, Node.js, Supabase, JWT, Socket.IO)
    2. Unified Student Placement System – Placement Portal (React.js, Node.js, Supabase, JWT, Socket.IO)
    3. Bank Account Management System – Secure Banking Portal (React.js, Node.js, MongoDB, JWT, Socket.IO) -> https://github.com/ejazmehendi123-cell/Bank-Account-Management
- Tech Stack: Categorized capabilities (Languages, Frontend, Backend & Database, Tools & Concepts) rendered as hover-reactive glass tags over a subtle grid background.
- Experience Section: Vertical timeline with glowing red node points.
  - Syntexchub – Full Stack Developer Intern (Jun 2026 – Jul 2026)
- Achievements & Certifications: Grid of numerical highlights and clickable certification lists (NVIDIA Supercomputing Club Co-Lead, HackerRank Problem Solving, IIT Bombay Techfest, Google Cloud Launchpad).
- Education Section: Card visually matching reference design with Ramdeobaba University, B.Tech CSE (2024–2028), CGPA 9.36 badge in red, and core subject chips.
- Contact Section: Bold heading "Let's Build Something Together", email (`ejazmehendi123@gmail.com`), phone (`+91 9021712237`), location (`Nagpur, MH`), GitHub/LinkedIn/LeetCode links, and interactive contact form.
- Footer: Copyright, location, and social links.

### Tech Stack:
- Framework: React + Vite
- Styling: Vanilla CSS with custom design tokens (`src/index.css`)
- Animation: Framer Motion
- Icons: Lucide React + custom inline SVGs for brand icons
```
