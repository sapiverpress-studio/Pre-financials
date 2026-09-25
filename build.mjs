import { readFileSync, mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';

const sourceFiles = [
  'source/source-01.b64',
  'source/source-02.b64',
  'source/source-03.b64',
  'source/source-04.b64',
  'source/source-05.b64'
];

const expectedSha256 = '52ea6a76d6eefff22f597c6ec6d4f46b02a0ddaa4d7b5e532633d1d4e41718f0';
const b64 = sourceFiles.map(path => readFileSync(path, 'utf8').trim()).join('');
const html = gunzipSync(Buffer.from(b64, 'base64'));
const actualSha256 = createHash('sha256').update(html).digest('hex');

if (actualSha256 !== expectedSha256) {
  throw new Error(`Integrity check failed. Expected ${expectedSha256}, got ${actualSha256}`);
}

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html);
copyFileSync('robots.txt', 'dist/robots.txt');

console.log(`Built audited V4.3: ${html.length} bytes; SHA-256 ${actualSha256}`);
