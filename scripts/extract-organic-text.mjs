import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcPath = path.join(root, 'src/data/organicChapters.ts');
const dir = path.join(root, 'scripts/organic-text');
const s = fs.readFileSync(srcPath, 'utf8');

const ids = [
  'prologue',
  'ch01',
  'ch02',
  'ch03',
  'ch04',
  'ch05',
  'ch06',
  'ch07',
  'ch08',
  'ch09',
  'ch10',
  'ch11',
  'ch12',
  'epilogue',
  'appendix'
];

function extractContent(fromIndex) {
  const cStart = s.indexOf('content: `', fromIndex);
  if (cStart < 0) return null;
  let i = cStart + 'content: `'.length;
  let out = '';
  while (i < s.length) {
    const ch = s[i];
    if (ch === '\\') {
      out += s[i + 1];
      i += 2;
      continue;
    }
    if (ch === '`') break;
    out += ch;
    i++;
  }
  return out;
}

fs.mkdirSync(dir, { recursive: true });
for (const id of ids) {
  const marker = `id: '${id}'`;
  const start = s.indexOf(marker);
  if (start < 0) throw new Error('missing ' + id);
  const body = extractContent(start);
  if (body == null) throw new Error('no content ' + id);
  fs.writeFileSync(path.join(dir, `${id}.txt`), body, 'utf8');
  console.log(id, body.length);
}
