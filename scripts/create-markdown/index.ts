import solutionMarkdown from '../../temp/solution-markdown';
import { createTemplate } from './create-template';
import { getFilePath, fs } from '../utils';
run();
function run() {
  fs.writeFileSync(getFilePath(solutionMarkdown.name), createTemplate(solutionMarkdown));
}
