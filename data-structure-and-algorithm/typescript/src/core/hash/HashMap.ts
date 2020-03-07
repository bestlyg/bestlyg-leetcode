import {
  hashCode,
  toUint32,
  toString,
  equals,
  isIHash,
  isIComparable,
  getClassName
} from "./../../utils";
import {
  IColor,
  Color,
  black,
  isBlack,
  red,
  isRed,
  color,
  colorOf
} from "../../utils/color";
import { Visitor_KV, visitorMixin_KV } from "../../utils/visitor";
import IMap from "../map/IMap";
import { IHash } from "../../types";
import Queue from "../queue/Queue";
import BinaryTreesPrinter from "../../utils/BinaryTreesPrinter";
export class Node<K, V> implements IColor {
  hash: number;
  key: K;
  value: V;
  color: Color = Color.RED;
  left: Node<K, V> | null = null;
  right: Node<K, V> | null = null;
  parent: Node<K, V> | null;
  constructor(key: K, value: V, parent: Node<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    let hash = hashCode(key);
    this.hash = toUint32(hash);
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
  public sibling(): Node<K, V> | null {
    if (this.isLeftChild()) return this.parent!.right;
    if (this.isRightChild()) return this.parent!.left;
    return null;
  }
  public toString(): string {
    return `${this.color === Color.RED ? "R" : "B"}_key:【${
      this.key
    }】_value:【${this.value}】`;
  }
}
function levelOrder<K, V>(
  visitor: (key: K, value: V) => boolean,
  node: Node<K, V>
): void {
  _levelOrder(visitorMixin_KV(visitor), node);
}
function _levelOrder<K, V>(visitor: Visitor_KV<K, V>, node: Node<K, V>): void {
  const queue = new Queue<Node<K, V>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (visitor(node.key, node.value)) return;
    if (node.left != null) {
      queue.enQueue(node.left);
    }
    if (node.right != null) {
      queue.enQueue(node.right);
    }
  }
}
const DEFAULT_CAPACITY: number = 1 << 4;
const DEFAULT_LOAD_FACTOR: number = 0.75;
export default class HashMap<K extends IHash, V> implements IMap<K, V> {
  private _size: number = 0;
  private table: Node<K, V>[] = [];
  private capacity: number = DEFAULT_CAPACITY;
  // constructor(capacity: number = DEFAULT_CAPACITY) {
  //   this.capacity = capacity;
  // }
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  clear(): void {
    if (this._size === 0) return;
    this._size = 0;
    this.table.length = 0;
  }
  get(key: K): V | null {
    const node = this.node(key);
    return node !== null ? node.value : null;
  }
  containsKey(key: K): boolean {
    return this.node(key) !== null;
  }
  containsValue(value: V): boolean {
    if (this._size === 0) return false;
    const queue = new Queue<Node<K, V>>();
    for (let i = 0, len = this.table.length; i < len; i++) {
      const root = this.table[i];
      if (root === undefined) continue;
      queue.enQueue(root);
      while (!queue.isEmpty()) {
        const node = queue.deQueue();
        if (equals(value, node.value)) return true;
        if (node.left !== null) queue.enQueue(node.left);
        if (node.right !== null) queue.enQueue(node.right);
      }
    }
    return false;
  }
  traversal(visitor: (key: K, value: V) => boolean): void {
    if (this._size === 0) return;
    for (let i = 0, len = this.capacity; i < len; i++) {
      const root = this.table[i];
      if (root === undefined) continue;
      levelOrder(visitor, root);
    }
  }
  print(): void {
    if (this._size == 0) return;
    const table = this.table;
    for (let i = 0, len = this.capacity; i < len; i++) {
      const root: Node<K, V> = table[i];
      if (root === undefined) continue;
      console.log("【index = " + i + "】");
      BinaryTreesPrinter.print({
        _string(node: object): string {
          const myNode = node as Node<K, V>;
          let parentString = "null";
          if (myNode.parent !== null)
            parentString = toString(myNode.parent.key);
          return toString(myNode) + "_P(" + parentString + ")";
        },
        _root(): object {
          return root;
        },
        _right(node: object): any {
          return (<Node<K, V>>node).right;
        },
        _left(node: object): any {
          return (<Node<K, V>>node).left;
        }
      });
      console.log("---------------------------------------------------");
    }
  }
  put(key: K, value: V): V | null {
    this.resize();
    const index = this.index(key);
    let root = this.table[index];
    if (root === undefined) {
      root = this.createNode(key, value);
      this.table[index] = root;
      this._size++;
      this.fixAfterPut(root);
      return null;
    }
    let parent = root;
    let node: Node<K, V> | null = root;
    let cmp = 0;
    let k1 = key;
    let h1 = hashCode(k1);
    let result: Node<K, V> | null;
    let searched = false;
    do {
      parent = node;
      const k2 = node.key;
      const h2 = node.hash;
      if (h1 > h2) {
        cmp = 1;
      } else if (h1 < h2) {
        cmp = -1;
      } else if (equals(k1, k2)) {
        cmp = 0;
      } else if (
        k1 !== null &&
        k2 !== null &&
        isIComparable(k1) &&
        getClassName(k1) === getClassName(k2) &&
        (cmp = k1.compareTo(k2)) !== 0
      ) {
      } else if (searched) {
        cmp = 1;
      } else {
        if (
          (node.left !== null &&
            (result = this.node(k1, node.left)) !== null) ||
          (node.right !== null && (result = this.node(k1, node.right)) !== null)
        ) {
          node = result;
          cmp = 0;
        } else {
          searched = true;
          cmp = 1;
        }
      }
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        const oldValue = node.value;
        node.key = key;
        node.value = value;
        node.hash = h1;
        return oldValue;
      }
    } while (node !== null);
    const newNode = this.createNode(key, value, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._size++;
    this.fixAfterPut(newNode);
    return null;
  }
  remove(key: K): V | null {
    return this._remove(this.node(key));
  }
  private resize(): void {
    const capacity = this.capacity;
    if (this._size / capacity <= DEFAULT_LOAD_FACTOR) return;
    const oldTable = this.table;
    this.table = [];
    this.capacity = capacity << 1;
    const queue = new Queue<Node<K, V>>();
    for (let i = 0; i < capacity; i++) {
      if (oldTable[i] === undefined) return;
      queue.enQueue(oldTable[i] as Node<K, V>);
      while (!queue.isEmpty()) {
        const node = queue.deQueue();
        if (node.left !== null) queue.enQueue(node.left);
        if (node.right !== null) queue.enQueue(node.right);
        this.moveNode(node);
      }
    }
  }
  private moveNode(newNode: Node<K, V>): void {
    newNode.parent = null;
    newNode.left = null;
    newNode.right = null;
    newNode.color = Color.RED;
    const index = this.index(newNode);
    let root = this.table[index];
    if (root === undefined) {
      root = newNode;
      this.table[index] = newNode;
      this.fixAfterPut(root);
      return;
    }
    let parent = root;
    let node: Node<K, V> | null = root;
    let cmp = 0;
    let k1 = newNode.key;
    let h1 = newNode.hash;
    do {
      parent = node;
      const k2 = node.key;
      const h2 = node.hash;
      if (h1 > h2) {
        cmp = 1;
      } else if (h1 < h2) {
        cmp = -1;
      } else if (
        k1 !== null &&
        k2 !== null &&
        isIComparable(k1) &&
        getClassName(k1) === getClassName(k2) &&
        (cmp = k1.compareTo(k2)) !== 0
      ) {
      } else {
        cmp = 1;
      }
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node!.left;
      }
    } while (node !== null);
    newNode.parent = parent;
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this.fixAfterPut(newNode);
  }
  private fixAfterPut(node: Node<K, V>): void {
    const parent = node.parent;
    if (parent === null) {
      black(node);
      return;
    }
    if (isBlack(parent)) return;
    const uncle = parent.sibling();
    const grand = red(parent.parent) as Node<K, V>;
    if (isRed(uncle)) {
      black(parent);
      black(uncle);
      this.fixAfterPut(grand);
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

  private _remove(node: Node<K, V> | null): V | null {
    if (node === null) return null;
    const willNode = node;
    this._size--;
    const oldValue = node.value;
    if (node.hasTwoChildren()) {
      const s = this.successor(node);
      node.key = s.key;
      node.value = s.value;
      node.hash = s.hash;
      node = s;
    }
    const replacement = node.left !== null ? node.left : node.right;
    const index = this.index(node);
    if (replacement !== null) {
      replacement.parent = node.parent;
      if (node.parent === null) {
        this.table[index] = replacement;
      } else if (node.isLeftChild()) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }
      this.fixAfterRemove(replacement);
    } else if (node.parent === null) {
      Reflect.deleteProperty(this.table, index);
    } else {
      if (node.isLeftChild()) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      this.fixAfterRemove(node);
    }
    this.afterRemove(willNode, node);
    return oldValue;
  }
  private fixAfterRemove(node: Node<K, V>): void {
    if (isRed(node)) {
      black(node);
      return;
    }
    const parent = node.parent;
    if (parent === null) return;
    const left = parent.left === null || node.isLeftChild();
    let sibling: Node<K, V> = left ? parent.right! : parent.left!;
    if (left) {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateLeft(parent);
        sibling = parent.right as Node<K, V>;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.fixAfterRemove(parent);
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
        sibling = parent.left as Node<K, V>;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.fixAfterRemove(parent);
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
  protected afterRemove(willNode: Node<K, V>, removeNode: Node<K, V>): void {}
  protected createNode(key: K, value: V, parent: Node<K, V> | null = null) {
    return new Node<K, V>(key, value, parent);
  }
  private node(k1: K, node: Node<K, V> | null = null): Node<K, V> | null {
    if (node === null) {
      const root = this.table[this.index(k1)];
      if (root == null) return null;
      else return this.node(k1, root);
    }
    const h1 = hashCode(k1);
    let result: Node<K, V> | null;
    let cmp = 0;
    while (node !== null) {
      const k2 = node.key;
      const h2 = node.hash;
      if (h1 > h2) {
        node = node.right;
      } else if (h1 < h2) {
        node = node.left;
      } else if (equals(k1, k2)) {
        return node;
      } else if (
        k1 !== null &&
        k2 !== null &&
        isIComparable(k1) &&
        getClassName(k1) === getClassName(k2) &&
        (cmp = k1.compareTo(k2)) != 0
      ) {
        node = cmp > 0 ? node.right : node.left;
      } else if (
        node.right !== null &&
        (result = this.node(k1, node.right)) !== null
      ) {
        return result;
      } else {
        node = node.left;
      }
    }
    return null;
  }
  private index(key: K): number;
  private index(node: Node<K, V>): number;
  private index(key: K | Node<K, V>): number {
    if (isIHash(key)) return hashCode(key) & (this.capacity - 1);
    return key.hash & (this.capacity - 1);
  }
  private rotateLeft(grand: Node<K, V>): void {
    const parent: Node<K, V> = grand.right!;
    const child: Node<K, V> | null = parent.left;
    grand.right = child;
    parent.left = grand;
    this.afterRotate(grand, parent, child);
  }
  private rotateRight(grand: Node<K, V>): void {
    const parent: Node<K, V> = grand.left!;
    const child: Node<K, V> | null = parent.right;
    grand.left = child;
    parent.right = grand;
    this.afterRotate(grand, parent, child);
  }
  private afterRotate(
    grand: Node<K, V>,
    parent: Node<K, V>,
    child: Node<K, V> | null
  ) {
    parent.parent = grand.parent;
    if (grand.isLeftChild()) {
      grand.parent!.left = parent;
    } else if (grand.isRightChild()) {
      grand.parent!.right = parent;
    } else {
      this.table[this.index(grand)] = parent;
    }
    if (child !== null) child.parent = grand;
    grand.parent = parent;
  }
  public getNode(key: K): Node<K, V> | null {
    return this.node(key);
  }
  public successor(node: Node<K, V>): Node<K, V> {
    let p = node.right;
    if (p !== null) {
      while (p.left != null) p = p.left;
      return p;
    }
    while (node.isRightChild()) node = node.parent!;
    return node.parent!;
  }
}
