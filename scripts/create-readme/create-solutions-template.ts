import { Indexes } from '../models/indexes';
import { analysis } from './analysis';
import { getCache } from './get-cache';
import { nameSort } from './name-sort';
const cache = getCache();
export function createSolutionsTemplate(): string {
  analysis();
  let res = '';
  for (const cacheKey of Object.keys(cache)) {
    const key = cacheKey as Indexes;
    res += `## ${key}\n`;
    for (const { name, solutions } of cache[key].sort(nameSort)) {
      res += `### ${name}\n`;
      for (const solution of solutions) res += solution;
    }
  }
  return res;
}
