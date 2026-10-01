// Builds the library into dist/, and with --site also assembles the demo site in _site/.
//
//   node scripts/build.mjs          dist/protokuda.css, protokuda.min.css, themes/*.css, themes/*.min.css
//   node scripts/build.mjs --site   the above, plus _site/ for GitHub Pages
import { bundle, transform } from 'lightningcss';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const site = path.join(root, '_site');

const minName = (file) => file.replace(/\.css$/, '.min.css');
const cssFiles = async (dir) => (await readdir(dir)).filter((f) => f.endsWith('.css'));

const layerOrder = '@layer protokuda.base, protokuda.theme, protokuda.state;';

// Theme sources are `.pk-theme-<name> { ... }` rules, bundled into protokuda.css
// as classes. The standalone dist/themes/<name>.css applies the same tokens to
// the whole page, so it swaps the class selector for :root.
function pageTheme(source, name) {
  const tokens = source.replace(`.pk-theme-${name}`, ':root');
  return `${layerOrder}\n\n@layer protokuda.theme {\n${tokens}\n}\n`;
}

async function writeTheme(file, code, filename) {
  for (const minify of [false, true]) {
    const out = transform({ filename, code: Buffer.from(code), minify }).code;
    await writeFile(path.join(dist, 'themes', minify ? minName(file) : file), out);
  }
}

async function buildLibrary() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(path.join(dist, 'themes'), { recursive: true });

  // The entry file @imports the parts and themes; bundling inlines them inside their layers.
  const entry = path.join(src, 'protokuda.css');
  for (const minify of [false, true]) {
    const { code } = bundle({ filename: entry, minify });
    await writeFile(path.join(dist, minify ? 'protokuda.min.css' : 'protokuda.css'), code);
  }

  const themes = await cssFiles(path.join(src, 'themes'));
  for (const file of themes) {
    const filename = path.join(src, 'themes', file);
    await writeTheme(file, pageTheme(await readFile(filename, 'utf8'), path.basename(file, '.css')), filename);
  }

  console.log(`Built dist/ (protokuda.css + ${themes.length} themes)`);
}

// The demo links protokuda.css and themes/*.css relative to itself, so the site
// is the demo folder with the built files dropped in beside it.
async function buildSite() {
  await rm(site, { recursive: true, force: true });
  await cp(path.join(root, 'demo'), site, { recursive: true });
  await cp(dist, site, { recursive: true });
  console.log('Built _site/');
}

await buildLibrary();
if (process.argv.includes('--site')) {
  await buildSite();
}
