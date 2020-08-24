import { SolutionMarkdown } from '../models';
import { createHeaderTemplate } from './create-header-template';
import { createSolutionTemplates } from '../utils';

export function createTemplate(md: SolutionMarkdown): string {
  return createHeaderTemplate(md) + createSolutionTemplates(md);
}
