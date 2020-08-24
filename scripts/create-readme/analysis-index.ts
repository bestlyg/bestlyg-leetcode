import { getCache } from './get-cache';
import { Indexes } from '../models';
const indexCache = getCache()[Indexes.ORDER];
export function analysisIndex(fileName: string, folder: string): void {
  let readme = indexCache.find(v => v.name === folder);
  if (!readme) {
    readme = { name: folder, solutions: [] };
    indexCache.push(readme);
  }
  readme.solutions.push(fileName);
}
