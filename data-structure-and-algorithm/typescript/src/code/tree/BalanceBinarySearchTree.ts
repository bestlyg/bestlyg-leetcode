import BinarySearchTree from "./BinarySearchTree";
import Node from "./Node";
export default class BalanceBinarySearchTree<T> extends BinarySearchTree<T> {
  protected rotate(
    r: Node<T>,
    b: Node<T>,
    c: Node<T> | null,
    d: Node<T>,
    e: Node<T> | null,
    f: Node<T>
  ): void {
    d.parent = r.parent;
    if (r.isLeftChild()) {
      r.parent!.left = d;
    } else if (r.isRightChild()) {
      r.parent!.right = d;
    } else {
      this.root = d;
    }
    b.right = c;
    if (c != null) {
      c.parent = b;
    }
    f.left = e;
    if (e != null) {
      e.parent = f;
    }
    d.left = b;
    d.right = f;
    b.parent = d;
    f.parent = d;
  }
  protected rotateLeft(grand: Node<T>): void {
    const parent: Node<T> = grand.right!;
    const child: Node<T> | null = parent.left;
    grand.right = child;
    parent.left = grand;
    this.afterRotate(grand, parent, child);
  }
  protected rotateRight(grand: Node<T>): void {
    const parent: Node<T> = grand.left!;
    const child: Node<T> | null = parent.right;
    grand.left = child;
    parent.right = grand;
    this.afterRotate(grand, parent, child);
  }
  protected afterRotate(
    grand: Node<T>,
    parent: Node<T>,
    child: Node<T> | null
  ) {
    parent.parent = grand.parent;
    if (grand.isLeftChild()) {
      grand.parent!.left = parent;
    } else if (grand.isRightChild()) {
      grand.parent!.right = parent;
    } else {
      this.root = parent;
    }
    if (child !== null) {
      child.parent = grand;
    }
    grand.parent = parent;
  }
}
