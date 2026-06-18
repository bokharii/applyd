import Groq from "groq-sdk";
import type { ParsedApplication } from "./schemas.js";
import type { Email } from "../types/email.js";
import { ParsedApplicationSchema } from "./schemas.js";
import type { ChatCompletion } from "groq-sdk/resources/chat.mjs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(
  emailString: string,
): Promise<ChatCompletion> {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You extract job application info from emails. Return ONLY valid JSON with keys: company, role, status, dateApplied. No markdown, no explanation. All values must be strings, never null. Status must be exactly one of: applied, interview, rejected, offer, unknown - applied: application submitted, received, or under review- interview: interview invite or scheduling- rejected: rejection or not moving forward- offer: job offer extended- unknown: job alerts, newsletters, or unclearUse lowercase only. Never use: sent, received, submitted, under review.",
      },
      {
        role: "user",
        content: emailString,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

export default async function parseEmail(
  email: Email,
): Promise<ParsedApplication | null> {
  const emailString = `Subject: ${email.subject} Snippet: ${email.snippet} Date: ${email.date.toISOString()}`;
  try {
    const groqResponse = await getGroqChatCompletion(emailString);
    const content = groqResponse.choices[0]?.message?.content;
    const json = JSON.parse(content);
    const parsedResponse = ParsedApplicationSchema.parse(json);
    return parsedResponse;
  } catch (error) {
    console.log("Error with parsing email", error);
    return null;
  }
}
