import {
  time,
  isNumber,
  Person,
  getPerson,
  extend,
  BinaryTrees,
  repeat,
  blank
} from "../../src/utils";
import AVLTree from "../../src/code/tree/AVLTree";
import { BinaryTreesPrintStyle } from "../../src/code/tree/BinaryTreesPrinter";
import BinarySearchTree from "../../src/code/tree/BinarySearchTree";
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
  test("repeat", () => {
    const string = repeat("-", 3);
    expect(string).toBe("---");
    const string2 = repeat("-", -1);
    expect(string2).toBe("");
  });
  test("blank", () => {
    const string = blank(3);
    expect(string).toBe("   ");
  });
  describe("BinaryTreesPrinter", () => {
    const tree = new AVLTree<number>((num1, num2) => num1 - num2);
    const nums = [74, 56, 14];
    for (const num of nums) {
      tree.add(num);
    }
    test("default", () => {
      expect(BinaryTrees.printString(tree)).toBe(
        `56 p(null)\n     ├───── R 74 p(56)\n     └───── L 14 p(56)\n`
      );
    });
    test("preorder", () => {
      expect(
        BinaryTrees.printString(tree, BinaryTreesPrintStyle.PREORDER)
      ).toBe(`56 p(null)\n     ├───── R 74 p(56)\n     └───── L 14 p(56)\n`);
    });
    test("inorder", () => {
      expect(BinaryTrees.printString(tree, BinaryTreesPrintStyle.INORDER)).toBe(
        ``
      );
    });
    test("postorder", () => {
      expect(
        BinaryTrees.printString(tree, BinaryTreesPrintStyle.POSTORDER)
      ).toBe(``);
    });
    test("levelOrderSlashes", () => {
      expect(
        BinaryTrees.printString(tree, BinaryTreesPrintStyle.LEVEL_ORDER_SLASHES)
      ).toBe(``);
    });
    test("levelOrderLines", () => {
      expect(
        BinaryTrees.printString(tree, BinaryTreesPrintStyle.LEVEL_ORDER_LINES)
      ).toBe(``);
    });
    test("only left", () => {
      const tree = new BinarySearchTree<number>((n1, n2) => n1 - n2);
      tree.add(10);
      tree.add(5);
      expect(BinaryTrees.printString(tree)).toBe(
        "10 p(null)\n     └───── L 5 p(10)\n"
      );
    });
    test("only right", () => {
      const tree = new BinarySearchTree<number>((n1, n2) => n1 - n2);
      tree.add(10);
      tree.add(15);
      expect(BinaryTrees.printString(tree)).toBe(
        "10 p(null)\n     └───── R 15 p(10)\n"
      );
    });
    describe("print", () => {
      test("common", () => {
        let err = "";
        try {
          BinaryTrees.print(tree);
          BinaryTrees.print(tree, BinaryTreesPrintStyle.PREORDER);
        } catch (error) {
          err = error;
        }
        expect(err).toBe("");
      });
      test("no root", () => {
        let err = "";
        const root = new BinarySearchTree<number>((n1, n2) => n1 - n2);
        try {
          BinaryTrees.print(root);
        } catch (error) {
          err = error;
        }
        expect(err).toBe("");
        expect(BinaryTrees.printString(root)).toBe("");
      });
    });
  });
});
