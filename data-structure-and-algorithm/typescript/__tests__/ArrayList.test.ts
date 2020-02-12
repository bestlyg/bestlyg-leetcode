import ArrayList from "../src/code/ArrayList";
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
describe("ArrayList", () => {
  test("size", () => {
    const list = new ArrayList<Person>();
    list.add(new Person("1", 1));
    list.add(new Person("2", 2));
    list.add(new Person("3", 3));
    expect(list.size()).toBe(3);
  });
  test("isEmpty ", () => {
    const list = new ArrayList<Person>();
    list.add(new Person("1", 1));
    list.add(new Person("2", 2));
    list.add(new Person("3", 3));
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });
  test("isNotEmpty ", () => {
    const list = new ArrayList<Person>();
    list.add(new Person("1", 1));
    list.add(new Person("2", 2));
    list.add(new Person("3", 3));
    expect(list.isEmpty()).toBe(false);
  });
  test("indexOf", () => {
    const list = new ArrayList<Person>();
    const p1 = new Person("1", 1);
    list.add(p1);
    expect(list.indexOf(p1)).toBe(0);
    expect(list.indexOf(new Person("2", 2))).toBe(-1);
  });
  test("indexOf ELEMENT_NOT_FOUND", () => {
    const list = new ArrayList<Person>();
    expect(list.indexOf(new Person("1", 1))).toBe(-1);
  });
  test("get", () => {
    const list = new ArrayList<Person>();
    const p1 = new Person("1", 1);
    list.add(p1);
    expect(list.get(0)).toBe(p1);
  });
  test("set", () => {
    const list = new ArrayList<Person>();
    const p1 = new Person("1", 1);
    const p2 = new Person("2", 2);
    list.add(p1);
    expect(list.set(0, p2)).toBe(p1);
    expect(list.get(0)).toBe(p2);
  });
  test("contains true", () => {
    const list = new ArrayList<Person>();
    const p1 = new Person("1", 1);
    list.add(p1);
    expect(list.contains(p1)).toBe(true);
  });
  test("contains false", () => {
    const list = new ArrayList<Person>();
    expect(list.contains(new Person("1", 1))).toBe(false);
  });
  test("remove", () => {
    const list = new ArrayList<Person>();
    const p1 = new Person("1", 1);
    list.add(p1);
    expect(list.remove(0)).toBe(p1);
  });
  test("rangeCheck", () => {
    const list = new ArrayList<Person>();
    const p1 = new Person("1", 1);
    list.add(p1);
    try {
      list.remove(-1);
    } catch (error) {
      expect(error.toString()).toBe("Error: 下标越界");
    }
  });
  test("toString", () => {
    const string =
      "size:2\nelements:[\n  Person name:1 age:1,\n  Person name:2 age:2\n]";
    const list = new ArrayList<Person>();
    const p1 = new Person("1", 1);
    const p2 = new Person("2", 2);
    list.add(p1);
    list.add(p2);
    expect(list.toString()).toBe(string);
  });
});
