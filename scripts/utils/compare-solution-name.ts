import { SolutionName } from '../models';

const compareCache: Record<SolutionName, (name1: string, name2: string) => number> = {
  [SolutionName.NUMBER]: (name1, name2) => parseFloat(name1) - parseFloat(name2),
  [SolutionName.INTERVIEW]: (name1, name2) =>
    parseFloat(name1.substr(SolutionName.INTERVIEW.length)) -
    parseFloat(name2.substr(SolutionName.INTERVIEW.length)),
  [SolutionName.SWORD]: (name1, name2) =>
    parseFloat(name1.substr(SolutionName.SWORD.length)) -
    parseFloat(name2.substr(SolutionName.SWORD.length)),
  [SolutionName.OTHER]: (name1, name2) => parseFloat(name1.substr(8)) - parseFloat(name2.substr(8)),
  [SolutionName.LCP]: (name1, name2) => parseFloat(name1.substr(3)) - parseFloat(name2.substr(3)),
};
export function compareSolutionName(name1: string, name2: string): number {
  if (name1.startsWith(SolutionName.INTERVIEW) && name2.startsWith(SolutionName.INTERVIEW))
    return compareCache[SolutionName.INTERVIEW](name1, name2);
  else if (name1.startsWith(SolutionName.OTHER) && name2.startsWith(SolutionName.OTHER))
    return compareCache[SolutionName.OTHER](name1, name2);
  else if (name1.startsWith(SolutionName.LCP) && name2.startsWith(SolutionName.LCP))
    return compareCache[SolutionName.LCP](name1, name2);
  else if (name1.startsWith(SolutionName.SWORD) && name2.startsWith(SolutionName.SWORD))
    return compareCache[SolutionName.SWORD](name1, name2);
  else if (!Number.isNaN(parseInt(name1)) && !Number.isNaN(parseInt(name2)))
    return compareCache[SolutionName.NUMBER](name1, name2);
  else return 0;
}
