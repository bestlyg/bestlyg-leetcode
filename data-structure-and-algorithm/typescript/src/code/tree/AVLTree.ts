import BinarySearchTree from "./BinarySearchTree";
import Node from "./Node";
import AVLNode from "./AVLNode";
// import { rebalanceMethodType } from "../../types";
export default class AVLTree<T> extends BinarySearchTree<T> {
  protected afterAdd(node: Node<T>): void {
    while (node.parent !== null) {
      node = node.parent;
      if (this.isBalanced(node)) {
        this.updateHeight(node);
      } else {
        this.rebalance(node);
        break;
      }
    }
  }
  protected afterRemove(node: Node<T>): void {
    while (node.parent !== null) {
      node = node.parent;
      if (this.isBalanced(node)) {
        this.updateHeight(node);
      } else {
        this.rebalance(node);
      }
    }
  }
  protected createNode(element: T, parent: Node<T>): Node<T> {
    return new AVLNode<T>(element, parent);
  }
  private isBalanced(node: Node<T>): boolean {
    return Math.abs((node as AVLNode<T>).balanceFactor()) <= 1;
  }
  private updateHeight(node: Node<T>): void {
    (node as AVLNode<T>).updateHeight();
  }
  private rebalance(grand: Node<T>): void {
    const parent = (grand as AVLNode<T>).tallerChild();
    const node = (parent as AVLNode<T>).tallerChild();
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        this.rotate(grand, node, node.right, parent, parent.right, grand);
      } else {
        this.rotate(grand, parent, node.left, node, node.right, grand);
      }
    } else {
      if (node.isLeftChild()) {
        this.rotate(grand, grand, node.left, node, node.right, parent);
      } else {
        this.rotate(grand, grand, parent.left, parent, node.left, node);
      }
    }
  }
  private rotate(
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
    this.updateHeight(b);
    f.left = e;
    if (e != null) {
      e.parent = f;
    }
    this.updateHeight(f);
    d.left = b;
    d.right = f;
    b.parent = d;
    f.parent = d;
    this.updateHeight(d);
  }
  // private rebalance(grand: Node<T>): void {
  //   const parent = (grand as AVLNode<T>).tallerChild();
  //   const node = (parent as AVLNode<T>).tallerChild();
  //   if (parent.isLeftChild()) {
  //     if (node.isLeftChild()) {
  //       this.rotateRight(grand);
  //     } else {
  //       this.rotateLeft(parent);
  //       this.rotateRight(grand);
  //     }
  //   } else {
  //     if (node.isLeftChild()) {
  //       this.rotateRight(parent);
  //       this.rotateLeft(grand);
  //     } else {
  //       this.rotateLeft(grand);
  //     }
  //   }
  // }
  // private rotateLeft(grand: Node<T>): void {
  //   const parent: Node<T> = grand.right!;
  //   const child: Node<T> | null = parent.left;
  //   grand.right = child;
  //   parent.left = grand;
  //   this.afterRotate(grand, parent, child);
  // }
  // private rotateRight(grand: Node<T>): void {
  //   const parent: Node<T> = grand.left!;
  //   const child: Node<T> | null = parent.right;
  //   grand.left = child;
  //   parent.right = grand;
  //   this.afterRotate(grand, parent, child);
  // }
  // private afterRotate(grand: Node<T>, parent: Node<T>, child: Node<T> | null) {
  //   parent.parent = grand.parent;
  //   if (grand.isLeftChild()) {
  //     grand.parent!.left = parent;
  //   } else if (grand.isRightChild()) {
  //     grand.parent!.right = parent;
  //   } else {
  //     this.root = parent;
  //   }
  //   if (child !== null) {
  //     child.parent = grand;
  //   }
  //   grand.parent = parent;
  //   this.updateHeight(grand);
  //   this.updateHeight(parent);
  // }
}
