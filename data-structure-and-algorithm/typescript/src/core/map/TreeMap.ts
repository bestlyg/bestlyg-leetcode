import {
  IColor,
  Color,
  black,
  isBlack,
  red,
  isRed,
  colorOf,
  color
} from "../../utils/color";
import IMap from "./IMap";
import { Visitor_KV, visitorMixin_KV } from "../../utils/visitor";
function inorder<K, V>(
  visitor: (key: K, value: V) => boolean,
  node: Node<K, V> | null
): void {
  _inorder(visitorMixin_KV(visitor), node);
}
function _inorder<K, V>(visitor: Visitor_KV<K, V>, node: Node<K, V> | null) {
  if (node === null || visitor.stop) return;
  _inorder(visitor, node.left);
  if (visitor.stop) return;
  visitor.stop = visitor(node.key, node.value);
  _inorder(visitor, node.right);
}
export class Node<K, V> implements IColor {
  key: K;
  value: V;
  color: Color = Color.RED;
  left: Node<K, V> | null = null;
  right: Node<K, V> | null = null;
  parent: Node<K, V> | null = null;
  constructor(key: K, value: V, parent: Node<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
  }
  hasTwoChildren(): boolean {
    return this.left !== null && this.right !== null;
  }
  isLeftChild(): boolean {
    return this.parent !== null && this === this.parent.left;
  }
  isRightChild(): boolean {
    return this.parent !== null && this === this.parent.right;
  }
  sibling(): Node<K, V> | null {
    if (this.isLeftChild()) return this.parent!.right;
    if (this.isRightChild()) return this.parent!.left;
    return null;
  }
  toString(): string {
    return `${this.color === Color.RED ? "R" : "B"}_Key:${this.key},Value:${
      this.value
    }`;
  }
}

export default class TreeMap<K, V> implements IMap<K, V> {
  private _size: number = 0;
  private root: Node<K, V> | null = null;
  private comparator: (k1: K, k2: K) => number;
  constructor(comparator: (k1: K, k2: K) => number) {
    this.comparator = comparator;
  }
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  clear(): void {
    this.root = null;
    this._size = 0;
  }
  get(key: K): V | null {
    const node = this.node(key);
    return node !== null ? node.value : null;
  }
  containsKey(key: K): boolean {
    return this.node(key) !== null;
  }
  containsValue(value: V): boolean {
    let result = false;
    this.traversal((k, v) => {
      if (v === value) {
        result = true;
        return true;
      }
      return false;
    });
    return result;
  }
  traversal(visitor: (key: K, value: V) => boolean): void {
    inorder(visitor, this.root);
  }
  put(key: K, value: V): V | null {
    if (this.root === null) {
      this.root = new Node<K, V>(key, value);
      this._size++;
      this.afterPut(this.root!);
      return null;
    }
    let parent = this.root;
    let node = this.root;
    let cmp = 0;
    do {
      cmp = this.compare(key, node.key);
      parent = node;
      if (cmp > 0) {
        node = node.right!;
      } else if (cmp < 0) {
        node = node.left!;
      } else {
        node.key = key;
        const oldValue = node.value;
        node.value = value;
        return oldValue;
      }
    } while (node !== null);
    const newNode = new Node<K, V>(key, value, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._size++;
    this.afterPut(newNode);
    return null;
  }
  private afterPut(node: Node<K, V>): void {
    const parent: Node<K, V> | null = node.parent;
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
      this.afterPut(grand!);
      return;
    }
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        black(parent);
      } else {
        black(node);
        this.rotateLeft(parent);
      }
      this.rotateRight(grand!);
    } else {
      if (node.isLeftChild()) {
        black(node);
        this.rotateRight(parent);
      } else {
        black(parent);
      }
      this.rotateLeft(grand!);
    }
  }
  remove(key: K): V | null {
    return this._remove(this.node(key));
  }
  private _remove(node: Node<K, V> | null): V | null {
    if (node === null) return null;
    this._size--;
    const oldValue = node.value;
    if (node.hasTwoChildren()) {
      const s = this.successor(node);
      node.key = s.key;
      node.value = s.value;
      node = s;
    }
    const replacement = node.left !== null ? node.left : node.right;
    if (replacement !== null) {
      replacement.parent = node.parent;
      if (node.parent === null) {
        this.root = replacement;
      } else if (node.isLeftChild()) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }
      this.afterRemove(replacement);
    } else if (node.parent === null) {
      this.root = null;
    } else {
      if (node.isLeftChild()) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      this.afterRemove(node);
    }
    return oldValue;
  }
  private afterRemove(node: Node<K, V>): void {
    if (isRed(node)) {
      black(node);
      return;
    }
    const parent = node.parent;
    if (parent === null) return;
    const left = parent.left === null || node.isLeftChild();
    let sibling = left ? parent.right : parent.left;
    if (left) {
    } else {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateRight(parent);
        sibling = parent.left;
      }
      if (isBlack(sibling!.left) && isBlack(sibling!.right)) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.afterRemove(parent);
      } else {
        if (isBlack(sibling!.left)) {
          this.rotateLeft(sibling!);
          sibling = parent.left;
        }
        color(sibling, colorOf(parent));
        black(sibling!.left);
        black(parent);
        this.rotateRight(parent);
      }
    }
  }
  private compare(k1: K, k2: K): number {
    return this.comparator(k1, k2);
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
  private node(key: K): Node<K, V> | null {
    let node = this.root;
    while (node !== null) {
      let cmp = this.compare(key, node.key);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
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
      this.root = parent;
    }
    if (child !== null) child.parent = grand;
    grand.parent = parent;
  }
}
