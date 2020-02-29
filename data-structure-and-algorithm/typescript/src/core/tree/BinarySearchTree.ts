import BinaryTree from "./BinaryTree";
import Node from "./Node";
export default class BinarySearchTree<T> extends BinaryTree<T> {
  private _compare: (t1: T, t2: T) => number;
  constructor(_compare: (t1: T, t2: T) => number) {
    super();
    this._compare = _compare;
  }
  /**
   * 添加元素
   * @param {T} element 元素的值
   */
  public add(element: T): void {
    if (this.root === null) {
      this.root = this.createNode(element, null);
      this._size++;
      this.afterAdd(this.root);
      return;
    }
    let node: Node<T> | null = this.root;
    let parent: Node<T> = node;
    let cmp;
    do {
      cmp = this.compare(element, node.element);
      parent = node;
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node.element = element;
        return;
      }
    } while (node != null);
    const newNode = this.createNode(element, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._size++;
    this.afterAdd(newNode);
  }
  /**
   * 删除元素
   * @param {T} element 元素的值，若不存在则树不动
   */
  public remove(element: T): void {
    this._remove(this.node(element));
  }
  private _remove(node: Node<T> | null): void {
    if (node === null) return;
    this._size--;
    if (node.hasTwoChildren()) {
      const s = this.successor(node);
      node.element = s!.element;
      node = s!;
    }
    const replacement = node.left !== null ? node.left : node.right;
    if (replacement !== null) {
      replacement.parent = node.parent;
      if (node.parent === null) {
        this.root = replacement;
      } else if (node === node.parent.left) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }
      this.afterRemove(replacement);
    } else if (node.parent === null) {
      this.root = null;
      this.afterRemove(node);
    } else {
      if (node === node.parent.left) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      this.afterRemove(node);
    }
  }
  /**
   * 判断该值是否在树中
   * @param {T} element 值
   * @return {boolean} true|false
   */
  public contains(element: T): boolean {
    return this.node(element) !== null;
  }
  /**
   * 获取值所在的节点
   * @param {T} element 值
   * @return {Node<T>|null} 返回节点或null
   */
  public get(element: T): Node<T> | null {
    return this.node(element);
  }
  protected afterAdd(node: Node<T>): void {}
  protected afterRemove(node: Node<T>): void {}
  private node(element: T): Node<T> | null {
    let node = this.root;
    while (node !== null) {
      const cmp = this.compare(element, node.element);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
  }
  private compare(t1: T, t2: T): number {
    return this._compare(t1, t2);
  }
}
