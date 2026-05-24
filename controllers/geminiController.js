const generate = require("../ChatBot/Gemini-2.5");
const { getFallBackReply } = require("./fallBackBot");

const getGeminiResponse = async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.json({ reply: "Please ask something 🙂" });
  }

  try {
    const reply = await generate(message);

    return res.json({
      reply,
      mode: "gemini",
    });
  } catch (error) {
    console.error("❌ Gemini failed → using fallback 🤖");

    const fallbackReply = getFallBackReply(message);

    return res.json({
      reply: fallbackReply,
      mode: "fallback",
    });
  }
};

module.exports = getGeminiResponse;
