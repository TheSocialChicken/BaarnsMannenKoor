/**
 * Verifies that every bladmuziek/audio file referenced in src/pages/leden.astro
 * actually exists under public/bladmuziek/.
 *
 * Run: node scripts/check-bladmuziek.mjs
 * Exit 0 = all files present, exit 1 = one or more missing.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src  = readFileSync(join(root, 'src/pages/leden.astro'), 'utf8');

// Extract pdf: "..." entries from BLADMUZIEK array
const pdfs   = [...src.matchAll(/pdf:\s*"([^"]+\.pdf)"/g)].map(m => m[1]);
// Extract bestand: "..." entries from STEMMEN array
const audios = [...src.matchAll(/bestand:\s*"([^"]+\.m4a)"/g)].map(m => m[1]);

const files = [...pdfs, ...audios];

if (files.length === 0) {
  console.error('ERROR: No files found — check regex or leden.astro structure');
  process.exit(1);
}

let failed = 0;
for (const file of files) {
  const fullPath = join(root, 'public/bladmuziek', file);
  if (existsSync(fullPath)) {
    console.log(`  ok  public/bladmuziek/${file}`);
  } else {
    console.error(`MISSING  public/bladmuziek/${file}`);
    failed++;
  }
}

console.log('');
if (failed > 0) {
  console.error(`${failed}/${files.length} file(s) missing from public/bladmuziek/`);
  process.exit(1);
}
console.log(`All ${files.length} bladmuziek files present.`);
