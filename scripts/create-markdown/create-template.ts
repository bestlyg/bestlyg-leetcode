import { SolutionMarkdown } from '../models';
import { createMarkdownTemplate } from '../utils';

export function createTemplate(md: SolutionMarkdown): string {
  return createMarkdownTemplate(md);
}
