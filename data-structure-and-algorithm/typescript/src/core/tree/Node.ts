import { toString } from "../../utils";
import Queue from "../queue/Queue";
import { Visitor, IVisitor, visitorMixin } from "../../utils/visitor_T";
export default class Node<T> {
  element: T;
  left: Node<T> | undefined = undefined;
  right: Node<T> | undefined = undefined;
  parent: Node<T> | undefined = undefined;
  /**
   * 构造一个树节点
   * @param element 节点元素
   * @param parent 父节点
   */
  public constructor(element: T, parent?: Node<T>) {
    this.element = element;
    this.parent = parent;
  }
  public hasNoChildren(): boolean {
    return this.left === undefined && this.right === undefined;
  }
  public hasOneChildren(): boolean {
    return !this.hasNoChildren() && !this.hasTwoChildren();
  }
  public hasTwoChildren(): boolean {
    return this.left !== undefined && this.right !== undefined;
  }
  public isLeftChild(): boolean {
    return this.parent !== undefined && this === this.parent.left;
  }
  public isRightChild(): boolean {
    return this.parent !== undefined && this === this.parent.right;
  }
  public sibling(): Node<T> | undefined {
    if (this.isLeftChild()) return this.parent!.right;
    if (this.isRightChild()) return this.parent!.left;
    return undefined;
  }
  public toString(): string {
    return this.element + "";
  }
}
/**
 * 判断是否是完全二叉树
 * @param node
 */
export function iSComplete<T>(node: Node<T>): boolean {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  let leaf = false;
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (leaf && !node.hasNoChildren()) return false;
    if (node.left != undefined) {
      queue.enQueue(node.left);
    } else if (node.right != undefined) {
      return false;
    }
    if (node.right != undefined) {
      queue.enQueue(node.right);
    } else {
      leaf = true;
    }
  }
  return true;
}
/**
 * 判断是否是真二叉树
 * @param node
 */
export function isProper<T>(node: Node<T>): boolean {
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
 * 前序遍历
 * @param visitor
 * @param node
 */
export function preorder<T>(visitor: Visitor<T>, node?: Node<T>): void {
  _preorder(visitorMixin(visitor), node);
}
function _preorder<T>(visitor: IVisitor<T>, node?: Node<T>) {
  if (node === undefined || visitor.stop) return;
  visitor.stop = visitor(node.element);
  _preorder(visitor, node.left);
  _preorder(visitor, node.right);
}
/**
 * 中序遍历
 * @param visitor
 * @param node
 */
export function inorder<T>(visitor: Visitor<T>, node?: Node<T>): void {
  _inorder(visitorMixin(visitor), node);
}
function _inorder<T>(visitor: IVisitor<T>, node?: Node<T>) {
  if (node === undefined || visitor.stop) return;
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
export function postorder<T>(visitor: Visitor<T>, node?: Node<T>): void {
  _postorder(visitorMixin(visitor), node);
}
function _postorder<T>(visitor: IVisitor<T>, node?: Node<T>) {
  if (node === undefined || visitor.stop) return;
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
export function levelOrder<T>(visitor: Visitor<T>, node: Node<T>): void {
  _levelOrder(visitor, node);
}
function _levelOrder<T>(visitor: Visitor<T>, node: Node<T>): void {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (visitor(node.element)) return;
    if (node.left != undefined) {
      queue.enQueue(node.left);
    }
    if (node.right != undefined) {
      queue.enQueue(node.right);
    }
  }
}
//迭代
export function height<T>(node?: Node<T>) {
  if (node === undefined) return 0;
  let height = 0;
  let levelSize = 1;
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    levelSize--;
    if (node.left != undefined) {
      queue.enQueue(node.left);
    }
    if (node.right != undefined) {
      queue.enQueue(node.right);
    }
    if (levelSize === 0) {
      levelSize = queue.size();
      height++;
    }
  }
  return height;
}
//递归
// export function height<T>(node?: Node<T>): number {
//   if (node === undefined) return 0;
//   return 1 + Math.max(height(node.left), height(node.right));
// }
