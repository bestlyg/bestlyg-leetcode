import fs from 'fs-extra';
import solutionMarkdown from '../../temp/solution-markdown';
import { createTemplate } from './create-template';
import { getPath } from './get-path';
run();
function run() {
  fs.writeFileSync(getPath(solutionMarkdown), createTemplate(solutionMarkdown));
}
