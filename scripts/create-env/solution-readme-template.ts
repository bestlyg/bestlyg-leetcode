import { backquote } from './../utils';
export const solutionReadmeTemplate: string = `import { SolutionReadme, Difficulty, Script } from '../scripts/models';
const specMark = '${backquote}';
const solutionReadme: SolutionReadme = {
  name: 'solution name',
  url: 'solution url',
  difficulty: Difficulty.EASY,
  tag: ['tag'],
  desc: 'solution desc',
  solves: [
    {
      script: Script.TS,
      time: 100,
      memory: 100,
      desc: 'desc',
      code: ${backquote}${backquote},
    },
  ],
};
export default solutionReadme;
`;
