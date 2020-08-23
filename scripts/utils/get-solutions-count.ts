import { fs } from './fs';

export function getSolutionsCount(path: string): number {
  return (
    parseInt(
      fs
        .readFileSync(path)
        .toString()
        .match(/题解 (\d{1,20}) -/g)!
        .reverse()[0]
        .split(' ')[1]
    ) + 1
  );
}
