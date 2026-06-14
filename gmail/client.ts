import { createOAuthClient } from "./auth.js";
import { readFile } from "fs/promises";
import { google } from "googleapis";

export default async function getGmailClient() {
  const res = await readFile("token.json", "utf-8");
  const token = JSON.parse(res);

  const oauth2Client = createOAuthClient();
  oauth2Client.setCredentials(token);
  return google.gmail({ version: "v1", auth: oauth2Client });
}
