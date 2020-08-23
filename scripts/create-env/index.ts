import { tempPath, fs } from '../utils';
import { SolutionMarkdownTemplate } from './solution-markdown-template';
function run() {
  fs.ensureDirSync(tempPath);
  fs.ensureFile(`${tempPath}/index.js`);
  fs.ensureFile(`${tempPath}/index.ts`);
  fs.writeFile(`${tempPath}/solution-markdown.ts`, SolutionMarkdownTemplate);
}
run();
