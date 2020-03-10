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
import { Visitor } from "../../utils/visitor_KV";
import { Comparator } from "../../types";
import Stack from "../stack/Stack";
function inorder<K, V>(visitor: Visitor<K, V>, node: Node<K, V>) {
  const stack = new Stack<Node<K, V>>();
  let temp: Node<K, V> | undefined = node;
  while (true) {
    if (temp !== undefined) {
      stack.push(temp);
      temp = temp.left;
    } else if (stack.isEmpty()) {
      return;
    } else {
      temp = stack.pop();
      if (visitor(temp.key, temp.value)) return;
      temp = temp.right;
    }
  }
}
export class Node<K, V> implements IColor {
  key: K;
  value: V;
  color: Color = Color.RED;
  left: Node<K, V> | undefined = undefined;
  right: Node<K, V> | undefined = undefined;
  parent: Node<K, V> | undefined = undefined;
  constructor(key: K, value: V, parent?: Node<K, V>) {
    this.key = key;
    this.value = value;
    this.parent = parent;
  }
  hasTwoChildren(): boolean {
    return this.left !== undefined && this.right !== undefined;
  }
  isLeftChild(): boolean {
    return this.parent !== undefined && this === this.parent.left;
  }
  isRightChild(): boolean {
    return this.parent !== undefined && this === this.parent.right;
  }
  sibling(): Node<K, V> | undefined {
    if (this.isLeftChild()) return this.parent!.right;
    if (this.isRightChild()) return this.parent!.left;
    return undefined;
  }
  toString(): string {
    return `${this.color === Color.RED ? "R" : "B"}_Key:${this.key},Value:${
      this.value
    }`;
  }
}

export default class TreeMap<K, V> implements IMap<K, V> {
  private _size: number = 0;
  private _root: Node<K, V> | undefined = undefined;
  private _comparator: Comparator<K>;
  constructor(comparator: Comparator<K>) {
    this._comparator = comparator;
  }
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  clear(): void {
    this._root = undefined;
    this._size = 0;
  }
  get(key: K): V | undefined {
    const node = this.node(key);
    return node !== undefined ? node.value : undefined;
  }
  containsKey(key: K): boolean {
    return this.node(key) !== undefined;
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
    const root = this._root;
    if (root === undefined) return;
    inorder(visitor, root);
  }
  put(key: K, value: V): V | undefined {
    const root = this._root;
    if (root === undefined) {
      this._root = new Node<K, V>(key, value);
      this._size++;
      this.afterPut(this._root);
      return undefined;
    }
    let parent = root;
    let node = root;
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
    } while (node !== undefined);
    const newNode = new Node<K, V>(key, value, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._size++;
    this.afterPut(newNode);
    return undefined;
  }
  private afterPut(node: Node<K, V>): void {
    const parent: Node<K, V> | undefined = node.parent;
    if (parent === undefined) {
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
  remove(key: K): V | undefined {
    return this._remove(this.node(key));
  }
  private _remove(node?: Node<K, V>): V | undefined {
    if (node === undefined) return undefined;
    this._size--;
    const oldValue = node.value;
    if (node.hasTwoChildren()) {
      const s = this.successor(node);
      node.key = s.key;
      node.value = s.value;
      node = s;
    }
    const replacement = node.left !== undefined ? node.left : node.right;
    if (replacement !== undefined) {
      replacement.parent = node.parent;
      if (node.parent === undefined) {
        this._root = replacement;
      } else if (node.isLeftChild()) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }
      this.afterRemove(replacement);
    } else if (node.parent === undefined) {
      this._root = undefined;
    } else {
      if (node.isLeftChild()) {
        node.parent.left = undefined;
      } else {
        node.parent.right = undefined;
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
    if (parent === undefined) return;
    const left = parent.left === undefined || node.isLeftChild();
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
    return this._comparator(k1, k2);
  }
  public getNode(key: K): Node<K, V> | undefined {
    return this.node(key);
  }
  public successor(node: Node<K, V>): Node<K, V> {
    let p = node.right;
    if (p !== undefined) {
      while (p.left != undefined) p = p.left;
      return p;
    }
    while (node.isRightChild()) node = node.parent!;
    return node.parent!;
  }
  private node(key: K): Node<K, V> | undefined {
    let node = this._root;
    while (node !== undefined) {
      let cmp = this.compare(key, node.key);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return undefined;
  }
  private rotateLeft(grand: Node<K, V>): void {
    const parent: Node<K, V> = grand.right!;
    const child: Node<K, V> | undefined = parent.left;
    grand.right = child;
    parent.left = grand;
    this.afterRotate(grand, parent, child);
  }
  private rotateRight(grand: Node<K, V>): void {
    const parent: Node<K, V> = grand.left!;
    const child: Node<K, V> | undefined = parent.right;
    grand.left = child;
    parent.right = grand;
    this.afterRotate(grand, parent, child);
  }
  private afterRotate(
    grand: Node<K, V>,
    parent: Node<K, V>,
    child: Node<K, V> | undefined
  ) {
    parent.parent = grand.parent;
    if (grand.isLeftChild()) {
      grand.parent!.left = parent;
    } else if (grand.isRightChild()) {
      grand.parent!.right = parent;
    } else {
      this._root = parent;
    }
    if (child !== undefined) child.parent = grand;
    grand.parent = parent;
  }
}
