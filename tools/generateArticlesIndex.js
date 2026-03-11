import fs from "fs/promises";
import path from "path";

async function main() {
  try {
    const repoRoot = path.resolve(".");
    const articlesDir = path.join(repoRoot, "public", "articles");

    const exclusions = ["rustInPeace"];

    const entries = await fs.readdir(articlesDir, { withFileTypes: true });
    const slugs = entries
      .filter((e) => e.isDirectory())
      .map((d) => d.name)
      .filter((n) => n !== "images" && n !== "assets" && !exclusions.includes(n))
      .sort();

    const outPath = path.join(articlesDir, "index.json");
    await fs.writeFile(outPath, JSON.stringify(slugs, null, 2), "utf8");
    console.log(`Wrote ${slugs.length} article slugs to ${outPath}`);
  } catch (err) {
    console.error("Error generating articles index:", err);
    process.exitCode = 1;
  }
}

main();
