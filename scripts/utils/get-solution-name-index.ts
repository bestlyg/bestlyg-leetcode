import { SolutionName } from '../models';

const cache = {
  [SolutionName.NUMBER]: 1,
  [SolutionName.INTERVIEW]: 2,
  [SolutionName.SWORD]: 3,
  [SolutionName.OTHER]: 4,
};

export function getSolutionNameIndex(name: string): number {
  if (name.startsWith(SolutionName.INTERVIEW)) return cache[SolutionName.INTERVIEW];
  else if (name.startsWith(SolutionName.OTHER)) return cache[SolutionName.OTHER];
  else if (name.startsWith(SolutionName.SWORD)) return cache[SolutionName.SWORD];
  else if (!Number.isNaN(name)) return cache[SolutionName.NUMBER];
  else return Infinity;
}
