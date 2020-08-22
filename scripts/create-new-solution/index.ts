import fs from 'fs-extra';
import solutionReadme from '../../temp/solution-readme';
import { createTemplate } from './create-template';
import { getPath } from './get-path';
run();
function run() {
  const template = createTemplate(solutionReadme);
  fs.writeFileSync(getPath(solutionReadme), template);
}
