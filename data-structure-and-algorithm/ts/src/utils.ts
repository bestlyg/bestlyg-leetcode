export function time(name: string, fn: Function) {
  const timeTag: string = "time->" + name;
  console.time(timeTag);
  fn();
  console.timeEnd(timeTag);
}
