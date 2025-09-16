
import { GoogleGenAI } from "@google/genai";
import { Model } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function optimizePrompt(originalPrompt: string, targetModels: Model[]): Promise<string> {
  const modelList = targetModels.join(', ');
  const systemInstruction = `You are a world-class expert in prompt engineering for large language models.
Your task is to rewrite a user's prompt to be optimized for the following AI models: ${modelList}.

Follow these rules strictly:
1.  Analyze the user's original prompt to understand their core intent.
2.  Enhance the prompt by adding clarity, context, constraints, and a clear desired output format.
3.  Ensure the prompt is structured to elicit the most accurate, detailed, and helpful response from the specified models.
4.  The final output MUST ONLY be the optimized prompt text itself. Do not include any pre-amble, explanations, titles, or markdown formatting like \`\`\`. Just return the pure, optimized prompt.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: originalPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to optimize prompt: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}
