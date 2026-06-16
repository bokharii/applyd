import "dotenv/config";
import { Command } from "commander";
import authenticateGmail from "./gmail/auth.js";
import fetchEmail from "./gmail/fetch.js";
import parseEmail from "./llm/parse.js";
import toApplication from "./storage/merge.js";

const program = new Command();

program
  .command("auth")
  .description("Connect your Gmail account")
  .action(async () => {
    await authenticateGmail();
  });

program
  .command("list")
  .description("List Past 50 Applications")
  .action(async () => {
    const messages = await fetchEmail();
    for (const mail of messages) {
      const parsed = await parseEmail(mail);
      if (parsed) {
        const application = toApplication(mail, parsed);
        console.log(application);
      }
    }
  });

program.parse(process.argv);
