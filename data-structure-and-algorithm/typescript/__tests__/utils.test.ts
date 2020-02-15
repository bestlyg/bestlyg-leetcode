import { time, isNumber, Person, getPerson } from "../src/utils";
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
    getPerson(1);
    getPerson(1);
    getPerson(2);
    getPerson(3);
    getPerson(4);
  });
});
