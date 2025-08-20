import express from "express";
import { getFromGpt } from "../utils/getFromGpt.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { provider, model, prompt } = req.body;

    let responseText;

    if (provider === "openai") {
      responseText = await getFromGpt(model, prompt);
    } 
    // else if (provider === "mistral") {
    //   call mistral function here later
    // }

    res.json({
      success: true,
      provider,
      model,
      response: responseText,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;