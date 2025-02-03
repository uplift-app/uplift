import { fetchQuoteOfTheDay } from "../services/quoteService";
import { Request, Response } from "express";

export async function getQuote(req: Request, res: Response) {
  const quote = await fetchQuoteOfTheDay();
  res.json(quote);
}
