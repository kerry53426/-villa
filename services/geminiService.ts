import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client only if API key is present
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const refineText = async (text: string, instruction: string): Promise<string> => {
  if (!ai) {
    throw new Error("Gemini API Key is missing. Please configure process.env.API_KEY.");
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