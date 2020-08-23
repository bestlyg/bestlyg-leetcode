import { backquote } from '../utils';
export const SolutionMarkdownTemplate: string = `import { SolutionMarkdown, Difficulty, Script } from '../scripts/models';
const specMark = '${backquote}';
const solutionMarkdown: SolutionMarkdown = {
  name: 'solution name',
  url: 'solution url',
  difficulty: Difficulty.EASY,
  tag: ['tag'],
  desc: 'solution desc',
  solutions: [
    {
      script: Script.TS,
      time: 100,
      memory: 100,
      desc: 'desc',
      code: ${backquote}${backquote},
    },
  ],
};
export default solutionMarkdown;
`;
