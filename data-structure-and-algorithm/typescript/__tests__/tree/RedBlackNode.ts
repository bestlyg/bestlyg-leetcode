import RedBlackNode, {
  Color,
  black,
  colorOf,
  red,
  isBlack,
  isRed,
  color
} from "./../../src/code/tree/RedBlackNode";

describe("RedBlackNode", () => {
  const node = new RedBlackNode<number>(1);
  const node2 = new RedBlackNode<number>(1);
  describe("Color", () => {
    black(node2);
    test("red", () => {
      expect(colorOf(node)).toBe(Color.RED);
      black(node);
      red(node);
      expect(colorOf(node)).toBe(Color.RED);
    });
    test("black", () => {
      expect(colorOf(node2)).toBe(Color.BLACK);
    });
    test("isBlack", () => {
      expect(isBlack(node2)).toBe(true);
      expect(isBlack(node)).toBe(false);
    });
    test("isRed", () => {
      expect(isRed(node2)).toBe(false);
      expect(isRed(node)).toBe(true);
    });
    test("null", () => {
      const node3 = null;
      expect(colorOf(node3)).toBe(Color.BLACK);
      expect(color(node3, Color.BLACK)).toBeNull();
    });
  });
  test("toString", () => {
    expect(String(node)).toBe("R_1");
    expect(String(node2)).toBe("B_1");
  });
});
