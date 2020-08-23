import solutions from '../../temp/solutions';
import { fs, getFilePath, getSolutionsCount, createSolutionTemplate } from '../utils';
run();
function run() {
  const name = solutions.name.replace(/ /g, '');
  const path = getFilePath(name);
  let count = getSolutionsCount(path);
  let str = fs.readFileSync(path).toString();
  for (const solution of solutions.solutions) {
    str += createSolutionTemplate(count++, solution);
  }
  fs.writeFileSync(path, str);
}
