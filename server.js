const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GROQ_API_KEY = "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";  // replace this
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Response format follows OpenAI Chat Completion: choices[0].message.content
    const reply = response.data.choices[0].message.content.trim();

    res.json({ reply });
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Something went wrong with AI." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
