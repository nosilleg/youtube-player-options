import { promises as fs } from "node:fs";
import Path from "node:path";
import { fileURLToPath } from "node:url";

const copyFile = fs.copyFile.bind(fs);

export const outputIndexPage = async (): Promise<void> => {
  /**
   * Copies index.html, script.mjs, and styles.css from the current directory to the dist directory.
   */

  const filesToCopy = ["index.html", "script.mjs", "styles.css"];
  const distributionDirectory = Path.join(process.cwd(), "dist");
  const sourceDirectory = Path.dirname(fileURLToPath(import.meta.url));

  for (const file of filesToCopy) {
    const sourcePath = Path.join(sourceDirectory, file);
    const destinationPath = Path.join(distributionDirectory, file);
    await copyFile(sourcePath, destinationPath);
  }
};
