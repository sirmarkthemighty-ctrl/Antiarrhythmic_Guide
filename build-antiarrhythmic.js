#!/usr/bin/env node
// Builds antiarrhythmic-guide.html from antiarrhythmic-src/:
//   app.jsx  -> plain JavaScript (Babel, React preset), minified with terser
//   styles.css + tailwind.config.js -> static, minified CSS (Tailwind 3)
//   shell.html -> page skeleton the two are inlined into

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, execSync } = require('child_process');
process.env.BROWSERSLIST_IGNORE_OLD_DATA = '1';

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'antiarrhythmic-src');
const OUT = path.join(ROOT, 'antiarrhythmic-guide.html');
const TOOLS = path.join(process.env.LOCALAPPDATA || os.homedir(), 'med-apps-build');
const DEPS = { tailwindcss: '3.4.17', '@babel/standalone': '7.26.4', react: '18.3.1', 'react-dom': '18.3.1', html2canvas: '1.4.1', terser: '5.36.0' };
const VENDOR = ['react/umd/react.production.min.js', 'react-dom/umd/react-dom.production.min.js'];
const LAZY_VENDOR = 'html2canvas/dist/html2canvas.min.js';

function ensureTools() {
  const missing = Object.keys(DEPS).filter(d => !fs.existsSync(path.join(TOOLS, 'node_modules', d, 'package.json')));
  if (!missing.length) return;
  console.log(`Installing build tools into ${TOOLS} ...`);
  fs.mkdirSync(TOOLS, { recursive: true });
  if (!fs.existsSync(path.join(TOOLS, 'package.json'))) {
    fs.writeFileSync(path.join(TOOLS, 'package.json'), JSON.stringify({ name: 'med-apps-build', private: true }, null, 2));
  }
  const pkgs = Object.entries(DEPS).map(([n, v]) => `${n}@${v}`).join(' ');
  execSync(`npm install --no-audit --no-fund ${pkgs}`, { cwd: TOOLS, stdio: 'inherit' });
}

function buildCss() {
  const tmp = path.join(os.tmpdir(), `antiarrhythmic-${process.pid}.css`);
  const cli = path.join(TOOLS, 'node_modules', 'tailwindcss', 'lib', 'cli.js');
  execFileSync(process.execPath, [cli, '-c', path.join(SRC, 'tailwind.config.js'), '-i', path.join(SRC, 'styles.css'), '-o', tmp, '--minify'], { stdio: 'ignore', env: process.env });
  const css = fs.readFileSync(tmp, 'utf8');
  fs.unlinkSync(tmp);
  return css;
}

async function buildJs() {
  const Babel = require(path.join(TOOLS, 'node_modules', '@babel', 'standalone'));
  const files = ['data.js', 'sources.js', 'drugs-1.js', 'drugs-2.js', 'drugs-3.js', 'drugs-4.js', 'mims.js', 'esc.js', 'esc-va.js', 'esc-svt.js', 'ap-drug.js', 'reg.js', 'tools.jsx', 'app.jsx'];
  const jsx = files.map(f => fs.readFileSync(path.join(SRC, f), 'utf8')).join('\n\n');
  const plain = Babel.transform(jsx, { presets: ['react'], filename: 'bundle.jsx', compact: false }).code;
  if (process.argv.includes('--no-minify')) return plain;
  const { minify } = require(path.join(TOOLS, 'node_modules', 'terser'));
  const out = await minify(plain, { compress: { passes: 2 }, mangle: true, toplevel: false, format: { comments: false } });
  if (!out.code) throw new Error('terser produced no output');
  return out.code;
}

(async () => {
  ensureTools();
  const started = Date.now();
  console.log('Compiling CSS via Tailwind...');
  const css = buildCss();
  console.log(`CSS compiled (${(css.length / 1024).toFixed(1)} KB). Compiling and minifying JSX...`);
  const js = await buildJs();
  console.log(`JS compiled (${(js.length / 1024).toFixed(1)} KB). Assembling single-page bundle...`);
  const shell = fs.readFileSync(path.join(SRC, 'shell.html'), 'utf8');
  const read = (v) => fs.readFileSync(path.join(TOOLS, 'node_modules', v), 'utf8').replace(/<\/script/gi, '<\\/script');
  const vendor = VENDOR.map(v => `<script>\n${read(v)}\n</script>`).join('\n') +
    `\n<script>\nwindow.__loadHtml2Canvas = function () {\n${read(LAZY_VENDOR)}\n};\n</script>`;
  if (/<\/script/i.test(js)) throw new Error('app code contains a literal </script');
  const html = shell.replace('<!--__VENDOR__-->', () => vendor).replace('/*__CSS__*/', () => css).replace('/*__JS__*/', () => js);
  fs.writeFileSync(OUT, html);
  const gz = require('zlib').gzipSync(html).length;
  console.log(`Successfully built ${path.relative(ROOT, OUT)}: ${(html.length / 1024).toFixed(1)} KB (${(gz / 1024).toFixed(1)} KB gzipped) in ${Date.now() - started} ms`);
})().catch((e) => { console.error('Build failed:', e.message); process.exitCode = 1; });
