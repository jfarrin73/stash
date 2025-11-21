import fs from "fs-extra"
import path from "path"

const REGISTRY_PATH = path.join(process.cwd(), "registry")
const PUBLIC_PATH = path.join(process.cwd(), "public/registry")

type RegistryItem = {
  name: string
  type: "components" | "hooks" | "utils" | "ui"
  files: Array<{
    path: string
    content: string
    type: "registry:hook" | "registry:util"
  }>
  dependencies?: string[]
}

const registry: RegistryItem[] = []

async function buildRegistry() {
  if (!fs.existsSync(PUBLIC_PATH)) {
    fs.mkdirSync(PUBLIC_PATH, { recursive: true })
  }

  const folders = ["hooks", "utils", "types", "components"];

  for (const folder of folders) {
    const folderPath = path.join(REGISTRY_PATH, folder)
    if (!fs.existsSync(folderPath)) continue

    const files = fs.readdirSync(folderPath)

    for (const file of files) {
      if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue

      const name = file.replace(/\.tsx?$/, "")
      const content = fs.readFileSync(path.join(folderPath, file), "utf-8")

      registry.push({
        name,
        type: folder as any,
        files: [
          {
            path: `${folder}/${file}`,
            content,
            type: `registry:${folder === "hooks" ? "hook" : "util"}` as any
          }
        ],
        dependencies: []
      })
    }
  }

  const outputPath = path.join(PUBLIC_PATH, "index.json")
  fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2))
  
  console.log(`✅ Registry built with ${registry.length} items at public/registry/index.json`)
}

buildRegistry().catch((err) => {
  console.error(err)
  process.exit(1)
})