import Transaction from "../models/transaction.model.js";
import {GoogleGenerativeAI} from '@google/generative-ai';
export const aiChat = async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
        const {id} = req.params;
        const {message} = req.body;
        const transactions = await Transaction.find({payee: id}).populate("vendor", "name");
        const summary = transactions.map((t) => `${t.vendor?.name || "Unknown"}: ₹${t.amount}`).join("\n");

        const prompt = `
                    You are a personal finance assistant for students.
                    Here is the user’s transaction history:
                    ${summary}
        User asked: "${message}"
Answer only based on their data, and provide clear tips/resources.`;

        const model = genAI.getGenerativeModel({model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({reply: responseText});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}