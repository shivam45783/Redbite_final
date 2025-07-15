import axios from "axios";
import { Router } from "express";

const quoteRouter = Router();
const getQuote = async (req, res) => {
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": process.env.QUOTE_API_KEY },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quote" });
    }
}
quoteRouter.get("/get", getQuote);
export default quoteRouter