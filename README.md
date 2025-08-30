# Alie Network | Strategic Growth Engine - Automated Lead Generation Bot

This repository contains the source code for a proprietary, automated lead generation and data enrichment engine developed internally at **Alie Network**. This tool is the engine at the heart of our **HUBS (Weekly Implementation and Growth System)**, responsible for fueling our entire outreach and partnership pipeline.

We are sharing the architecture of this tool to provide a transparent look into our core philosophy: **We don't just *do* marketing; we build scalable, data-driven systems that create unfair advantages for our clients.** This bot is a testament to how we replace manual, reactive "hustle" with proactive, automated, and intelligent processes.

---

## The Strategic Imperative: From Manual Searching to Automated Discovery

In the fast-paced Web3 ecosystem, the biggest opportunities are fleeting. Projects are most in need of a growth partner in the weeks leading up to their Token Generation Event (TGE) or major launch. Manually searching for these projects is like trying to find a needle in a haystack—it's inefficient, unscalable, and always a step behind.

This bot was built to solve this fundamental problem. It acts as our automated scout, constantly scanning the entire Web3 landscape to identify high-potential projects precisely when they need us most.

This system allows us to:

*   **Identify Opportunities First:** By detecting "launch signals" before they become public knowledge, we engage with projects ahead of the competition.
*   **Operate at Scale:** The bot can analyze thousands of projects in the time it would take a human to research a handful, allowing us to cover the entire market.
*   **Make Data-Driven Decisions:** Every potential lead is enriched with objective data points, allowing our strategy team to focus their energy only on the most promising, A-tier projects that fit our specific weekly themes.

## Core Functionality & Features

This is not just a simple scraper. It is a multi-stage data aggregation and analysis engine designed for a single purpose: to find our next successful partner.

*   **Multi-Source Aggregation:** The bot doesn't rely on a single source of truth. It systematically pulls data from:
    *   **Broad-Spectrum APIs (e.g., CoinGecko):** To map the universe of existing projects within our target ecosystems (Base, Solana, etc.).
    *   **Launchpad & IDO Trackers (e.g., CryptoRank, ICO Drops):** To specifically target projects in their pre-launch phase, which are prime candidates for our "LAUNCHPAD" service package.
    *   **Deep Ecosystem Scanners (e.g., DeFiLlama):** To uncover new and emerging projects that may not yet be listed on major APIs.

*   **Intelligent "Launch Signal" Detection:** This is the core intelligence of the engine. The bot automatically visits a project's website and social media profiles to search for critical keywords and phrases like **"TGE," "IDO," "Public Sale," "Launching Soon," and "Airdrop,"** flagging these projects as high-priority leads.

*   **Automated Data Enrichment:** For every potential project, the bot gathers a complete dossier, including:
    *   Official Contact Emails (Corporate addresses only: `info@`, `partnerships@`, etc.)
    *   Social & Community Links (Twitter, Telegram, Discord)
    *   Technical Infrastructure Links (GitHub, Whitepaper, Docs)
    *   GitHub Activity (via API, to verify active development)
    *   Core Project Description & Slogan

*   **Seamless Database Integration:** All collected data is processed and fed directly into our central Google Sheets database. A robust **de-duplication check** based on the project's website URL ensures our database remains clean and efficient, preventing redundant outreach.

## Our Workflow: From Data to Deal

This bot is the first, critical step in a larger, well-defined system:

1.  **Automated Discovery (The Bot):** The engine runs, populating our database with hundreds of new, enriched, and strategically relevant leads.
2.  **Human Curation (The Team):** Our strategy leaders (Ziya & Berkay) analyze the bot's output, applying our proprietary scoring model to select only the A-class projects that perfectly align with our weekly goals.
3.  **Personalized Outreach (The Mail Assistant):** The curated data from the Sheets database is then fed into our *other* internal tool—a custom Gemini-powered Mail Assistant—which generates highly personalized, professional HTML email drafts based on our proven templates.

This end-to-end system ensures that our outreach is not only scalable but also consistently high-quality and strategically targeted.

## About Alie Network

**Alie Network** is the ultimate growth partner for ambitious Web3 projects. We are a technology-first agency that builds and leverages automated systems to deliver real engagement, measurable ROI, and sustainable market leadership. While our expertise lies in connecting projects with elite KOLs and strategic partners, our true product is the machine that makes it all happen.

## Connect With Us

Let's discuss how our data-driven systems can be put to work to build your project's growth engine.

*   **Email:** [info@alie.network](mailto:info@alie.network)
*   **Website:** [alie.network](https://alie.network)
*   **Linktree:** [linktr.ee/alienetwork](https://linktr.ee/alienetwork)
*   **X (Twitter):** [@networkAlie](https://x.com/networkAlie)
*   **LinkedIn:** [linkedin.com/in/alienetwork](https://www.linkedin.com/in/alienetwork)
*   **GitHub:** [@networkAlie](https://github.com/networkAlie)
*   **YouTube:** [@networkAlie](https://www.youtube.com/@networkAlie)
*   **Reddit:** [u/networkAlie](https://www.reddit.com/user/networkAlie)
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`



### Tier 1: En Yüksek Değerli ve Çekirdek Anahtar Kelimeler
Bunlar, projenizin tam olarak ne olduğunu anlatan, en yüksek arama potansiyeline sahip ve hem GitHub'da hem de Vercel uygulamanızın ana sayfasında (başlık, H1 etiketi) mutlaka bulunması gereken kelimelerdir.

*   **Web3 Lead Generation Bot:** (En güçlü ve profesyonel tanım. Ajansları ve B2B kullanıcıları hedefler.)
*   **Crypto Project Prospector:** (Marka adınız ve doğrudan ne yaptığını anlatıyor.)
*   **TGE & IDO Discovery Tool:** (En kritik değer teklifini vurgular: lansmanları bulma.)
*   **Automated Web3 Deal Flow:** (VC'leri, yatırımcıları ve kurumsal kullanıcıları hedefler.)
*   **Web3 Market Intelligence Platform:** (Daha sofistike bir tanım, veri ve analiz gücünü vurgular.)
*   **Crypto Launchpad Scout:** (Launchpad'lerin ve erken aşama yatırımcıların arayacağı bir terim.)

### Tier 2: Spesifik ve Açıklayıcı Anahtar Kelimeler
Bu kelimeler, projenizin özelliklerini ve hedeflediği alt nişleri detaylandırır. GitHub "topics" bölümü, README alt başlıkları ve web sitesindeki özellik listeleri için mükemmeldir.

*   **Functionality (İşlevsellik):**
    *   `Web3 Scraper`
    *   `Crypto Data Aggregator`
    *   `On-Chain Data Enrichment`
    *   `Automated Prospecting`
    *   `Contact Discovery Bot`
    *   `Lead Enrichment Tool`

*   **Targeted Events (Hedeflenen Olaylar):**
    *   `Upcoming TGE Tracker`
    *   `IDO Finder`
    *   `ICO Watchlist`
    *   `Airdrop Signal Tool`
    *   `Pre-launch Crypto Projects`
    *   `Token Launch Calendar`

*   **Ecosystems (Ekosistemler):**
    *   `Base Ecosystem Projects`
    *   `Solana Project Finder`
    *   `Layer-2 Project Discovery`
    *   `DeFi Protocol Scraper`
    *   `GameFi Lead Generation`

### Tier 3: Uzun Kuyruklu ve Teknik Anahtar Kelimeler (Long-Tail & Technical)
Bunlar, belirli bir soruna çözüm arayan veya teknik olarak nasıl çalıştığını merak eden kullanıcıların yapacağı aramalardır. Blog yazıları, teknik dokümantasyon ve GitHub'daki daha detaylı açıklamalar için idealdir.

*   **For Agencies & Marketers:**
    *   `How to find Web3 clients automatically`
    *   `Automated outreach tool for crypto projects`
    *   `Best tool to find projects before TGE`
    *   `Scaling a Web3 marketing agency`

*   **For VCs & Investors:**
    *   `Automated crypto deal flow software`
    *   `Find early-stage Web3 investment opportunities`
    *   `Seed stage crypto project database`
    *   `Tool to track upcoming token launches`

*   **For Developers:**
    *   `Python Web3 Scraper GitHub`
    *   `Scrape DeFiLlama with Python`
    *   `Automate Google Sheets with crypto data`
    *   `CoinGecko API automation script`
    *   `Web3 data pipeline example`

### Özet ve Stratejik Kullanım

*   **GitHub Repo (Web3-Project-Prospector):**
    *   **Description:** "An automated Web3 Lead Generation Bot and TGE Discovery Tool for marketing agencies and VCs. Scans Base, Solana, and more for pre-launch signals."
    *   **Topics:** `web3`, `lead-generation`, `crypto`, `prospecting`, `tge-tracker`, `ido-finder`, `deal-flow`, `python`, `web-scraper`, `base-ecosystem`, `solana`

*   **Vercel App (web3-project-prospector.vercel.app):**
    *   **Ana Başlık (`<h1>`):** "The Automated Web3 Project Prospector: Find Your Next Client Before They Launch."
    *   **Alt Başlık (`<h2>`):** "Your All-in-One TGE & IDO Discovery Tool for High-Impact Growth."
    *   **Paragraflar:** Yukarıdaki anahtar kelimeleri doğal bir şekilde metin içinde kullanarak ajansların, VC'lerin ve launchpad'lerin sorunlarını nasıl çözdüğünüzü anlatın.

Bu anahtar kelimeleri stratejik olarak kullanarak, projenizin doğru kitle tarafından, doğru zamanda bulunmasını sağlarsınız.
