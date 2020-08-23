import { createCache } from './create-cache';
import { Indexes } from '../models/indexes';
import { srcPath, getFolders, fs } from '../utils';
import { fileToString } from './to-string';
const cache = createCache();
const indexCache = cache[Indexes.ORDER];
const tagCache = cache[Indexes.TAG];
const difCache = cache[Indexes.DIFFICULTY];
function toString() {
  let res = '';
  for (const cacheKey of Object.keys(cache)) {
    const key = cacheKey as Indexes;
    res += `## ${key}\n`;
    for (const { name, solutions } of cache[key]) {
      res += `### ${name}\n`;
      for (const solution of solutions) res += solution;
    }
  }
  return res;
}
export function createSolutionsTemplate(): string {
  analysis();
  return toString();
}
function analysis(): void {
  getFolders().forEach(folder => {
    if (!indexCache.some(v => v.name === folder)) {
      indexCache.push({ name: folder, solutions: [] });
    }
    const mds = fs.readdirSync(`${srcPath}/${folder}`);
    for (const md of mds) {
      const url = `src/${folder}/${md}`;
      analysisIndex(folder, md, url);
      analysisTag();
    }
  });
}
function analysisIndex(folder: string, name: string, url: string): void {
  let readme = indexCache.find(v => v.name === folder);
  if (!readme) {
    readme = { name: folder, solutions: [] };
    indexCache.push(readme);
  }
  readme.solutions.push(fileToString(name.substr(0, name.length - 3), url));
}
function analysisTag(): void {}
function analysisDifficulty(): void {}
