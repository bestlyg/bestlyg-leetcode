import { Indexes, SolutionMarkdown, Difficulty } from '../models';

export function createCache(): Record<Indexes, Record<string, SolutionMarkdown[]>> {
  const cache: Record<Indexes, Record<string, SolutionMarkdown[]>> = {
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
