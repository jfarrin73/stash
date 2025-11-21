#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";
// import { getPackageInfo } from "./utils/get-package-info";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const program = new Command()
    .name("stash")
    .description("Add components and hooks to your project")
    .version("1.0.0");

  program.addCommand(init);
  program.addCommand(add);

  program.parse();
}

main();
