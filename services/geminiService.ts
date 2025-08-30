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
    launchSignal: { type: Type.STRING, description: "If found, a keyword or phrase indicating an upcoming launch (e.g., 'TGE', 'IDO', 'Public Sale', 'Upcoming'). This is a critical field." },
    source: { type: Type.STRING, description: "The URL of the page where this project was found." },
  },
  required: ["projectName", "websiteUrl", "shortDescription", "ecosystem", "source"],
};

export async function fetchProjectDataFromUrl(url: string, apiKey: string): Promise<Project[]> {
  if (!apiKey) {
    throw new Error("Gemini API key is required.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an AI web scraper. Your ONLY task is to meticulously analyze the HTML content of the provided URL and extract information about the web3 projects listed on that page. You must act as if you are directly visiting the URL and parsing its content.

    **Source URL to Scrape:** ${url}

    **Instructions:**
    1.  **Analyze the Page:** Parse the content of the source URL. Identify all links that lead to individual web3 projects. These might be in tables, lists, or cards.
    2.  **Extract Project Data:** For each project you identify on the page, perform the following data enrichment by conceptually "visiting" their websites and social media links to find the necessary information.
        *   **projectName:** The project's official name.
        *   **websiteUrl:** The direct URL to the project's own website.
        *   **shortDescription:** A brief, one-sentence description, often found near the project name or on their site's homepage.
        *   **Social Links:** Find URLs for Twitter, Telegram, Discord, and GitHub.
        *   **docsUrl:** Find a link to their documentation or whitepaper.
        *   **CRITICAL - contactEmails:** Scour the project's website for any corporate contact emails (e.g., 'info@', 'partnerships@', 'contact@'). This is a top priority.
        *   **ecosystem:** The blockchain ecosystem. Infer this from the source page or the project's own materials.
        *   **CRITICAL - launchSignal:** Look for any text on the source page or the project's site that indicates an upcoming launch. Keywords include "Upcoming", "IDO", "TGE", "Public Sale", "Airdrop Confirmed".
        *   **source:** Use the provided Source URL: "${url}"
    3.  **Data Integrity:**
        *   Only return data that is present on or directly linked from the Source URL. DO NOT use your general knowledge. This is a scraping task, not a knowledge recall task.
        *   If a piece of information (like a Telegram link or contact email) cannot be found, return \`null\` for that field.
        *   Return between 5 and 25 projects found on the page.

    **Output Format:**
    *   Your final output must be a JSON array of project objects, strictly adhering to the provided schema. Do not return any other text, explanations, or apologies.
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