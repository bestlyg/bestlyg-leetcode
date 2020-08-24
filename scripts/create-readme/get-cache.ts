import { Indexes, Difficulty } from '../models';
import { SolutionReadme } from '../models/solution-readme';
const cache: Record<Indexes, SolutionReadme[]> = {
  [Indexes.ORDER]: [],
  [Indexes.TAG]: [],
  [Indexes.DIFFICULTY]: [
    { name: Difficulty.EASY, solutions: [] },
    { name: Difficulty.MIDDLE, solutions: [] },
    { name: Difficulty.DIFFICULT, solutions: [] },
  ],
};
export function getCache(): Record<Indexes, SolutionReadme[]> {
  return cache;
}
