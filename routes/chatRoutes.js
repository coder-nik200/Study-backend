const express = require("express");
const getGeminiResponse = require("../controllers/geminiController");
const getGeminiResponse2 = require("../ChatBot/Gemini-3");

const router = express.Router();

router.post("/chat", getGeminiResponse);
router.post("/chat", getGeminiResponse2);

module.exports = router;
