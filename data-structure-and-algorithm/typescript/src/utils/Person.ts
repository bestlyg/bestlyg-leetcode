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
