import getGmailClient from "./client.js";

export default async function fetchGmailList() {
  const gmail = await getGmailClient();
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults: 50,
    includeSpamTrash: true,
    q: "application",
  });
  const messages = response.data.messages ?? [];

  const maiLlist = await Promise.all(
    messages.map(async (message) => {
      return gmail.users.messages.get({ userId: "me", id: message.id });
    }),
  );

  for (const mail of maiLlist) {
    console.log(mail.data.snippet);
  }
}
