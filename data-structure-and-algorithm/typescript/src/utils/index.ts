import { Person, getPerson } from "./Person";
import BinaryTrees from "../code/tree/BinaryTreesPrinter";
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
function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
function repeat(string: string, count: number): string {
  if (count <= 0) return "";
  return "".padStart(count, string);
}
function blank(count: number): string {
  return repeat(" ", count);
}
const toString = (() => {
  // const method = Object.prototype.toString;
  return (val: any) => String(val);
})();
export {
  BinaryTrees,
  Person,
  getPerson,
  extend,
  thorwEmptyError,
  isNumber,
  time,
  toString,
  repeat,
  blank
};
