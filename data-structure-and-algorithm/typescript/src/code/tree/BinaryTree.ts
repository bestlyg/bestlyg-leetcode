import { heightMethodType } from "./../../types/index";
import { extend } from "../../utils/index";
import Node from "./Node";
import Queue from "../queue/Queue";

export default class BinaryTree<T> {
  protected _size: number = 0;
  protected root: Node<T> | null = null;
  public size(): number {
    return this._size;
  }
  public isEmpty(): boolean {
    return this._size === 0;
  }
  public clear(): void {
    this.root = null;
    this._size = 0;
  }
  public preorder(visitor: (element: T) => boolean): void {
    preorder(visitor, this.root);
  }
  public inorder(visitor: (element: T) => boolean): void {
    inorder(visitor, this.root);
  }
  public postorder(visitor: (element: T) => boolean): void {
    postorder(visitor, this.root);
  }
  public levelOrder(visitor: (element: T) => boolean): void {
    if (this.root === null) return;
    levelOrder(visitor, this.root);
  }
  public isProper(): boolean {
    if (this.root === null) return false;
    return isProper(this.root);
  }
  public isFull(): boolean {
    if (this.root === null) return false;
    return Math.pow(2, this.height()) - 1 === this.size();
  }
  public isComplete(): boolean {
    if (this.root === null) return false;
    return iSComplete(this.root);
  }
  public height(method: heightMethodType = "ergodic"): number {
    return height(this.root, method);
  }
  public predecessor(node: Node<T>): Node<T> | null {
    let p = node.left;
    if (p != null) {
      while (p.right !== null) {
        p = p.right;
      }
      return p;
    }
    while (node.parent !== null && node === node.parent.left) {
      node = node.parent;
    }
    return node.parent;
  }
  public successor(node: Node<T>): Node<T> | null {
    let p = node.right;
    if (p != null) {
      while (p.left !== null) {
        p = p.left;
      }
      return p;
    }
    while (node.parent !== null && node === node.parent.right) {
      node = node.parent;
    }
    return node.parent;
  }
}
/**
 * 获取当前节点的高度
 * @param node
 * @param method
 */
function height<T>(node: Node<T> | null, method: heightMethodType): number {
  switch (method) {
    case "ergodic":
      return heightWithErgodic(node);
    case "recursion":
      return heightWithRecursion(node);
  }
}
/**
 * 判断是否是真二叉树
 * @param node
 */
function isProper<T>(node: Node<T>): boolean {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (node.hasOneChildren()) return false;
    if (node.hasTwoChildren()) {
      queue.enQueue(node.left!);
      queue.enQueue(node.right!);
    }
  }
  return true;
}
/**
 * 判断是否是完全二叉树
 * @param node
 */
function iSComplete<T>(node: Node<T>): boolean {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  let leaf = false;
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (leaf && !node.hasNoChildren()) return false;
    if (node.left != null) {
      queue.enQueue(node.left);
    } else if (node.right != null) {
      return false;
    }
    if (node.right != null) {
      queue.enQueue(node.right);
    } else {
      leaf = true;
    }
  }
  return true;
}
interface visitorObj {
  stop: boolean;
}
function visitorMixin<T>(
  visitor: (element: T) => boolean
): ((element: T) => boolean) & visitorObj {
  return extend(visitor, { stop: false });
}
/**
 * 前序遍历
 * @param visitor
 * @param node
 */
function preorder<T>(
  visitor: (element: T) => boolean,
  node: Node<T> | null
): void {
  _preorder(visitorMixin(visitor), node);
}
function _preorder<T>(
  visitor: ((element: T) => boolean) & visitorObj,
  node: Node<T> | null
) {
  if (node === null || visitor.stop) return;
  visitor.stop = visitor(node.element);
  _preorder(visitor, node.left);
  _preorder(visitor, node.right);
}
/**
 * 中序遍历
 * @param visitor
 * @param node
 */
function inorder<T>(
  visitor: (element: T) => boolean,
  node: Node<T> | null
): void {
  _inorder(visitorMixin(visitor), node);
}
function _inorder<T>(
  visitor: ((element: T) => boolean) & visitorObj,
  node: Node<T> | null
) {
  if (node === null || visitor.stop) return;
  _inorder(visitor, node.left);
  if (visitor.stop) return;
  visitor.stop = visitor(node.element);
  _inorder(visitor, node.right);
}
/**
 * 后序遍历
 * @param visitor
 * @param node
 */
function postorder<T>(
  visitor: (element: T) => boolean,
  node: Node<T> | null
): void {
  _postorder(visitorMixin(visitor), node);
}
function _postorder<T>(
  visitor: ((element: T) => boolean) & visitorObj,
  node: Node<T> | null
) {
  if (node === null || visitor.stop) return;
  _postorder(visitor, node.left);
  _postorder(visitor, node.right);
  if (visitor.stop) return;
  visitor.stop = visitor(node.element);
}
/**
 * 层序遍历
 * @param visitor
 * @param node
 */
function levelOrder<T>(visitor: (element: T) => boolean, node: Node<T>): void {
  _levelOrder(visitorMixin(visitor), node);
}
function _levelOrder<T>(
  visitor: ((element: T) => boolean) & visitorObj,
  node: Node<T>
): void {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (visitor(node.element)) return;
    if (node.left != null) {
      queue.enQueue(node.left);
    }
    if (node.right != null) {
      queue.enQueue(node.right);
    }
  }
}
/**
 * 迭代展示高度
 * @param node
 */
function heightWithErgodic<T>(node: Node<T> | null): number {
  if (node === null) return 0;
  let height = 0;
  let levelSize = 1;
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    levelSize--;
    if (node.left != null) {
      queue.enQueue(node.left);
    }
    if (node.right != null) {
      queue.enQueue(node.right);
    }
    if (levelSize === 0) {
      levelSize = queue.size();
      height++;
    }
  }
  return height;
}
function heightWithRecursion<T>(node: Node<T> | null): number {
  if (node === null) return 0;
  return (
    1 +
    Math.max(heightWithRecursion(node.left), heightWithRecursion(node.right))
  );
}
