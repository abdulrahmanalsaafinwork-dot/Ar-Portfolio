# Abdulrahman H. Alsaafin — Full-Stack Developer & Analyst Portfolio

A high-performance modern 3D portfolio and analytics platform built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**, featuring an interactive Business Intelligence Dashboard and integrations for enterprise and e-commerce projects.

---

## 🚀 Featured Portfolio Projects

### 1. SneakDup — Streetwear & Footwear E-Commerce Platform
- **Overview:** A full-stack sneaker and streetwear storefront featuring dynamic product catalogs, inventory tracking, customer authentication, an administrative POS checkout terminal, and Google Gemini AI sales analysis.
- **Technologies:** PHP, MySQL, JavaScript, HTML5/Tailwind, cURL, Google Gemini API, PHPMailer.
- **Repository:** [`https://github.com/abdulrahmanalsaafinwork-dot/SneakDup`](https://github.com/abdulrahmanalsaafinwork-dot/SneakDup)
- **Deployment:** Deployed on Hostinger LAMP environment.

---

### 2. Professional Sales & Inventory Analyst Dashboard
- **Route:** `/projects/sales-inventory-dashboard`
- **Source Workbook:** `public/Professional_Sales_Inventory_Analyst.xlsx`
- **Overview:** An interactive Business Intelligence dashboard converting 500 retail sales transactions and multi-sheet inventory models into executive data visualizations and KPIs.
- **Key Metrics & Analytics:**
  - **Total Revenue:** ₱3,417,020.30 across 490 completed transactions
  - **Gross Profit:** ₱1,269,820.30 (37.16% Gross Margin)
  - **Units Sold:** 792 units (Avg. Order Value: ₱6,973.51)
  - **Inventory Valuation:** ₱1,038,700 across 342 stock units (12 active SKUs)
  - **Acquisition Channels:** Walk-in (28.7%), TikTok Shop (26.5%), Facebook (22.6%), Website (22.2%)
- **Interactive Features:**
  - Dynamic multi-dimensional filtering (Channel, Category, Brand, Payment Method, Order Status, Month)
  - Interactive SVG sales trends and dual-metric profit comparison charts
  - Stock velocity monitoring with automated reorder risk indicators (`OK`, `REORDER`, `REORDER NOW`)
  - Searchable, sortable, paginated transaction data table with CSV export
  - Downloadable original Excel workbook and individual CSV datasets (`public/data/*.csv`)

---

### 3. Defensive Cybersecurity Specialization — Equifax Case Study
- A rigorous architectural case study analyzing the 2017 Equifax Apache Struts vulnerability, root causes, breach timeline, financial and reputational impact, and prevention best practices for modern developers.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** Next.js 14 (Pages Router)
- **UI Library:** React 18, Tailwind CSS, Framer Motion
- **Icons:** React Icons (`react-icons/hi2`, `react-icons/fa`, `react-icons/ri`)
- **Visuals & 3D Particles:** tsParticles, Swiper
- **Data Engine:** Structured CSV and JSON datasets (`data/` & `public/data/`), SheetJS (`xlsx`)
- **Database Schema:** Ready-to-deploy Supabase PostgreSQL schema (`supabase/schema.sql`)

---

## 📁 Project Structure

```bash
├── components/                  # Reusable UI components
│   ├── dashboard/               # BI Dashboard components
│   │   ├── ChannelChart.jsx     # Channel and payment mix charts
│   │   ├── DataTable.jsx        # Searchable paginated transactions table
│   │   ├── InsightsCard.jsx     # Automated data analyst findings
│   │   ├── InventoryTable.jsx   # Stock health and velocity table
│   │   ├── KPICard.jsx          # Executive metric cards
│   │   └── SalesChart.jsx       # Interactive monthly sales trend chart
│   ├── Header.jsx               # Site header
│   ├── Layout.jsx               # Master layout wrapper
│   ├── Nav.jsx                  # Floating navigation dock
│   └── Transition.jsx           # Framer motion page transitions
├── data/                        # Static JSON and CSV datasets
│   ├── analytics_data.json      # Structured sales & inventory dataset
│   ├── sales_data.csv           # Cleaned transaction records
│   ├── products.csv             # 12 SKU product catalog
│   ├── customers.csv            # Customer directory with regional cities
│   ├── monthly_analysis.csv     # Monthly revenue, COGS, and margin breakdown
│   └── inventory_analysis.csv   # Inventory velocity and reorder alerts
├── pages/                       # Next.js Pages router
│   ├── _app.jsx                 # App configuration & motion transitions
│   ├── index.jsx                # Portfolio homepage
│   ├── about/                   # About & qualifications page
│   ├── project.jsx/             # Interactive projects and credentials gallery
│   ├── projects/
│   │   └── sales-inventory-dashboard.jsx  # Interactive BI Dashboard
│   ├── work/                    # Featured work slider & case studies
│   └── contact/                 # Contact form & social channels
├── public/                      # Static assets & public downloads
│   ├── data/                    # Downloadable CSVs and JSON
│   ├── Professional_Sales_Inventory_Analyst.xlsx # Source Excel workbook
│   └── *.pdf                    # Project documentation & certificates
├── sneakdup/                    # SneakDup PHP/MySQL source files
├── supabase/
│   └── schema.sql               # Supabase PostgreSQL schema & RLS policies
├── next.config.js               # Next.js configuration & routing rewrites
├── tailwind.config.js           # Tailwind design tokens and theme colors
├── vercel.json                  # Vercel deployment & cache headers
└── package.json                 # Project dependencies & scripts
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
- Node.js 18.x or 20.x LTS
- npm 9+ or 10+

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/abdulrahmanalsaafinwork-dot/portfolio.git
cd portfolio

# Install dependencies cleanly
npm ci
```

### 3. Environment Variables (Optional)
Copy the example environment file:
```bash
cp .env.example .env.local
```
Configure your optional variables:
```env
NEXT_PUBLIC_SNEAKDUP_URL=https://sneakdup.com
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Test
```bash
npm run build
npm run start
```

---

## 🌐 Deployment Guide

### Deploying the Portfolio to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub portfolio repository.
4. Framework Preset: **Next.js** (automatically detected).
5. Build Command: `npm run build`
6. Output Directory: `.next`
7. Click **"Deploy"**.
8. All routes, including `/projects/sales-inventory-dashboard`, prerender cleanly as static pages with zero runtime overhead.

### Deploying SneakDup (PHP / MySQL)
- Deploy the `sneakdup/` directory to your Hostinger LAMP cPanel or VPS web root (`public_html/`).
- Import `sneakdup/sneakdup.sql` into your MySQL database.
- Configure `sneakdup/db_conn.php` with your database credentials.
- Set `NEXT_PUBLIC_SNEAKDUP_URL` in your Vercel dashboard environment variables to link the View Website button directly to your live production URL.

---

## 📄 License
MIT License. Created by [Abdulrahman H. Alsaafin](https://github.com/abdulrahmanalsaafinwork-dot).
