export enum SolutionName {
  NUMBER,
  INTERVIEW = '面试题',
  SWORD = '剑指Offer',
  OTHER = 'other',
}

const index = {
  [SolutionName.NUMBER]: 1,
  [SolutionName.INTERVIEW]: 2,
  [SolutionName.SWORD]: 3,
  [SolutionName.OTHER]: 4,
};
export function getSolutionNameIndex(name: SolutionName): number {
  return index[name];
}
