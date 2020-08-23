import { SolutionName, srcPath, fs } from '../utils';
export function getFileDir(name: string): string {
  name = name.replace(/ /g, '');
  const num = ~~((parseInt(name) - 1) / 200);
  let filDirName = `${num === 0 ? '' : num * 20}1-${(num + 1) * 20}0`;
  if (name.startsWith(SolutionName.INTERVIEW)) {
    filDirName = SolutionName.INTERVIEW;
  } else if (name.startsWith(SolutionName.SWORD)) {
    filDirName = SolutionName.SWORD;
  }
  const path = `${srcPath}/${filDirName}`;
  fs.ensureDirSync(path);
  return path;
}
export function getFilePath(name: string): string {
  return `${getFileDir(name)}/${name}.md`;
}
