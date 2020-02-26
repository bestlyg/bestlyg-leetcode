import { toString } from "../../utils";
export default class Node<T> {
  element: T;
  left: Node<T> | null = null;
  right: Node<T> | null = null;
  parent: Node<T> | null = null;
  /**
   * 构造一个树节点
   * @param element 节点元素
   * @param parent 父节点
   */
  public constructor(element: T, parent: Node<T> | null = null) {
    this.element = element;
    this.parent = parent;
  }
  public hasNoChildren(): boolean {
    return this.left === null && this.right === null;
  }
  public hasOneChildren(): boolean {
    return !this.hasNoChildren() && !this.hasTwoChildren();
  }
  public hasTwoChildren(): boolean {
    return this.left !== null && this.right !== null;
  }
  public isLeftChild(): boolean {
    return this.parent !== null && this === this.parent.left;
  }
  public isRightChild(): boolean {
    return this.parent !== null && this === this.parent.right;
  }
  public sibling(): Node<T> | null {
    if (this.isLeftChild()) return this.parent!.right;
    if (this.isRightChild()) return this.parent!.left;
    return null;
  }
  public toString(): string {
    return this.element + "";
  }
}
