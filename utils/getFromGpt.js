
import { OpenAI } from 'openai'
import { config } from 'dotenv';

config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function getFromGpt(model, prompt) {
  try {
    const completion = await client.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Always respond in Markdown format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error in getFromGpt:", error.message);
    throw new Error("Failed to fetch response from GPT model");
  }
}