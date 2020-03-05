import { Person, getPerson } from "../../src/utils/model";

describe("Person", () => {
  test("Person", () => {
    const obj = getPerson(1);
    const obj2 = getPerson(1);
    expect(obj === obj2).toBe(true);
    expect(obj.Age).toBe(1);
    expect(obj.Name).toBe("1");
    const p = new Person("1", 1);
    expect(obj.Age === p.Age).toBe(true);
    expect(obj.Name === p.Name).toBe(true);
  });
  test("compareTo", () => {
    const p1 = getPerson(1);
    const p2 = getPerson(2);
    expect(p1.compareTo(p2)).toBe(-1);
  });
  test("hashCode", () => {
    const obj = getPerson(1);
    expect(obj.hashCode()).toBe(80);
  });
  test("equals", () => {
    const obj = getPerson(1);
    const obj2 = getPerson(1);
    expect(obj.equals(obj2)).toBeTruthy();
    const obj3 = getPerson(3);
    expect(obj.equals(obj3)).toBeFalsy();
    expect(obj.equals(null)).toBeFalsy();
    const obj4 = new Person("1", 1);
    expect(obj.equals(obj4)).toBeTruthy();
  });
});
