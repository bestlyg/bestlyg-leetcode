import RedBlackTree from "../tree/RedBlackTree";
import ISet from "./ISet";
/**
 * 内置红黑树
 */
export default class TreeSet2<T> implements ISet<T> {
  private tree: RedBlackTree<T>;
  constructor(comparator: (t1: T, t2: T) => number) {
    this.tree = new RedBlackTree<T>(comparator);
  }
  size(): number {
    return this.tree.size();
  }
  isEmpty(): boolean {
    return this.tree.isEmpty();
  }
  clear(): void {
    this.tree.clear();
  }
  contains(element: T): boolean {
    return this.tree.contains(element);
  }
  add(element: T): void {
    this.tree.add(element);
  }
  remove(element: T): void {
    this.tree.remove(element);
  }
  traversal(visitor: (element: T) => boolean) {
    this.tree.inorder(visitor);
  }
}
