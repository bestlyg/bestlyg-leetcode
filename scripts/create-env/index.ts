import { tempPath, fs } from '../utils';
import { solutionMarkdownTemplate } from './solution-markdown-template';
import { solutionsFileTemplate } from './solutions-file-template';
function run() {
  fs.ensureDirSync(tempPath);
  fs.ensureFile(`${tempPath}/index.js`);
  fs.ensureFile(`${tempPath}/index.ts`);
  fs.writeFile(`${tempPath}/solution-markdown.ts`, solutionMarkdownTemplate);
  fs.writeFile(`${tempPath}/solutions.ts`, solutionsFileTemplate);
}
run();
