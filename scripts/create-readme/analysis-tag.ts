import { getCache } from './get-cache';
import { Indexes } from '../models';
const tagCache = getCache()[Indexes.TAG];
export function analysisTag(fileName: string, file: string): void {
  const tagReg = new RegExp('标签：(.*)  ');
  const tagGroup = tagReg.exec(file);
  if (tagGroup === null) return;
  const tags = tagGroup[1].split('、').filter(v => v !== '');
  for (const tag of tags) {
    let tagArr = tagCache.find(v => v.name === tag);
    if (!tagArr) {
      tagArr = { name: tag, solutions: [] };
      tagCache.push(tagArr);
    }
    tagArr.solutions.push(fileName);
  }
}
