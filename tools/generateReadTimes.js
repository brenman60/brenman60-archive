import fs from "fs/promises";
import path from "path";

const WORDS_PER_MINUTE = 200;

function calculateReadTime(text) {
  const cleanText = text.replace(/<[^>]*>?/gm, '');
  
  const wordCount = cleanText.trim().split(/\s+/).length;
  const readTimeMins = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  return `${readTimeMins} min read`;
}

async function main() {
  try {
    const repoRoot = path.resolve(".");
    const articlesInfoDir = path.join(repoRoot, "public", "articles");
    const articlesDir = path.join(repoRoot, "src", "articles");

    const entries = await fs.readdir(articlesDir, { withFileTypes: true });
    const slugs = entries.filter((e) => e.isDirectory()).map((d) => d.name);

    for (const slug of slugs) {
      const articleDir = path.join(articlesDir, slug);
      const articleInfoDir = path.join(articlesInfoDir, slug);
      const contentPath = path.join(articleDir, "content.jsx");
      
      const jsonPath = path.join(articleInfoDir, "data.json"); 

      try {
        await fs.access(contentPath);
        await fs.access(jsonPath);

        const content = await fs.readFile(contentPath, "utf8");

        const readTime = calculateReadTime(content);

        const jsonData = await fs.readFile(jsonPath, "utf8");
        const articleMeta = JSON.parse(jsonData);

        articleMeta.readTime = readTime;

        await fs.writeFile(jsonPath, JSON.stringify(articleMeta, null, 2), "utf8");
        console.log(`Successfully updated ${slug} with readTime: ${readTime}`);
      } catch (err) {
        console.warn(`Skipped ${slug}: Files missing or invalid JSON. (${err.message})`);
      }
    }

    console.log("Finished generating read times!");
  } catch (err) {
    console.error("Error processing articles:", err);
    process.exitCode = 1;
  }
}

main();