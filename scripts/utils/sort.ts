import { compareSolutionName } from './compare-solution-name';
import { getSolutionNameIndex } from './get-solution-name-index';

export function nameSort(name1: string, name2: string): number {
  if (name1.startsWith('- [')) name1 = name1.substr(3);
  if (name2.startsWith('- [')) name2 = name2.substr(3);
  let num1 = parseInt(name1);
  let num2 = parseInt(name2);
  if (Number.isNaN(num1) && Number.isNaN(num2)) {
    num1 = getSolutionNameIndex(name1);
    num2 = getSolutionNameIndex(name2);
    if (num1 === num2) return compareSolutionName(name1, name2);
    else return num1 - num2;
  } else if (Number.isNaN(num1)) {
    return 1;
  } else if (Number.isNaN(num2)) {
    return -1;
  } else {
    return num1 - num2;
  }
}

export function folderSort(name1: string, name2: string): number {
  let num1 = parseInt(name1);
  let num2 = parseInt(name2);
  if (Number.isNaN(num1) && Number.isNaN(num2)) {
    return getSolutionNameIndex(name1) - getSolutionNameIndex(name2);
  } else if (Number.isNaN(num1)) {
    return 1;
  } else if (Number.isNaN(num2)) {
    return -1;
  } else {
    return num1 - num2;
  }
}
