import { mkdir } from "node:fs/promises";
import { access } from "node:fs/promises";
import { constants } from "node:fs";

/**
 * Ensures that the specified directory exists, creating it if necessary.
 *
 * @param directoryPath - The path of the directory to ensure.
 * @returns A promise that resolves when the directory exists.
 */
export const ensureDirectory = async (directoryPath: string): Promise<void> => {
  try {
    await access(directoryPath, constants.F_OK);
  } catch {
    await mkdir(directoryPath, { recursive: true });
  }
};
