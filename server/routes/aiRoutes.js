// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";


// const router = express.Router();
// import dotenv from "dotenv";
// dotenv.config();

// router.post("/chat", async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         // AI ko ek 'Persona' dena taaki wo sirf shopping ki baatein kare
//         const systemPrompt = `You are 'Zyntra Assistant', a helpful fashion expert. 
//         Help users find clothes, suggest color combinations (e.g. 'White shirt goes with Blue jeans'), 
//         and give styling tips. Keep it friendly and short. User says: ${prompt}`;

//         const result = await model.generateContent(systemPrompt);
//         const response = await result.response;
        
//         res.json({ success: true, reply: response.text() });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "AI Assistant is busy!" });
//     }
// });


import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            console.error("CRITICAL: GEMINI_API_KEY is missing in Env Variables");
            return res.status(500).json({ success: false, message: "API Key setup missing" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Model name check: 1.5-flash sabse fast aur stable hai
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemPrompt = `You are Zyntra Stylist, a helpful fashion expert for an Indian e-commerce site. 
        Keep answers short and trendy. User: ${prompt}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ success: true, reply: text });

    } catch (error) {
        // Yeh logs aapko Render ke "Logs" tab mein dikhenge
        console.error("GEMINI API ERROR:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "AI Assistant is busy!",
            error_debug: error.message // Yeh sirf testing ke liye hai
        });
    }
});

export default router;
// export default router;
