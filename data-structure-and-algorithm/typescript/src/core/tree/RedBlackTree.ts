import BalanceBinarySearchTree from "./BalanceBinarySearchTree";
import Node from "./Node";
import RedBlackNode, {
  black,
  isBlack,
  red,
  isRed,
  color,
  colorOf
} from "./RedBlackNode";
export default class RedBlackTree<T> extends BalanceBinarySearchTree<T> {
  protected createNode(element: T, parent: Node<T> | null) {
    return new RedBlackNode<T>(element, parent);
  }
  protected afterAdd(node: Node<T>): void {
    const parent = node.parent;
    if (parent === null) {
      black(node);
      return;
    }
    if (isBlack(parent)) return;
    const uncle = parent.sibling();
    const grand: Node<T> = red(parent.parent)!;
    if (isRed(uncle)) {
      black(parent);
      black(uncle);
      this.afterAdd(grand);
      return;
    }
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        black(parent);
      } else {
        black(node);
        this.rotateLeft(parent);
      }
      this.rotateRight(grand);
    } else {
      if (node.isLeftChild()) {
        black(node);
        this.rotateRight(parent);
      } else {
        black(parent);
      }
      this.rotateLeft(grand);
    }
  }
  protected afterRemove(node: Node<T>): void {
    if (isRed(node)) {
      black(node);
      return;
    }
    const parent = node.parent;
    if (parent === null) return;
    const left = parent.left === null || node.isLeftChild();
    let sibling = left ? parent.right! : parent.left!;
    if (left) {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateLeft(parent);
        sibling = parent.right!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.afterRemove(parent);
      } else {
        if (isBlack(sibling.right)) {
          this.rotateRight(sibling);
          sibling = parent.right!;
        }
        color(sibling, colorOf(parent));
        black(sibling.right);
        black(parent);
        this.rotateLeft(parent);
      }
    } else {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateRight(parent);
        sibling = parent.left!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.afterRemove(parent);
      } else {
        if (isBlack(sibling.left)) {
          this.rotateLeft(sibling);
          sibling = parent.left!;
        }
        color(sibling, colorOf(parent));
        black(sibling.left);
        black(parent);
        this.rotateRight(parent);
      }
    }
  }
}
