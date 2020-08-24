import { getFolders, fs, srcPath } from '../utils';
import { fileToString } from './to-string';
import { analysisIndex } from './analysis-index';
import { analysisTag } from './analysis-tag';
import { analysisDifficulty } from './analysis-difficulty';
export function analysis(): void {
  getFolders().forEach(folder => {
    const mds = fs.readdirSync(`${srcPath}/${folder}`);
    for (const md of mds) {
      const url = `src/${folder}/${md}`;
      const fileName = fileToString(md.substr(0, md.length - 3), url);
      const file = fs.readFileSync(`${srcPath}/${folder}/${md}`).toString();
      analysisIndex(fileName, folder);
      analysisTag(fileName, file);
      analysisDifficulty(fileName, file);
    }
  });
}
