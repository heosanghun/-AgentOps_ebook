import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiConfigured: !!ai });
});

// AI Q&A and Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, chapterContext, bookTitle, chapterTitle } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API is not initialized. Please ensure GEMINI_API_KEY is configured in Secrets.",
      });
    }

    const systemInstruction = `
You are 'OAE AI Doctor' (OAE AI 학술 석학/자문 박사님), an expert assistant specializing in the "AI Paradigm 6-Part Series" (AI 패러다임 6부작) and the "Organic Autonomous Entity (OAE)" masterplan by Dr. Heo Sanghoon & Lee Juhwan.
Your tone is intellectual, highly professional, eloquent, warm, and inspiring.
You speak fluent Korean (and English if requested).

Context of Current Reading:
- Book: ${bookTitle || "OAE Masterpiece Series"}
- Chapter: ${chapterTitle || "General Discussion"}
${chapterContext ? `- Excerpt/Content:\n"""${chapterContext.substring(0, 3000)}"""` : ""}

Guidelines:
1. Answer questions concisely and deeply based on the philosophy of OAE:
   - System 1 (Mamba, 1D-CNN, low latency) vs System 2 (LLM, MCTS, World Model).
   - Value inversion: Efficiency becomes cheap commodity (How), whereas Human Friction, Effort, Defects, and Serendipity become the ultimate Organic Luxury (What/Why).
   - Machine Economy: A2A (Agent-to-Agent), AEO (Agent Engine Optimization), Machine Wallets, Micro-payments, Tech-Audit.
   - OAE 3-Prong Structure: OAE Quant (Silicon/Cash cow), OAE Bio (Earth/Organic Luxury Ample), OAE Tech (Air-gapped OS Appliance).
2. Format your response cleanly using Markdown with bullet points, bold key terms, and neat paragraphs.
3. If asked to summarize, provide a crisp 3-bullet key insight summary.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "답변을 생성할 수 없습니다.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    return res.status(500).json({
      error: err?.message || "Failed to process chat request",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
