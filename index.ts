import "dotenv/config";
import { Command } from "commander";
import authenticateGmail from "./gmail/auth.js";
import fetchEmail from "./gmail/fetch.js";

const program = new Command();

// program
//   .command("list")
//   .description("outputs a table with fake application data")
//   .action(async () => {
//     console.table(await readApplicationData());
//   });

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
      console.log(mail);
    }
  });

program.parse(process.argv);
