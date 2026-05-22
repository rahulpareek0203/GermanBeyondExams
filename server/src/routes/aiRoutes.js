import express from "express"
import OpenAI from "openai"

const router = express.Router()

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,

    baseURL: "https://api.groq.com/openai/v1"
});

// Test Route

router.post("/generate-practice", async(req, res) => {
    try {

        const { topic } = req.body;
                
        const completion = await client.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content: "You are a professional German tutor who creates beginner-friendly grammar exercises.",
                },

                {
                    role: "user",
                    content: `
                        Generate German grammar exercises for:

                        ${topic}

                        Return ONLY valid JSON.

                        Format:
                        {
                            "questions": [
                                {
                                    "type": "fill_blank",
                                    "question": "...",
                                    "answer": "...",
                            
                                }
                            ]
                        }
                    `,
                },
            ],

        })

        const raw = completion.choices[0].message.content;

        const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim()
        const parsed = JSON.parse(cleaned)

        res.json({
            success: true,
            exercises: parsed,
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: "Failed to generate exercises"
        })
    }
})

export default router;