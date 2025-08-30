
# Web3 Project Prospector

An AI-powered lead generation tool designed exclusively for [Alie Network's](https://www.alie.network/) **HUBS (Weekly Execution & Growth System)** initiative. This application transforms the slow, manual process of finding potential clients into a rapid, automated, and strategic operation.

The Web3 Project Prospector uses the Google Gemini AI to act as a **live web scraper**, targeting high-value sources to find, enrich, and qualify Web3 projects that are ideal candidates for Alie Network's growth services, especially the "LAUNCHPAD" and "ECOSYSTEM GROWTH" packages.

  <!-- TODO: Replace with an actual screenshot of the app -->

---

## The Problem: Scaling Agency Growth

For a Web3 growth agency, success depends on consistently finding the *right* projects at the *right* time. The traditional approach is flawed:

-   **Manual Labor:** Hours are spent manually scouring ICO calendars, ecosystem directories, and Twitter.
-   **Stale Data:** By the time a project is found, it might already have a marketing partner or be past the ideal engagement window.
-   **Missed Opportunities:** The most valuable clients—those in the pre-TGE or early launch phase—are the hardest to find and require constant monitoring of multiple platforms.

This manual bottleneck makes proactive, scalable outreach nearly impossible.

## The Solution: AI-Powered Live Scraping

The Web3 Project Prospector solves this by automating the entire discovery and initial data collection phase. Instead of relying on a static database or the AI's memory, it performs **real-time analysis** on strategic web pages.

**How It Works:**

1.  **Select a Target:** The user chooses a strategic source from a curated list (e.g., `ICO Drops / Upcoming`, `DeFiLlama / Base`).
2.  **Deploy the AI Scraper:** The user provides their Gemini API key and clicks "Prospect."
3.  **Live Analysis:** The Gemini AI is instructed to visit and parse the selected URL in real-time. It identifies all potential project links on the page.
4.  **Data Enrichment:** For each project found, the AI conceptually "visits" the project's own website to extract critical intelligence:
    -   Official Project Name & Website
    -   Contact Emails (`info@`, `partnerships@`, etc.)
    -   Social Links (Twitter, Telegram, Discord, GitHub)
    -   **Crucially, a "Launch Signal"**: Keywords like "IDO", "TGE", "Public Sale", indicating they are in the launch phase.
5.  **Deliver Actionable Leads:** The results are presented in a clear, structured table, ready to be exported to a CSV file perfectly formatted for the next step in the HUBS workflow, such as the Mail Assistant AI.

---

## Key Features

-   **🤖 Live AI Web Scraping:** Uses Google Gemini to parse data directly from live websites, ensuring maximum data freshness.
-   **🎯 Curated Strategic Sources:** A pre-defined list of the best platforms to find pre-TGE, launchpad, and newly listed projects.
-   **📧 Automated Contact Discovery:** The AI is specifically tasked with finding crucial partnership and info email addresses.
-   **🚀 Launch Signal Detection:** Automatically identifies and flags projects that are about to launch, representing the most valuable leads.
-   **📊 One-Click CSV Export:** Generates a ready-to-use CSV file with Turkish headers, designed for seamless integration with Alie Network's internal systems.
-   **🔐 Secure & Client-Side:** Your API key is stored only in your browser's `localStorage` and is never sent to a server. The entire application is client-side.

## Getting Started

This is a fully client-side application. To run it, you can open the `index.html` file or deploy it to any static hosting service.

### Prerequisites

-   A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### How to Use

1.  **Enter API Key:** When you first open the application, paste your Gemini API Key into the input field at the top. The key will be saved in your browser for future sessions.
2.  **Select Data Source:** Choose a strategic source from the dropdown menu. This tells the AI which website to scrape.
3.  **Start Prospecting:** Click the "Prospect" button. The button will be disabled until an API key is provided.
4.  **Review Results:** Wait for the AI to complete its task. The results will appear in the table, showing all the enriched data.
5.  **Export Data:** Click the "Export CSV" button to download your lead list, ready for your outreach campaign.

## Technology Stack

-   **Frontend:** React, TypeScript
-   **AI Model:** Google Gemini API (`@google/genai`)
-   **Styling:** Tailwind CSS

## Deployment

As a pure client-side application, this project can be deployed with zero configuration to any static hosting provider, such as:

-   Vercel
-   Netlify
-   GitHub Pages
-   AWS S3

Simply upload the contents of the project folder (`index.html`, `index.tsx`, etc.) to your provider of choice.
Email: info@alie.network
Website: alie.network
Linktree: linktr.ee/alienetwork
X (Twitter): @networkAlie
LinkedIn: linkedin.com/in/alienetwork
GitHub: @networkAlie
YouTube: @networkAlie
Reddit: u/networkAlie
