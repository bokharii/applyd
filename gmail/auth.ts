import { authenticate } from "@google-cloud/local-auth"
import { google } from "googleapis"

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirect = process.env.GOOGLE_REDIRECT_URI;
function createOAuthClient() {
  if (!clientId || !clientSecret || !redirect) {
    throw new Error(
      "Missing required Gmail API environment variables. " +
        "Please check GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REDIRECT_URI.",
    );
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirect);
}
const oauth2Client = createOAuthClient();

export default function authenticateGmail() {}
