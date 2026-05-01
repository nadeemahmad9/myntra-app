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


// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// router.post("/chat", async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         if (!process.env.GEMINI_API_KEY) {
//             console.error("CRITICAL: GEMINI_API_KEY is missing in Env Variables");
//             return res.status(500).json({ success: false, message: "API Key setup missing" });
//         }

//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
//         // Model name check: 1.5-flash sabse fast aur stable hai
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//         const systemPrompt = `You are Zyntra Stylist, a helpful fashion expert for an Indian e-commerce site. 
//         Keep answers short and trendy. User: ${prompt}`;

//         const result = await model.generateContent(systemPrompt);
//         const response = await result.response;
//         const text = response.text();

//         res.json({ success: true, reply: text });

//     } catch (error) {
//         // Yeh logs aapko Render ke "Logs" tab mein dikhenge
//         console.error("GEMINI API ERROR:", error.message);
//         res.status(500).json({ 
//             success: false, 
//             message: "AI Assistant is busy!",
//             error_debug: error.message // Yeh sirf testing ke liye hai
//         });
//     }
// });

// export default router;
// export default router;





// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// router.post("/chat", async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const apiKey = process.env.GEMINI_API_KEY;

//         if (!apiKey) {
//             return res.status(500).json({ success: false, message: "API Key missing" });
//         }

//         // Direct API Call (Bina SDK ke) - v1 version use karenge jo stable hai
//         const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

//         const response = await axios.post(url, {
//             contents: [{
//                 parts: [{
//                     text: `You are Zyntra Stylist. Help the user with fashion. User: ${prompt}`
//                 }]
//             }]
//         }, {
//             headers: { 'Content-Type': 'application/json' }
//         });

//         // Response extract karein
//         const aiReply = response.data.candidates[0].content.parts[0].text;

//         res.json({ success: true, reply: aiReply });

//     } catch (error) {
//         console.error("AXIOS AI ERROR:", error.response?.data || error.message);
//         res.status(500).json({ 
//             success: false, 
//             message: "AI Stylist is busy!",
//             error_details: error.response?.data?.error?.message || error.message
//         });
//     }
// });

// export default router;


import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ success: false, message: "API Key missing in .env" });
        }

        // ✅ Updated URL: v1 version + gemini-1.5-flash model
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await axios.post(url, {
            contents: [{
                parts: [{
                    text: `You are Zyntra Stylist, a fashion expert for a Myntra-like store. 
                    User question: ${prompt}`
                }]
            }]
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data && response.data.candidates) {
            const aiReply = response.data.candidates[0].content.parts[0].text;
            res.json({ success: true, reply: aiReply });
        } else {
            throw new Error("Invalid response structure from Google");
        }

    } catch (error) {
        console.error("DETAILED ERROR:", error.response?.data || error.message);
        
        // Agar ab bhi 404 aaye, toh iska matlab API Key ka issue hai
        res.status(500).json({ 
            success: false, 
            message: "AI Stylist is busy!",
            error_details: error.response?.data?.error?.message || error.message
        });
    }
});

export default router;
