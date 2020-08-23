import { SolutionMarkdown } from '../models';
import { createHeaderTemplate } from './create-header-template';
import { createSolutionTemplates } from './create-solution-template';

export function createMarkdownTemplate(md: SolutionMarkdown): string {
  return createHeaderTemplate(md) + createSolutionTemplates(md);
}
