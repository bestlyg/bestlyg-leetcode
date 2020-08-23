import { Indexes, SolutionMarkdown, Difficulty } from '../models';
import { SolutionReadme } from '../models/solution-readme';
export function createCache(): Record<Indexes, SolutionReadme[]> {
  const cache: Record<Indexes, SolutionReadme[]> = {
    [Indexes.ORDER]: [],
    [Indexes.TAG]: [],
    [Indexes.DIFFICULTY]: [
      { name: Difficulty.EASY, solutions: [] },
      { name: Difficulty.MIDDLE, solutions: [] },
      { name: Difficulty.DIFFICULT, solutions: [] },
    ],
  };
  return cache;
}
