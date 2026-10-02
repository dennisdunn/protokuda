// Writes package.json's version into the demo page's header readout.
// Runs as npm's `version` lifecycle script, after package.json is bumped and
// before `npm version` commits, so the stamped page lands in the same commit.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const page = path.join(root, 'demo', 'index.html');
const { version } = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));

const html = await readFile(page, 'utf8');
const pattern = /(<dd id="version">)[^<]*(<\/dd>)/;
if (!pattern.test(html)) throw new Error('demo/index.html has no <dd id="version"> to stamp');
await writeFile(page, html.replace(pattern, `$1${version}$2`));
console.log(`Stamped demo/index.html with ${version}`);
