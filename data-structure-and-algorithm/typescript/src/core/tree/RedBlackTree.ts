import BalanceBinarySearchTree from "./BalanceBinarySearchTree";
import Node from "./Node";
import RedBlackNode from "./RedBlackNode";
import { black, isBlack, isRed, red, colorOf, color } from "../../utils/color";
export default class RedBlackTree<T> extends BalanceBinarySearchTree<T> {
  protected createNode(element: T, parent: Node<T> | null) {
    return new RedBlackNode<T>(element, parent);
  }
  protected afterAdd(parentNode: Node<T>): void {
    const node = <RedBlackNode<T>>parentNode;
    const parent = <RedBlackNode<T>>node.parent;
    if (parent === null) {
      black(<RedBlackNode<T>>node);
      return;
    }
    if (isBlack(parent)) return;
    const uncle = <RedBlackNode<T>>parent.sibling();
    const grand = <RedBlackNode<T>>red(<RedBlackNode<T>>parent.parent);
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
  protected afterRemove(parentNode: Node<T>): void {
    const node = <RedBlackNode<T>>parentNode;
    if (isRed(node)) {
      black(node);
      return;
    }
    const parent = node.parent as RedBlackNode<T>;
    if (parent === null) return;
    const left = parent.left === null || node.isLeftChild();
    let sibling: RedBlackNode<T> = (left
      ? parent.right
      : parent.left) as RedBlackNode<T>;
    if (left) {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateLeft(parent);
        sibling = parent.right as RedBlackNode<T>;
      }
      if (
        isBlack(sibling.left as RedBlackNode<T>) &&
        isBlack(sibling.right as RedBlackNode<T>)
      ) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.afterRemove(parent);
      } else {
        if (isBlack(sibling.right as RedBlackNode<T>)) {
          this.rotateRight(sibling);
          sibling = parent.right as RedBlackNode<T>;
        }
        color(sibling, colorOf(parent));
        black(sibling.right as RedBlackNode<T>);
        black(parent);
        this.rotateLeft(parent);
      }
    } else {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateRight(parent);
        sibling = parent.left as RedBlackNode<T>;
      }
      if (
        isBlack(sibling.left as RedBlackNode<T>) &&
        isBlack(sibling.right as RedBlackNode<T>)
      ) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.afterRemove(parent);
      } else {
        if (isBlack(sibling.left as RedBlackNode<T>)) {
          this.rotateLeft(sibling);
          sibling = parent.left as RedBlackNode<T>;
        }
        color(sibling, colorOf(parent));
        black(sibling.left as RedBlackNode<T>);
        black(parent);
        this.rotateRight(parent);
      }
    }
  }
}
