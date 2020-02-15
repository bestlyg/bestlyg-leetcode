import { SingleLinkedList2 } from "../../src/code/list/LinkedList/SingleLinkedList2";
import { Person, getPerson } from "../../src/utils";
function getNewList() {
  return new SingleLinkedList2<Person>();
}
describe("SingleLinkedList2", () => {
  test("add first", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.first()).toBe(obj1);
    const obj2 = getPerson(2);
    list.add(obj2, 0);
    expect(list.first()).toBe(obj2);
    const obj3 = getPerson(3);
    list.addFirst(obj3);
    expect(list.first()).toBe(obj3);
  });
  test("add last", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    list.add(obj1);
    list.add(obj2);
    list.add(obj3);
    const obj4 = getPerson(4);
    list.add(obj4, list.size());
    expect(list.last()).toBe(obj4);
    const obj5 = getPerson(5);
    list.addLast(obj5);
    expect(list.last()).toBe(obj5);
  });
  test("add last in empty obj", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.addLast(obj1);
    expect(list.get(0)).toBe(obj1);
  });
  test("add without first and last", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    list.add(obj1);
    list.add(obj2);
    list.add(obj3);
    const obj4 = getPerson(4);
    list.add(obj4, 1);
    expect(list.get(1)).toBe(obj4);
  });

  test("size", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    expect(list.size()).toBe(3);
  });
  test("isEmpty ", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });
  test("isNotEmpty ", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    expect(list.isEmpty()).toBe(false);
  });
  test("indexOf", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.indexOf(obj1)).toBe(0);
    expect(list.indexOf(getPerson(2))).toBe(list.ELEMENT_NOT_FOUND);
  });
  test("indexOf ELEMENT_NOT_FOUND", () => {
    const list = getNewList();
    expect(list.indexOf(getPerson(1))).toBe(list.ELEMENT_NOT_FOUND);
  });
  test("get", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.get(0)).toBe(obj1);
  });
  test("set first", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    list.add(obj1);
    expect(list.set(0, obj2)).toBe(obj1);
  });
  test("set last", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    list.add(obj1);
    list.add(obj2);
    const obj3 = getPerson(3);
    expect(list.set(1, obj3)).toBe(obj2);
  });
  test("set other", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    list.add(obj1);
    list.add(obj2);
    list.add(obj3);
    const obj4 = getPerson(4);
    expect(list.set(1, obj4)).toBe(obj2);
  });
  test("contains true", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.contains(obj1)).toBe(true);
  });
  test("contains false", () => {
    const list = getNewList();
    expect(list.contains(getPerson(1))).toBe(false);
  });
  test("remove first element", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.remove(obj1)).toBe(0);
  });
  test("remove last element", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    list.add(obj1);
    list.add(obj2);
    list.add(obj3);
    expect(list.remove(obj3)).toBe(2);
  });
  test("remove other element", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    list.add(obj1);
    list.add(obj2);
    list.add(obj3);
    expect(list.remove(obj2)).toBe(1);
  });
  test("remove first index", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.remove(0)).toBe(obj1);
  });
  test("remove last index", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    list.add(obj1);
    list.add(obj2);
    list.add(obj3);
    expect(list.remove(2)).toBe(obj3);
  });
  test("remove other index", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    list.add(obj1);
    list.add(obj2);
    list.add(obj3);
    expect(list.remove(1)).toBe(obj2);
  });
  test("first", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.first()).toBe(obj1);
  });
  test("addFirst", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    list.add(obj1);
    list.addFirst(obj2);
    expect(list.first()).toBe(obj2);
  });
  test("delFirst", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.delFirst()).toBe(obj1);
  });
  test("Last", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.last()).toBe(obj1);
  });
  test("addLast", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    const obj2 = getPerson(2);
    list.add(obj1);
    list.addLast(obj2);
    expect(list.last()).toBe(obj2);
  });
  test("delLast", () => {
    const list = getNewList();
    const obj1 = getPerson(1);
    list.add(obj1);
    expect(list.delLast()).toBe(obj1);
  });
  test("throwEmpty", () => {
    const list = getNewList();
    try {
      list.delFirst();
    } catch (error) {
      expect(error.toString()).toBe(
        "Error: List is Empty can not use the Method: delFirst"
      );
    }
  });
  test("rangeCheck", () => {
    const list = getNewList();
    list.add(getPerson(1));
    try {
      list.remove(-1);
    } catch (error) {
      expect(error.toString()).toBe("Error: Index:-1, Size:1");
    }
  });
  test("rangeCheckForAdd", () => {
    const list = getNewList();
    try {
      list.add(getPerson(1), 20);
    } catch (error) {
      expect(error.toString()).toBe("Error: Index:20, Size:0");
    }
  });
  test("toString", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    expect(list.toString()).toBe(
      "size:3,elements:[Node:Person name:1 age:1->Person name:2 age:2,Node:Person name:2 age:2->Person name:3 age:3,Node:Person name:3 age:3->undefined]"
    );
  });
});
