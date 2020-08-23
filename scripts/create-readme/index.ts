import { rootPath } from './../utils/resolve';
import { createHeaderTemplate } from './create-header-template';
import { createWaitSolutionsTemplate } from './create-wait-solutions-teamplate';
import { createSolutionsTemplate } from './create-solutions-template';
import { fs } from '../utils';
run();
function run() {
  fs.writeFile(
    `${rootPath}/README.md`,
    createHeaderTemplate() + createWaitSolutionsTemplate() + createSolutionsTemplate()
  );
}
