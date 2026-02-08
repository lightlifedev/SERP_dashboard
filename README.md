# 🧭 SERP Dashboard [Project ID: P-ec498f31]

A modern dashboard for tracking SERP (Search Engine Results Page) scans and keyword rankings. Manage domains, run scans, compare rankings, and monitor search visibility in one place.

---

## 📚 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## 🧩 About

This project provides an intuitive interface for managing SERP tracking: view keyword rankings, run and compare scans, filter by labels and search criteria, and export data. It was built to simplify SEO monitoring and keyword performance analysis using a React frontend with a clean, component-based design.

---

## ✨ Features

- **Keyword & domain tracking** – View and manage keywords per domain with summary stats and trend indicators
- **SERP scans** – Create, edit, and run scans with filters (location, device, etc.)
- **Compare mode** – Compare two scans side-by-side for ranking changes
- **Search & filters** – Filter by labels, search terms, and date ranges
- **Export** – Export keyword/scan data (e.g. PDF) for reporting
- **Responsive UI** – Built with shadcn/ui and Tailwind for a consistent, accessible experience

---

## 🧠 Tech Stack

| Category   | Technologies |
| ---------- | ------------ |
| Languages  | TypeScript, JavaScript |
| Frameworks | React 18, Vite |
| UI         | shadcn/ui, Radix UI, Tailwind CSS, Lucide icons |
| Routing    | TanStack Router |
| Data       | React Query (TanStack Query), Zod (validation) |
| Tools      | ESLint, PostCSS, date-fns, Recharts, jsPDF, html2canvas |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/SERP_dashboard.git

# Navigate to the project directory
cd SERP_dashboard

# Install dependencies
npm install
```

---

## 🚀 Usage

```bash
# Start the development server
npm run dev
```

Then open your browser and go to:

👉 [http://localhost:5173](http://localhost:5173)

**Other scripts:**

- `npm run build` – Production build
- `npm run preview` – Preview production build locally
- `npm run lint` – Run ESLint

---

## 🧾 Configuration

Create a `.env` file in the project root if you need environment variables (e.g. for a future API or Supabase backend):

```env
# Example – adjust to your setup
# VITE_API_URL=your_api_url_here
# VITE_SUPABASE_URL=your_supabase_url_here
# VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

The app currently runs without required env vars and can use mock data.

---

## 🖼 Screenshots

![Dashboard Main View](https://raw.githubusercontent.com/lightlifedev/SERP_dashboard/main/public/screenshot1.png)
![Detailed Analytics](https://raw.githubusercontent.com/lightlifedev/SERP_dashboard/main/public/screenshot2.png)


<!-- ![Dashboard overview](docs/screenshot-dashboard.png) -->

---

## 📜 API Documentation

This project is a frontend dashboard. If you add a backend or integrate with an API, list endpoints here or link to a separate API doc:

- `GET /api/...` – _Describe endpoint_
- `POST /api/...` – _Describe endpoint_

---

## 📬 Contact

- **Author:** Light Life
- **Email:** light.life.dev@gmail.com
- **GitHub:** [@lightlifedev](https://github.com/lightlifedev)

---

## 🌟 Acknowledgements

- [Lovable](https://lovable.dev) – Project hosting and deployment
- [shadcn/ui](https://ui.shadcn.com) – UI components
- [Vite](https://vitejs.dev) – Build tooling
- [TanStack](https://tanstack.com) – Router and Query libraries
