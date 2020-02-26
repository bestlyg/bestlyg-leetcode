import { Person, getPerson } from "./../../src/utils/Person";
import BinarySearchTree from "../../src/code/tree/BinarySearchTree";

function testCompare(p1: Person, p2: Person): number {
  return p1.Age - p2.Age;
}
function getNewBST(
  fn: (p1: Person, p2: Person) => number = testCompare
): BinarySearchTree<Person> {
  return new BinarySearchTree<Person>(fn);
}
function getBST(
  array: Person[] = [
    getPerson(6),
    getPerson(4),
    getPerson(1),
    getPerson(3),
    getPerson(5),
    getPerson(8),
    getPerson(7),
    getPerson(9),
    getPerson(2)
  ]
): BinarySearchTree<Person> {
  const bst = getNewBST();
  for (let i = 0, len = array.length; i < len; i++) {
    bst.add(array[i]);
  }
  return bst;
}
describe("BinarySearchTree", () => {
  test("size", () => {
    const bst = getNewBST();
    expect(bst.size()).toBe(0);
    bst.add(getPerson(1));
    expect(bst.size()).toBe(1);
    bst.clear();
    expect(bst.size()).toBe(0);
  });
  test("isEmpty", () => {
    const bst = getNewBST();
    expect(bst.isEmpty()).toBe(true);
    bst.add(getPerson(1));
    expect(bst.isEmpty()).toBe(false);
    bst.clear();
    expect(bst.isEmpty()).toBe(true);
  });
  test("add", () => {
    const bst = getNewBST();
    bst.add(getPerson(4));
    bst.add(getPerson(1));
    bst.add(getPerson(2));
    bst.add(getPerson(3));
    let string = "";
    bst.inorder((person: Person) => {
      string += person.Age + " ";
      return false;
    });
    expect(string).toBe("1 2 3 4 ");
    bst.add(getPerson(1));
    string = "";
    bst.inorder((person: Person) => {
      string += person.Age + " ";
      return false;
    });
    expect(string).toBe("1 2 3 4 ");
  });
  describe("remove", () => {
    test("remove null", () => {
      const bst = getBST();
      let string = "";
      bst.remove(getPerson(11));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("1 2 3 4 5 6 7 8 9 ");
    });
    test("remove node with one right children", () => {
      const bst = getBST();
      let string = "";
      bst.remove(getPerson(3));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("1 2 4 5 6 7 8 9 ");
    });
    test("remove node with one left children", () => {
      const bst = getNewBST();
      let string = "";
      bst.add(getPerson(3));
      bst.add(getPerson(2));
      bst.add(getPerson(1));
      bst.remove(getPerson(2));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("1 3 ");
    });
    test("remove root without no children", () => {
      const bst = getNewBST();
      bst.add(getPerson(1));
      bst.remove(getPerson(1));
      let string = "";
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("");
    });
    test("remove root", () => {
      const bst = getBST();
      let string = "";
      bst.remove(getPerson(6));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("1 2 3 4 5 7 8 9 ");
    });
    test("remove root with one children", () => {
      const bst = getNewBST();
      let string = "";
      bst.add(getPerson(1));
      bst.add(getPerson(2));
      bst.remove(getPerson(1));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("2 ");
    });
    test("remove leaf", () => {
      const bst = getNewBST();
      let string = "";
      bst.add(getPerson(5));
      bst.add(getPerson(3));
      bst.add(getPerson(6));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("3 5 6 ");
      string = "";
      bst.remove(getPerson(3));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("5 6 ");
      string = "";
      bst.remove(getPerson(6));
      bst.inorder((person: Person) => {
        string += person.Age + " ";
        return false;
      });
      expect(string).toBe("5 ");
    });
  });
  test("contains", () => {
    const bst = getBST();
    expect(bst.contains(getPerson(0))).toBe(false);
    expect(bst.contains(getPerson(1))).toBe(true);
    expect(bst.contains(getPerson(2))).toBe(true);
    expect(bst.contains(getPerson(3))).toBe(true);
    expect(bst.contains(getPerson(4))).toBe(true);
    expect(bst.contains(getPerson(5))).toBe(true);
    expect(bst.contains(getPerson(6))).toBe(true);
    expect(bst.contains(getPerson(7))).toBe(true);
    expect(bst.contains(getPerson(8))).toBe(true);
    expect(bst.contains(getPerson(9))).toBe(true);
    expect(bst.contains(getPerson(10))).toBe(false);
    expect(bst.contains(getPerson(12))).toBe(false);
  });
  test("get", () => {
    const bst = getBST();
    expect(bst.get(getPerson(0))?.element).toBeUndefined();
    expect(bst.get(getPerson(1))?.element).toBe(getPerson(1));
    expect(bst.get(getPerson(2))?.element).toBe(getPerson(2));
    expect(bst.get(getPerson(3))?.element).toBe(getPerson(3));
    expect(bst.get(getPerson(4))?.element).toBe(getPerson(4));
    expect(bst.get(getPerson(5))?.element).toBe(getPerson(5));
    expect(bst.get(getPerson(6))?.element).toBe(getPerson(6));
    expect(bst.get(getPerson(7))?.element).toBe(getPerson(7));
    expect(bst.get(getPerson(8))?.element).toBe(getPerson(8));
    expect(bst.get(getPerson(9))?.element).toBe(getPerson(9));
    expect(bst.get(getPerson(10))?.element).toBeUndefined();
    expect(bst.get(getPerson(12))).toBeNull();
  });
  test("inorder", () => {
    let string = "";
    const bst = getBST();
    bst.inorder((person: Person) => {
      string += person.Age + " ";
      return false;
    });
    expect(string).toBe("1 2 3 4 5 6 7 8 9 ");
  });
  test("inorder with stop", () => {
    let string = "";
    const bst = getBST();
    bst.inorder((person: Person) => {
      string += person.Age + " ";
      if (person.Age === 5) return true;
      return false;
    });
    expect(string).toBe("1 2 3 4 5 ");
  });
  test("postorder", () => {
    let string = "";
    const bst = getBST();
    bst.postorder((person: Person) => {
      string += person.Age + " ";
      return false;
    });
    expect(string).toBe("2 3 1 5 4 7 9 8 6 ");
  });
  test("postorder with stop", () => {
    let string = "";
    const bst = getBST();
    bst.postorder((person: Person) => {
      string += person.Age + " ";
      if (person.Age === 9) return true;
      return false;
    });
    expect(string).toBe("2 3 1 5 4 7 9 ");
  });
  test("preorder", () => {
    let string = "";
    const bst = getBST();
    bst.preorder((person: Person) => {
      string += person.Age + " ";
      return false;
    });
    expect(string).toBe("6 4 1 3 2 5 8 7 9 ");
  });
  test("preorder with stop", () => {
    let string = "";
    const bst = getBST();
    bst.preorder((person: Person) => {
      string += person.Age + " ";
      if (person.Age === 5) return true;
      return false;
    });
    expect(string).toBe("6 4 1 3 2 5 ");
  });
  test("levelOrder", () => {
    const bst = getBST();
    let string = "";
    bst.levelOrder((person: Person) => {
      string += person.Age + " ";
      return false;
    });
    expect(string).toBe("6 4 8 1 5 7 9 3 2 ");
    const bst2 = getNewBST();
    string = "";
    bst2.levelOrder((person: Person) => {
      string += person.Age + " ";
      return false;
    });
    expect(string).toBe("");
  });
  test("levelOrder with stop", () => {
    const bst = getBST();
    let string = "";
    bst.levelOrder((person: Person) => {
      string += person.Age + " ";
      if (person.Age === 7) return true;
      return false;
    });
    expect(string).toBe("6 4 8 1 5 7 ");
  });
  test("height", () => {
    const bst = getBST();
    expect(bst.height()).toBe(5);
    const bst2 = getNewBST();
    expect(bst2.height()).toBe(0);
  });
  test("isComplete", () => {
    const bst = getBST();
    expect(bst.isComplete()).toBe(false);
    const bst2 = getBST([getPerson(2), getPerson(1), getPerson(3)]);
    expect(bst2.isComplete()).toBe(true);
    const bst3 = getNewBST();
    expect(bst3.isComplete()).toBe(false);
    const bst4 = getBST([
      getPerson(64),
      getPerson(10),
      getPerson(90),
      getPerson(2),
      getPerson(70)
    ]);
    expect(bst4.isComplete()).toBe(false);
  });
  test("isProper", () => {
    const bst = getBST();
    expect(bst.isProper()).toBe(false);
    const bst2 = getBST([getPerson(2), getPerson(1), getPerson(3)]);
    expect(bst2.isProper()).toBe(true);
    const bst3 = getNewBST();
    expect(bst3.isProper()).toBe(false);
  });
  test("isFull", () => {
    const bst = getBST();
    expect(bst.isFull()).toBe(false);
    const bst2 = getBST([getPerson(2), getPerson(1), getPerson(3)]);
    expect(bst2.isFull()).toBe(true);
    const bst3 = getNewBST();
    expect(bst3.isFull()).toBe(false);
  });
  test("predecessor", () => {
    const bst = getBST();
    let node = bst.get(getPerson(5));
    node !== null && expect(bst.predecessor(node)?.element).toBe(getPerson(4));
    node = bst.get(getPerson(6));
    node !== null && expect(bst.predecessor(node)?.element).toBe(getPerson(5));
    node = bst.get(getPerson(7));
    node !== null && expect(bst.predecessor(node)?.element).toBe(getPerson(6));
  });
  test("successor", () => {
    const bst = getBST();
    let node = bst.get(getPerson(5));
    node !== null && expect(bst.successor(node)?.element).toBe(getPerson(6));
    node = bst.get(getPerson(6));
    node !== null && expect(bst.successor(node)?.element).toBe(getPerson(7));
  });
});
