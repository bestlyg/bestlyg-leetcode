import { Difficulty } from './difficulty';
import { Solution } from './solution';
export interface SolutionMarkdown {
  name: string;
  url: string;
  difficulty: Difficulty;
  tag: string[];
  desc: string;
  solutions: Solution[];
}
