export function time(name: string, fn: Function) {
  const timeTag: string = "time->" + name;
  console.time(timeTag);
  fn();
  console.timeEnd(timeTag);
}
export const thorwEmptyError = (struct: string) => (method: string) => {
  throw new Error(`${struct} is Empty can not use the Method: ${method}`);
};
export function isNumber(number: any): number is number {
  return typeof number === "number";
}
export class Person {
  private age: number;
  private name: string;
  constructor(name: string, age: number) {
    this.age = age;
    this.name = name;
  }
  public toString(): string {
    return `Person name:${this.name} age:${this.age}`;
  }
}
interface IPersonObj {
  [index: number]: Person;
}
const PersonObj: IPersonObj = {};
export function getPerson(num: number): Person {
  if (!PersonObj[num]) {
    PersonObj[num] = new Person(num.toString(), num);
  }
  return PersonObj[num];
}
