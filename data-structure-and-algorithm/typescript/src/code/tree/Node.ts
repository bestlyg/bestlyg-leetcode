export default class Node<T> {
  element: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;
  parent: Node<T> | null;
  public constructor(element: T, parent: Node<T> | null = null) {
    this.element = element;
    this.parent = parent;
  }
  public hasNoChildren(): boolean {
    return this.left == null && this.right == null;
  }
  public hasOneChildren(): boolean {
    return !this.hasNoChildren() && !this.hasTwoChildren();
  }
  public hasTwoChildren(): boolean {
    return this.left != null && this.right != null;
  }
}
