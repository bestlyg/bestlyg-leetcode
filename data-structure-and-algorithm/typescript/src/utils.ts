export function time(name: string, fn: Function) {
  const timeTag: string = "time->" + name;
  console.time(timeTag);
  fn();
  console.timeEnd(timeTag);
}
export function isNumber(number: any): number is number {
  return typeof number === "number";
}
