import "dotenv/config";
import { Command } from "commander";
import readApplicationData from "./storage/applications.js";
import authenticateGmail from "./gmail/auth.js";
import getGmailClient from "./gmail/client.js";
import fetchGmailList from "./gmail/fetch.js";

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
    await fetchGmailList();
  });

program.parse(process.argv);
