import { getHash } from "../../src/utils/model";

describe("Hash", () => {
  test("equals", () => {
    const obj = getHash(1);
    const obj3 = getHash(3);
    const obj1_1 = getHash(1);
    expect(obj.equals(obj1_1)).toBe(true);
    expect(obj.equals(obj3)).toBe(false);
    expect(obj.equals(null)).toBe(false);
  });
  test("toString", () => {
    const obj = getHash(1);
    expect(obj.toString()).toBe(`Hash_number:1`);
  });
});
