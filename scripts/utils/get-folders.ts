import { srcPath } from './resolve';
import { fs } from './fs';

export function getFolders() {
  return fs.readdirSync(srcPath);
}
