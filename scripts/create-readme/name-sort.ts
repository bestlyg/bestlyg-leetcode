import { SolutionReadme } from '../models';
export function nameSort({ name: name1 }: SolutionReadme, { name: name2 }: SolutionReadme): number {
  const num1 = parseInt(name1.substr(3));
  const num2 = parseInt(name2.substr(3));
  if (Number.isNaN(num1) && Number.isNaN(num2)) {
  } else if (Number.isNaN(num1)) {
    return 1;
  } else if (Number.isNaN(num2)) {
    return -1;
  } else {
    return num1 - num2;
  }
  return 0;
}
