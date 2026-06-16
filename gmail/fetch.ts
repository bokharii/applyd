import getGmailClient from "./client.js";
import type { Email } from "../types/email.js";

export default async function fetchEmails(): Promise<Email[]> {
  const gmail = await getGmailClient();
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
    includeSpamTrash: true,
    q: '(application OR applying OR "thank you for applying")',
  });
  const messages = response.data.messages ?? [];

  const mailList = await Promise.all(
    messages.map(async (message) => {
      return gmail.users.messages.get({ userId: "me", id: message.id });
    }),
  );

  const mailObj = mailList.map((mail): Email | null => {
    const headers = mail.data.payload?.headers;
    const subjectHeader = headers?.find(
      (h) => h.name?.toLowerCase() === "subject",
    );
    if (!mail.data.threadId) return null;
    return {
      threadId: mail.data.threadId,
      subject: subjectHeader?.value ?? "No Subject",
      snippet: mail.data.snippet ?? "",
      date: mail.data.internalDate
        ? new Date(parseInt(mail.data.internalDate))
        : new Date(),
    };
  });

  return mailObj;
}
