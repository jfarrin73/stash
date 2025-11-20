import { Command } from "commander";
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export const init = new Command()
  .name("init")
  .description("Initialize your project configuration")
  .action(async () => {
    const response = await prompts([
      {
        type: "text",
        name: "hooks",
        message: "Where should hooks be installed?",
        initial: "src/hooks",
      },
      {
        type: "text",
        name: "utils",
        message: "Where should utilities be installed?",
        initial: "src/lib/utils",
      },
      {
        type: "confirm",
        name: "proceed",
        message: "Write configuration to stash.json?",
        initial: true,
      },
    ]);

    if (!response.proceed) {
      process.exit(0);
    }

    const config = {
      paths: {
        hooks: response.hooks,
        utils: response.utils,
      },
    };

    await fs.writeFile(
      path.resolve("stash.json"),
      JSON.stringify(config, null, 2)
    );

    console.log(chalk.green("✅ Configuration saved to stash.json"));
  });