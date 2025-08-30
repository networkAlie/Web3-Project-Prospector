import { GoogleGenAI, Type } from "@google/genai";
import { Project } from '../types';

const projectSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING, description: "The official name of the project." },
    websiteUrl: { type: Type.STRING, description: "The full URL to the project's main website. This is a primary identifier." },
    shortDescription: { type: Type.STRING, description: "A one or two-sentence slogan or description of what the project does." },
    twitterUrl: { type: Type.STRING, description: "The full URL to the project's official Twitter/X profile." },
    telegramUrl: { type: Type.STRING, description: "The full URL to the project's official Telegram group or channel." },
    discordUrl: { type: Type.STRING, description: "The full URL to the project's official Discord server." },
    githubUrl: { type: Type.STRING, description: "The full URL to the project's official GitHub organization or main repository." },
    docsUrl: { type: Type.STRING, description: "The full URL to the project's documentation, whitepaper, or litepaper." },
    contactEmails: { type: Type.STRING, description: "A comma-separated string of general contact email addresses (e.g., info@, contact@, partnerships@). Do not include personal emails." },
    ecosystem: { type: Type.STRING, description: "The primary blockchain ecosystem the project belongs to (e.g., 'Base', 'Solana'). If not obvious, infer from the source." },
    lastGithubActivity: { type: Type.STRING, description: "The date of the last commit to the main repository (YYYY-MM-DD), if available. Indicates technical activity." },
    launchSignal: { type: Type.STRING, description: "If found, a keyword or phrase indicating an upcoming launch (e.g., 'TGE', 'IDO', 'Public Sale', 'Upcoming', 'Testnet'). This is a critical field." },
    source: { type: Type.STRING, description: "The URL of the page where this project was found." },
  },
  required: ["projectName", "websiteUrl", "shortDescription", "ecosystem", "source"],
};

export async function fetchProjectDataFromUrl(url: string, apiKey: string): Promise<Project[]> {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a specialized, real-time AI web scraping agent. Your one and only function is to access the provided URL at this exact moment, parse its live HTML content, and extract data about the web3 projects listed. You must operate without using any of your pre-existing knowledge. Your information must come *exclusively* from the content of the URL as it exists right now.

    **Source URL to Scrape in Real-Time:** ${url}

    **Primary Goal:** Your main objective is to identify projects that are *upcoming*, *unlaunched*, in *testnet*, or have clear *pre-TGE signals*. Prioritize these projects above all others. If the source URL is for a specific ecosystem (e.g., contains 'Base' in its name or URL), focus exclusively on projects within that ecosystem. Already-launched projects are a lower priority.

    **Critical Directives:**
    1.  **HTTP Request Simulation:** You must simulate a fresh HTTP GET request to the Source URL. Do not rely on any cached versions or prior knowledge of this page. The data must be current and real.
    2.  **Live DOM Analysis:** Meticulously analyze the returned HTML structure. Identify all elements (links, table rows, cards) that represent individual web3 projects.
    3.  **Data Enrichment via Conceptual Navigation:** For each project identified on the source page, you will conceptually "navigate" to its own website and social media links to find the required information. This is also a real-time task.
        *   **projectName:** The project's official name.
        *   **websiteUrl:** The direct URL to the project's own website.
        *   **shortDescription:** A brief, one-sentence description, often found near the project name or on their site's homepage.
        *   **Social Links:** Find URLs for Twitter, Telegram, Discord, and GitHub.
        *   **docsUrl:** Find a link to their documentation or whitepaper.
        *   **CRITICAL - contactEmails:** Scour the project's website for any corporate contact emails (e.g., 'info@', 'partnerships@', 'contact@'). This is a top priority.
        *   **ecosystem:** The blockchain ecosystem. Infer this from the source page (e.g., if scraping from a page about 'Base', the ecosystem is 'Base') or the project's own materials.
        *   **CRITICAL - launchSignal:** This is your MOST IMPORTANT task. Look for any text on the source page or the project's site that indicates an upcoming launch. Keywords include "Upcoming", "IDO", "TGE", "Public Sale", "Airdrop Confirmed", "Launching Soon", "Testnet Live", "Pre-sale". This information is time-sensitive and must be current. If no signal is found, return null.
        *   **source:** Use the provided Source URL: "${url}"
    4.  **Strict Data Integrity Rules:**
        *   **ABSOLUTE RULE:** Your entire response must be based *only* on the data you can access from the Source URL and its linked project pages *at this moment*. If you cannot access a URL or find a piece of information, you must return \`null\` for that field. Do not invent, assume, or recall data. This is a scraping task, not a knowledge retrieval task.
        *   Return between 5 and 25 *real* projects found on the page to ensure a quality sample. Do not list projects that aren't actually present on the source URL.

    **Output Format:**
    *   Your final output must be a JSON array of project objects, strictly adhering to the provided schema. Do not output any other text, explanations, or introductory phrases. Your response should begin with \`[\` and end with \`]\`.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: projectSchema,
        },
      },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
      throw new Error("Received empty response from AI. The source might be empty or un-scrapable.");
    }

    const parsedData = JSON.parse(jsonString);
    
    if (!Array.isArray(parsedData)) {
      throw new Error("AI response is not a valid array.");
    }

    return parsedData as Project[];

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to process the request with the AI model.");
  }
}