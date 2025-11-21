import fs from "fs-extra";
import path from "path";

export interface Config {
  paths: {
    hooks: string;
    utils: string;
  };
}

export async function getConfig(): Promise<Config | null> {
  const configPath = path.resolve("stash.json");
  
  if (!fs.existsSync(configPath)) {
    return null;
  }

  return fs.readJSON(configPath);
}