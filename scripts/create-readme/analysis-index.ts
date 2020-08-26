import { getCache } from './get-cache';
import { Indexes } from '../models';
const cache = getCache();
const indexCache = cache[Indexes.ORDER];
export function analysisIndex(fileName: string, folder: string): void {
  let readme = indexCache.find(v => v.name === folder);
  if (!readme) {
    readme = { name: folder, solutions: [] };
    indexCache.push(readme);
  }
  readme.solutions.push(fileName);
}
export function cacheIndexSort(): void {
  cache[Indexes.ORDER] = cache[Indexes.ORDER].sort(
    ({ name: name1 }, { name: name2 }) => parseInt(name1) - parseInt(name2)
  );
}
