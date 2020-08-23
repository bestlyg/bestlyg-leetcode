import { fileToString } from './to-string';
import waitSolutions from './wait-solutions';
export function createWaitSolutionsTemplate(): string {
  let str = '## 待完成题\n';
  for (const { name, url } of waitSolutions) str += fileToString(name, url);
  return str;
}
