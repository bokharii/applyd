import "dotenv/config";
import { Command } from "commander";
import authenticateGmail from "./gmail/auth.js";
import fetchEmail from "./gmail/fetch.js";
import parseEmail from "./llm/parse.js";
import toApplication from "./storage/merge.js";
import { storeApplicationData } from "./storage/applications.js";

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
    const applications = [];
    for (const [i,mail] of messages.entries()) {
      const parsed = await parseEmail(mail);
      if (parsed) {
        const application = toApplication(mail, parsed);
        console.log(`Parsing ${i + 1}/${messages.length}: ${mail.subject}`);
        applications.push(application);
      }
    }
    console.log("Beginning write to data/applications.json....");
    await storeApplicationData(applications);
    console.log("File successfully written to data/applications.json!");
  });

program.parse(process.argv);
