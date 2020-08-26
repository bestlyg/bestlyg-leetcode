import { fileToString } from './to-string';
import waitSolutions from './wait-solutions';
import { nameFormat, nameSort } from '../utils';
export function createWaitSolutionsTemplate(): string {
  let str = '## 待完成题\n';
  const sorted = waitSolutions.sort(({ name: name1 }, { name: name2 }) => nameSort(name1, name2));
  for (const { name, url } of sorted) str += fileToString(nameFormat(name), url);
  return str;
}
