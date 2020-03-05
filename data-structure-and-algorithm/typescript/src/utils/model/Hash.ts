import { IHash } from "../../types";
import { getClassName } from "..";

export default class Hash implements IHash {
  hashCode(): number {
    return 0;
  }
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (obj === null || getClassName(this) != getClassName(obj)) return false;
    return (<Hash>obj).value === this.value;
  }
  private _value: number = 0;
  constructor(value: number) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
  toString(): string {
    return `Hash_number:${this._value}`;
  }
}
