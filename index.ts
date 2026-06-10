import { Command } from "commander";
import readApplicationData from "./storage/applications.js";

const program = new Command();

program
  .command("list")
  .description("outputs a table with fake application data")
  .action(async () => {
    console.table(await readApplicationData())
  });

program.parse(process.argv);
