import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { getConfig } from "../utils/get-config";
import { execSync } from "child_process";

// Allow override via env var, default to localhost for now
const REGISTRY_URL = process.env.REGISTRY_URL ?? "http://localhost:3000/registry";

export const add = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("<component>", "the component to add")
  .action(async (componentName) => {
    const spinner = ora(`Installing ${componentName}...`).start();
    
    // 1. Read Config
    const config = await getConfig();
    if (!config) {
      spinner.fail(chalk.red("Missing stash.json. Run 'init' first."));
      process.exit(1);
    }

    try {
      // 2. Fetch Registry Index
      spinner.text = `Checking registry (${REGISTRY_URL})...`;
      const res = await fetch(`${REGISTRY_URL}/index.json`);
      if (!res.ok) {
        throw new Error(`Failed to fetch registry from ${REGISTRY_URL}`);
      }
      
      const registry = await res.json();
      const item = registry.find((i: any) => i.name === componentName);

      if (!item) {
        spinner.fail(chalk.red(`Component ${componentName} not found.`));
        process.exit(1);
      }

      // 3. Install Dependencies
      if (item.dependencies?.length) {
        spinner.text = "Installing dependencies...";
        execSync(`pnpm add ${item.dependencies.join(" ")}`, { stdio: "ignore" });
      }

      // 4. Write Files
      spinner.text = "Writing files...";
      for (const file of item.files) {
        const targetDir = file.type === "registry:hook" ? config.paths.hooks : config.paths.utils;
        const targetPath = path.resolve(targetDir, path.basename(file.path));

        await fs.ensureDir(targetDir);
        await fs.writeFile(targetPath, file.content);
      }

      spinner.succeed(chalk.green(`Installed ${componentName}`));
      
    } catch (error) {
      spinner.fail(chalk.red("Failed to fetch component."));
      console.error(error);
      process.exit(1);
    }
  });