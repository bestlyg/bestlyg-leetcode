import ArrayList from "../../src/code/list/ArrayList/ArrayList";
class Person {
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
function getNewList() {
  return new ArrayList<Person>();
}
function getObj(num: number) {
  const obj: Person[] = [];
  if (!obj[num]) {
    obj[num] = new Person(num.toString(), num);
  }
  return obj[num];
}
describe("ArrayList", () => {
  test("size", () => {
    const list = getNewList();
    list.add(getObj(1));
    list.add(getObj(2));
    list.add(getObj(3));
    expect(list.size()).toBe(3);
  });
  test("isEmpty ", () => {
    const list = getNewList();
    list.add(getObj(1));
    list.add(getObj(2));
    list.add(getObj(3));
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });
  test("isNotEmpty ", () => {
    const list = getNewList();
    list.add(getObj(1));
    list.add(getObj(2));
    list.add(getObj(3));
    expect(list.isEmpty()).toBe(false);
  });
  test("indexOf", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.indexOf(obj1)).toBe(0);
    expect(list.indexOf(getObj(2))).toBe(list.ELEMENT_NOT_FOUND);
  });
  test("indexOf ELEMENT_NOT_FOUND", () => {
    const list = getNewList();
    expect(list.indexOf(getObj(1))).toBe(-1);
  });
  test("get", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.get(0)).toBe(obj1);
  });
  test("set", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    const obj2 = getObj(2);
    list.add(obj1);
    expect(list.set(0, obj2)).toBe(obj1);
    expect(list.get(0)).toBe(obj2);
  });
  test("contains true", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.contains(obj1)).toBe(true);
  });
  test("contains false", () => {
    const list = getNewList();
    expect(list.contains(getObj(1))).toBe(false);
  });
  test("remove element", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.remove(obj1)).toBe(0);
  });
  test("remove index", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.remove(0)).toBe(obj1);
  });
  test("toString", () => {
    const string = "size:2,elements:[Person name:1 age:1,Person name:2 age:2]";
    const list = getNewList();
    list.add(getObj(1));
    list.add(getObj(2));
    expect(list.toString()).toBe(string);
  });
  test("first", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.first()).toBe(obj1);
  });
  test("addFirst", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    const obj2 = getObj(2);
    list.add(obj1);
    list.addFirst(obj2);
    expect(list.first()).toBe(obj2);
  });
  test("delFirst", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.delFirst()).toBe(obj1);
  });
  test("Last", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.last()).toBe(obj1);
  });
  test("addLast", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    const obj2 = getObj(2);
    list.add(obj1);
    list.addLast(obj2);
    expect(list.last()).toBe(obj2);
  });
  test("delLast", () => {
    const list = getNewList();
    const obj1 = getObj(1);
    list.add(obj1);
    expect(list.delLast()).toBe(obj1);
  });
  test("throwEmpty", () => {
    const list = getNewList();
    try {
      list.delFirst();
    } catch (error) {
      expect(error.toString()).toBe(
        "Error: ArrayList is Empty can not delFirst"
      );
    }
  });

  test("rangeCheck", () => {
    const list = getNewList();
    list.add(getObj(1));
    try {
      list.remove(-1);
    } catch (error) {
      expect(error.toString()).toBe("Error: Index:-1, Size:10");
    }
  });
});
