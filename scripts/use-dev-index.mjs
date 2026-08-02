import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const devIndex = join(root, 'index.dev.html');
const index = join(root, 'index.html');

if (!existsSync(devIndex)) {
  console.error('index.dev.html is missing.');
  process.exit(1);
}

copyFileSync(devIndex, index);
console.log('Restored development index.html from index.dev.html');
