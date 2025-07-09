import { ensureDirectory } from "./lib/fs.mts";
import { outputIndexPage } from "./pages/index/index.mts";

await ensureDirectory("dist");
await ensureDirectory("build");

await outputIndexPage();
