import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";


const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

router.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // AI ko ek 'Persona' dena taaki wo sirf shopping ki baatein kare
        const systemPrompt = `You are 'Zyntra Assistant', a helpful fashion expert. 
        Help users find clothes, suggest color combinations (e.g. 'White shirt goes with Blue jeans'), 
        and give styling tips. Keep it friendly and short. User says: ${prompt}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        
        res.json({ success: true, reply: response.text() });
    } catch (error) {
        res.status(500).json({ success: false, message: "AI Assistant is busy!" });
    }
});

export default router;
