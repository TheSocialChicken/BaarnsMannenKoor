// Runs after `astro build`: packs all member sheet music and recordings into one zip.
// Generated into dist/ only, because the zip is too large to keep in git.
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, statSync } from "node:fs";

const ZIP = "downloads/BMK-bladmuziek-en-opnames.zip";

mkdirSync("dist/downloads", { recursive: true });
rmSync(`dist/${ZIP}`, { force: true });
execFileSync("zip", ["-r", "-q", ZIP, "bladmuziek"], { cwd: "dist", stdio: "inherit" });

console.log(`${ZIP}: ${Math.round(statSync(`dist/${ZIP}`).size / 1e6)} MB`);
