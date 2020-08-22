import { tempPath, fs } from '../utils';
import { solutionReadmeTemplate } from './solution-readme-template';
function run() {
  fs.ensureDirSync(tempPath);
  fs.ensureFile(`${tempPath}/index.js`);
  fs.ensureFile(`${tempPath}/index.ts`);
  fs.writeFile(`${tempPath}/solution-readme.ts`, solutionReadmeTemplate);
}
run();
