import chalk from "chalk";
import { execSync } from "child_process";
import { Command } from "commander";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { getConfig } from "../utils/get-config";

const REGISTRY_URL =
	process.env.REGISTRY_URL ?? "https://stash-psi.vercel.app/registry";

export const add = new Command()
	.name("add")
	.description("Add a component to your project")
	.argument("<component>", "the component to add")
	.action(async (componentName) => {
		const spinner = ora(`Installing ${componentName}...`).start();

		const config = await getConfig();
		if (!config) {
			spinner.fail(chalk.red("Missing stash.json. Run 'init' first."));
			process.exit(1);
		}

		try {
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

			if (item.dependencies?.length) {
				spinner.text = "Installing dependencies...";
				execSync(`pnpm add ${item.dependencies.join(" ")}`, {
					stdio: "ignore",
				});
			}

			spinner.text = "Writing files...";
			for (const file of item.files) {
				let targetDir = config.paths.utils;

				if (file.type === "registry:hook") {
					targetDir = config.paths.hooks;
				} else if (
					file.type === "registry:component" ||
					file.type === "registry:components"
				) {
					// @ts-ignore
					targetDir = config.paths.components ?? "src/components";
				}

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
