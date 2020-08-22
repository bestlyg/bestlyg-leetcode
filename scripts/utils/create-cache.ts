import { Indexes, SolutionReadme } from '../models';
import { Difficulty } from '../models/difficulty';

export function createCache(): Record<Indexes, Record<string, SolutionReadme[]>> {
  const cache: Record<Indexes, Record<string, SolutionReadme[]>> = {
    [Indexes.ORDER]: {},
    [Indexes.TAG]: {},
    [Indexes.DIFFICULTY]: {
      [Difficulty.EASY]: [],
      [Difficulty.MIDDLE]: [],
      [Difficulty.DIFFICULT]: [],
    },
  };
  return cache;
}
