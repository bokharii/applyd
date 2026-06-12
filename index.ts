import { Command } from "commander";
import readApplicationData from "./storage/applications.js";
import authenticateGmail from "./gmail/auth.js"

const program = new Command();

program
  .command("list")
  .description("outputs a table with fake application data")
  .action(async () => {
    console.table(await readApplicationData())
  });

program.command("auth").description("Connect your Gmail account").action(async() => {
  authenticateGmail()
})

program.parse(process.argv);
