import { IComparable, IHash } from "../../types";
import { hashCode as hash, getClassName } from "../index";
export default class Person implements IComparable<Person>, IHash {
  private age: number;
  private name: string;
  constructor(name: string, age: number) {
    this.age = age;
    this.name = name;
  }
  get Age() {
    return this.age;
  }
  get Name() {
    return this.name;
  }
  hashCode(): number {
    let hashCode = hash(this.age);
    hashCode = hashCode * 31 + hash(this.name);
    return hashCode;
  }
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (obj === null || getClassName(this) !== getClassName(obj)) return false;
    return (<Person>obj).Age === this.Age && (<Person>obj).Name === this.Name;
  }
  compareTo(obj: Person): number {
    return this.Age - obj.Age;
  }
  public toString(): string {
    return `Person name:${this.name} age:${this.age}`;
  }
}
