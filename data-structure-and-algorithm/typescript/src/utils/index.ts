import { Person, getPerson } from "./Person";
function time(name: string, fn: Function) {
  const timeTag: string = "time->" + name;
  console.time(timeTag);
  fn();
  console.timeEnd(timeTag);
}
const thorwEmptyError = (struct: string) => (method: string) => {
  throw new Error(`${struct} is Empty can not use the Method: ${method}`);
};
function isNumber(number: any): number is number {
  return typeof number === "number";
}
export { Person, getPerson, thorwEmptyError, isNumber, time };
