import "dotenv/config";
import { Command } from "commander";
import readApplicationData from "./storage/applications.js";
import authenticateGmail from "./gmail/auth.js";
import getGmailClient from "./gmail/client.js";

const program = new Command();

program
  .command("list")
  .description("outputs a table with fake application data")
  .action(async () => {
    console.table(await readApplicationData());
  });

program
  .command("auth")
  .description("Connect your Gmail account")
  .action(async () => {
    await authenticateGmail();
  });

program
  .command("test")
  .description("Test Gmail connection")
  .action(async () => {
    const gmail = await getGmailClient();
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
    })
    const messages = response.data.messages ?? [];

    for(const message of messages){
      console.log(message.id)
    }
  });

program.parse(process.argv);
