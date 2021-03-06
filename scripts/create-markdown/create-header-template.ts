import { SolutionMarkdown } from '../models';
import { descFormat } from '../utils';

export function createHeaderTemplate({
  name,
  url,
  difficulty,
  tag,
  desc,
}: SolutionMarkdown): string {
  return `# ${name}
> 链接：[${name}](${url})  
> 难度：${difficulty}  
> 标签：${tag.join('、')}  
> 简介：${descFormat(desc)}  
`;
}
