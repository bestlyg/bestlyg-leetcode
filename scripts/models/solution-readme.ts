import { Difficulty } from './difficulty';
import { Solution } from './solution';
export interface SolutionReadme {
  name: string;
  url: string;
  difficulty: Difficulty;
  tag: string[];
  desc: string;
  solves: Solution[];
}
