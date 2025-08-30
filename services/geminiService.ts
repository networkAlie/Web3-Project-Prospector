import { GoogleGenAI, Type } from "@google/genai";
import { Project } from '../types';

// FIX: Removed `nullable: true` from schema properties as it's not a standard property for the Gemini API.
// Optionality is handled by not including fields in the `required` array.
// Also updated contactEmails description for consistency.
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
    ecosystem: { type: Type.STRING, description: "The primary blockchain ecosystem the project belongs to (e.g., 'Base', 'Solana')." },
    lastGithubActivity: { type: Type.STRING, description: "The date of the last commit to the main repository (YYYY-MM-DD), if available. Indicates technical activity." },
    launchSignal: { type: Type.STRING, description: "If found, a keyword indicating an upcoming launch (e.g., 'TGE', 'IDO', 'Airdrop', 'Public Sale'). This is a critical field." },
    source: { type: Type.STRING, description: "The conceptual source where the project was identified (e.g., 'CryptoRank/Upcoming', 'CoinGecko API', 'DeFiLlama')." },
  },
  required: ["projectName", "websiteUrl", "shortDescription", "ecosystem", "source"],
};

export async function fetchProjectData(theme: string, apiKey: string): Promise<Project[]> {
  if (!apiKey) {
    throw new Error("Gemini API key is required.");
  }
  const ai = new GoogleGenAI({ apiKey });

  // FIX: Replaced nested backticks with single quotes in the prompt string to fix parsing errors.
  const prompt = `
    You are a senior Python data engineer specializing in Web3 ecosystems, API integrations, and advanced web scraping. Your mission is to build a high-volume, strategically filtered list of potential clients for the Alie Network growth agency. The focus is on finding projects that are ideal for their "LAUNCHPAD" service package.

    This week's theme is: "${theme}"

    Your task is to act as an automated bot performing the following multi-source strategy:
    1.  **Deconstruct the Theme:** Understand the core request. Is it an ecosystem, a category, a stage (e.g., "upcoming"), or a combination?
    2.  **Simulate Multi-Source Data Gathering:**
        *   **Launchpad & IDO Sites (e.g., CryptoRank, ICO Drops):** First, prioritize finding projects in their "upcoming" or "active" sale phases. This is the primary target.
        *   **Ecosystem Directories (e.g., DeFiLlama):** For the specified ecosystem, find newly listed or smaller, promising projects that might not be on major trackers yet.
        *   **Broad Databases (e.g., CoinGecko):** Use your knowledge of projects on platforms like CoinGecko to find projects matching the theme, but filter for those that are still early-stage.
    3.  **Data Enrichment and Vetting (For each project found):**
        *   Go to the project's official website.
        *   **CRITICAL - Find Launch Signals:** Scour their recent announcements, blog, or Twitter feed for keywords like "TGE", "IDO", "Airdrop", "Public Sale", "Launching Soon", "Token Generation Event", "Fair Launch". If found, populate the 'launchSignal' field. This is a top priority.
        *   **CRITICAL - Find Contact Emails:** Find corporate emails (e.g., 'info@', 'partnerships@', 'contact@'). This is essential.
        *   Gather all other required data points: Social links, docs, GitHub, etc.
        *   **Check GitHub Activity:** Conceptually, check the main repository for the date of the last commit to gauge if the project is technically active.

    **Output Constraints:**
    *   Return a minimum of 15 and up to 30 projects matching the theme.
    *   Strongly prioritize projects where you can find a **Launch Signal** and **Contact Emails**.
    *   AVOID large, well-established, "blue-chip" projects. Focus on pre-launch, early-stage, and growth-phase projects.
    *   Your final output must be a JSON array of project objects, strictly adhering to the provided schema. Do not return anything else.
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
      throw new Error("Received empty response from AI.");
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