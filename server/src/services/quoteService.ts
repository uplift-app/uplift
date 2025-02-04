import { Quote } from "../interfaces";

let cachedQuote: Quote | null = null;
let lastFetchedTime: number | null = null;
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export async function fetchQuoteOfTheDay(): Promise<any> {
  const currentTime = Date.now();

  if (
    cachedQuote &&
    lastFetchedTime &&
    currentTime - lastFetchedTime < EXPIRATION_TIME
  ) {
    return cachedQuote;
  }

  try {
    const response = await fetch("https://zenquotes.io/api/today");
    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();
    cachedQuote = data;
    lastFetchedTime = currentTime;

    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { error: "Failed to fetch quote" };
  }
}
