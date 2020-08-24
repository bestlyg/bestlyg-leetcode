import { Indexes } from '../models';
import { getCache } from './get-cache';

const difCache = getCache()[Indexes.DIFFICULTY];
export function analysisDifficulty(fileName: string, file: string): void {
  const difReg = new RegExp('难度：(.*)  ');
  const difGroup = difReg.exec(file);
  if (difGroup === null) return;
  const dif = difGroup[1];
  const difArr = difCache.find(v => v.name === dif);
  if (difArr === undefined) return;
  difArr.solutions.push(fileName);
}
