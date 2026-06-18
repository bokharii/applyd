import "dotenv/config";
import { Command } from "commander";
import authenticateGmail from "./gmail/auth.js";
import fetchEmail from "./gmail/fetch.js";
import parseEmail from "./llm/parse.js";
import toApplication from "./storage/merge.js";
import readApplicationData, { storeApplicationData } from "./storage/applications.js";
import { readFile } from 'fs/promises';
import type { Application } from "./types/application.js";

const program = new Command();

program
  .command("auth")
  .description("Connect your Gmail account")
  .action(async () => {
    await authenticateGmail();
  });

program
  .command("sync")
  .description("Sync with latest Gmail data")
  .action(async () => {
    const messages = await fetchEmail();
    const applications = [] as Application[];
    for (const [i, mail] of messages.entries()) {
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

program
  .command("list")
  .description("List saved application data")
  .action(async () => {
    const applications = await readApplicationData()
    console.table(applications);
  });

program.parse(process.argv);
