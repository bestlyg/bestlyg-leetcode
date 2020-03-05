import { IHash, IComparable } from "../types";
function time(fn: Function, name: string = "Function") {
  const timeTag: string = "Time -> " + name;
  console.time(timeTag);
  fn();
  console.timeEnd(timeTag);
}
function error(string: string): void {
  throw new Error(string);
}
function warn(string: string): void {
  console.warn(`Here's a Warn : ${string}`);
}
const thorwEmptyError = (struct: string) => (method: string) => {
  error(`${struct} is Empty can not use the Method: ${method}`);
};
function isNumber(number: any): number is number {
  if (number === null) return false;
  return typeof number === "number";
}
function isBoolean(boolean: any): boolean is boolean {
  if (boolean === null) return false;
  return typeof boolean === "boolean";
}
function isString(string: any): string is string {
  if (string === null) return false;
  return typeof string == "string";
}
function isObject(object: any): object is object {
  if (object === null) return false;
  return typeof object == "object";
}
function isIHash(obj: any): obj is IHash {
  if (obj === null) return false;
  return obj.hashCode && obj.equals;
}
function isIComparable<T>(obj: any): obj is IComparable<T> {
  if (obj === null) return false;
  return obj.compareTo;
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
function toString(val) {
  return String(val);
}
function toUint32(x: any): number {
  return x >>> 0;
}
function hashCode(obj: any): number {
  if (isString(obj)) {
    let hash = 0;
    const len = obj.length;
    if (len == 0) return hash;
    for (let i = 0; i < len; i++) {
      const char = obj.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }
  if (isBoolean(obj)) return obj ? 1231 : 1237;
  if (isIHash(obj)) return obj.hashCode();
  return toUint32(obj);
  // return hashCode(obj.toString(2));
  // if (obj === null) return 0;
  // if (isNumber(obj)) {
  //   obj = toUint32(obj);
  //   return obj ^ (obj >>> 16);
  // }
}
function getClassName(obj: any): string {
  if (!isObject(obj)) return "";
  return obj.constructor.name;
}
function equals(a: any, b: any): boolean {
  if (isIHash(a)) return a.equals(b);
  return a === b;
}
export {
  //Type protection
  isNumber,
  isString,
  isBoolean,
  isObject,
  isIComparable,
  isIHash,
  //other
  extend,
  time,
  toString,
  repeat,
  blank,
  hashCode,
  error,
  warn,
  thorwEmptyError,
  toUint32,
  getClassName,
  equals
};
