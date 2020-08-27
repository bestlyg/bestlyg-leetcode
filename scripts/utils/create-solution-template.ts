import { backquote } from './backquote';
import { Solution, SolutionMarkdown } from '../models';
import { getNow } from './get-time';
import { descFormat } from './format';
export function createSolutionTemplate(no: number, { script, time, memory, desc, code }: Solution) {
  return `## 题解 ${no} - ${script}
- 编辑时间：${getNow()}
- 执行用时：${time}ms
- 内存消耗：${memory}mb
- 编程语言：${script}
- 解法介绍：${descFormat(desc)}
${backquote}${backquote}${backquote}${script}
${code}
${backquote}${backquote}${backquote}
`;
}

export function createSolutionTemplates({ solutions }: SolutionMarkdown): string {
  let str = '';
  for (let i = 0, l = solutions.length; i < l; i++)
    str += createSolutionTemplate(i + 1, solutions[i]);
  return str;
}
