import HashSet from "../../src/core/hash/HashSet";
import { getPerson } from "../../src/utils/model";
import { toString } from "../../src/utils/";

function getNewSet() {
  return new HashSet();
}
describe("HashSet", () => {
  test("size", () => {
    const set = getNewSet();
    set.add(getPerson(1));
    set.add(getPerson(2));
    expect(set.size()).toBe(2);
    set.add(getPerson(2));
    expect(set.size()).toBe(2);
  });
  test("isEmpty", () => {
    const set = getNewSet();
    expect(set.isEmpty()).toBe(true);
    set.add(getPerson(1));
    expect(set.isEmpty()).toBe(false);
  });
  test("clear", () => {
    const set = getNewSet();
    set.add(getPerson(1));
    set.add(getPerson(2));
    set.clear();
    expect(set.isEmpty()).toBe(true);
  });
  test("contains", () => {
    const set = getNewSet();
    set.add(getPerson(1));
    expect(set.contains(getPerson(1))).toBeTruthy();
    expect(set.contains(getPerson(2))).toBeFalsy();
  });
  test("remove", () => {
    const set = getNewSet();
    set.add(getPerson(1));
    set.remove(getPerson(1));
    expect(set.size()).toBe(0);
  });
  test("traversal", () => {
    const set = getNewSet();
    set.add(getPerson(1));
    let s = "";
    set.traversal(el => {
      s = toString(el);
      return false;
    });
    expect(s).toBe("Person name:1 age:1");
  });
});
