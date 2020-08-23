function getYear(): number {
  return new Date().getFullYear();
}
function getMonth(): number {
  return new Date().getMonth() + 1;
}
function getDay(): number {
  return new Date().getDate();
}
export function getNow(): string {
  return `${getYear()}.${getMonth()}.${getDay()}`;
}
export enum DateType {
  YEAR,
  MONTH,
  DAY,
}
const dateCache: Record<DateType, () => number> = {
  [DateType.YEAR]: getYear,
  [DateType.MONTH]: getMonth,
  [DateType.DAY]: getDay,
};
export function getTime(type: DateType): number {
  return dateCache[type]();
}
