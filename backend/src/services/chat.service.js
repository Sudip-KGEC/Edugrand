import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../utils/ApiError.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// primary model first, then fallbacks (comma separated in .env)
const models = [
  process.env.GEMINI_MODEL,
  ...(process.env.GEMINI_FALLBACK_MODELS || "").split(","),
]
  .map((m) => m?.trim())
  .filter(Boolean);

const SYSTEM_PROMPT = `You are the assistant for a scholarship portal.
Reply in plain text, maximum 2 short sentences and 30 words. Never use lists, headings, markdown or emojis.
Give the direct answer first. No introductions, no filler, no repeating the question.
Help only with scholarship eligibility, deadlines, documents and how to apply.
If the user greets you, greet back in one short sentence and ask what they want to know.
If the message is gibberish or unrelated to scholarships or education, reply only: "Sorry, I didn't get that. Ask me about scholarships."
If unsure about a specific deadline or amount, say so and point to the scholarship's official page.`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isBusy = (err) => err.status === 503 || err.status === 429;


const shorten = (text) => {
  const clean = text.replace(/[*#_`]/g, "").replace(/\s+/g, " ").trim();
  const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
  return sentences.slice(0, 2).join(" ").trim();
};

export const answer = async (message, history = []) => {
  const contents = [
    ...history.slice(-4).map((t) => ({
      role: t.role === "bot" ? "model" : "user",
      parts: [{ text: t.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            maxOutputTokens: 1000,
            temperature: 0.2,
          },
        });
        if (res.text) return { reply: shorten(res.text) };
        break; // empty reply: next model
      } catch (err) {
        console.error(`Gemini failed on ${model} (try ${attempt}):`, err.message);
        if (!isBusy(err) || attempt === 2) break;
        await sleep(400);
      }
    }
  }

  throw new ApiError(502, "Chat is unavailable right now, please try again");
};