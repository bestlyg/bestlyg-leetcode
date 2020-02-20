import Node from "../../src/code/tree/Node";

describe("Node", () => {
  test("hasTwoChildren", () => {
    const node = new Node<number>(1);
    node.left = new Node<number>(2, node);
    node.right = new Node<number>(3, node);
    expect(node.hasTwoChildren()).toBe(true);
    expect(node.hasOneChildren()).toBe(false);
    expect(node.hasNoChildren()).toBe(false);
  });
  test("hasOneChildren", () => {
    const node = new Node<number>(1);
    node.left = new Node<number>(2, node);
    expect(node.hasTwoChildren()).toBe(false);
    expect(node.hasOneChildren()).toBe(true);
    expect(node.hasNoChildren()).toBe(false);
  });
  test("hasNoChildren", () => {
    const node = new Node<number>(1);
    expect(node.hasTwoChildren()).toBe(false);
    expect(node.hasOneChildren()).toBe(false);
    expect(node.hasNoChildren()).toBe(true);
  });
});
