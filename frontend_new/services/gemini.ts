import { GoogleGenAI, Chat, GenerateContentStreamResult } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGemini = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
};

export const getChatSession = (): Chat => {
  if (!ai) {
    // This handles the case where api key is selected but context not ready
    if (process.env.API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        throw new Error("Gemini AI not initialized. Please select an API key.");
    }
  }

  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are an expert hedge fund strategy assistant. 
        Your goal is to help the user build, refine, and backtest investment strategies.
        You have deep knowledge of finance, technical indicators, macroeconomics, and risk management.
        
        When a user provides a strategy idea, analyze it for:
        1. Clarity and feasibility.
        2. Potential risks (market, liquidity, volatility).
        3. Key performance indicators (Sharpe ratio, max drawdown, etc.).
        
        Keep your responses professional, concise, and data-driven. 
        If asked to backtest, simulate a backtest result based on historical market trends (since you don't have real-time access to a backtesting engine, provide a plausible simulation based on standard market behavior for such a strategy).
        
        Format your responses with clear headings and bullet points where appropriate.`,
      },
    });
  }
  return chatSession;
};

export const sendMessage = async (message: string): Promise<GenerateContentStreamResult> => {
  const chat = getChatSession();
  return await chat.sendMessageStream({ message });
};