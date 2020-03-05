export default class MyObject {
  private _value: number = 0;
  constructor(value: number) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}
