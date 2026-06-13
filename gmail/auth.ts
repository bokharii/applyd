import { google } from "googleapis";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile } from "fs/promises";

const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.readonly";

function createOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      "Missing required env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI",
    );
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export default async function authenticateGmail() {
  const oauth2Client = createOAuthClient();

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [GMAIL_SCOPE],
  });

  console.log("\nOpen this URL in your browser to sign in:\n");
  console.log(authUrl);

  const rl = readline.createInterface({ input, output });
  try {
    const code = (
      await rl.question(
        "\nPlease paste the code found in the URL after browser login. This will be exchanged for a real token.\n",
      )
    ).trim();
    const { tokens } = await oauth2Client.getToken(code);
    const jsonString = JSON.stringify(tokens, null, 2);
    await writeFile("token.json", jsonString, "utf8");
    console.log("Successfully created token.")
  } catch (error) {
    console.error("Error with authenticating your code", error);
  } finally {
    rl.close();
  }
}
