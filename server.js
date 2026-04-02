import express from "express";
import fetch from "node-fetch";
import rateLimit from "express-rate-limit"; // 👈 ICI

const app = express();

app.use(express.json());

// 👇 ICI tu mets la protection
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // max 100 requêtes par IP
}));

app.post("/api", async (req, res) => {
  const question = req.body.question;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer TON_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: question }]
    })
  });

  const data = await response.json();

  res.json({
    reponse: data.choices[0].message.content
  });
});

app.listen(3000, () => console.log("Serveur lancé"));