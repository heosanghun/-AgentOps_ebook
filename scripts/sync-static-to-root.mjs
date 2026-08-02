import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const assetsDir = join(root, 'assets');
if (existsSync(assetsDir)) {
  rmSync(assetsDir, { recursive: true, force: true });
}

for (const entry of readdirSync(distDir)) {
  const from = join(distDir, entry);
  const to = join(root, entry);
  cpSync(from, to, { recursive: true });
}

mkdirSync(join(root, 'public'), { recursive: true });
if (existsSync(join(distDir, '_redirects'))) {
  cpSync(join(distDir, '_redirects'), join(root, 'public', '_redirects'));
}

console.log('Synced Vite dist output to repository root for static hosting.');
