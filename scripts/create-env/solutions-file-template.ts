import { backquote } from '../utils';
export const solutionsFileTemplate = `import { Script, SolutionsFile } from '../scripts/models';
import { backquote } from './../scripts/utils';
const solutions: SolutionsFile = {
  name: 'leetcode name',
  solutions: [
    {
      script: Script.TS,
      time: 100,
      memory: 100,
      desc: 'solution desc',
      code: ${backquote}${backquote},
    },
  ],
};
export default solutions;
`;
