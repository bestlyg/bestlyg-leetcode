import { time, isNumber, Person, getPerson, extend } from "../../src/utils";
describe("Utils Test", () => {
  test("time", () => {
    expect(
      time("test", () => {
        console.log("test Time");
      })
    ).toBeUndefined();
  });
  test("isNumber", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber("1")).toBe(false);
  });
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
  test("extend", () => {
    function a(): number {
      return 1;
    }
    const b = { test: "this is a test string" };
    const extendObj = extend(a, b);
    expect(extendObj()).toBe(1);
    expect(extendObj.test).toBe(b.test);
  });
});
