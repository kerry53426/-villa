import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client safely
let apiKey = '';
try {
  // Check if process is defined (Node.js/Webpack/Parcel environment)
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    apiKey = process.env.API_KEY;
  }
} catch (error) {
  console.warn("Gemini API Key: Unable to access process.env");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const refineText = async (text: string, instruction: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key is missing. Skipping AI refinement.");
    return text;
  }

  try {
    const prompt = `
      You are a world-class luxury brand strategist and copywriter.
      
      Task: Rewrite or enhance the following text based on this instruction: "${instruction}".
      
      Original Text:
      "${text}"
      
      Constraints:
      - Maintain a sophisticated, elite, and professional tone suitable for High-Net-Worth Individuals (HNWIs).
      - Output ONLY the rewritten text. Do not add introductory or concluding remarks.
      - Keep the formatting (markdown) consistent.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for simple text tasks to reduce latency
      }
    });

    return response.text || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};