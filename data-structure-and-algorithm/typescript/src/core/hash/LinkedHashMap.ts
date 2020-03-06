import HashMap, { Node } from "./HashMap";
import { IHash } from "../../types";
import { equals } from "../../utils";
class LinkedNode<K, V> extends Node<K, V> {
  prev: LinkedNode<K, V> | null = null;
  next: LinkedNode<K, V> | null = null;
}
export default class LinkedHashMap<K extends IHash, V> extends HashMap<K, V> {
  private first: LinkedNode<K, V> | null = null;
  private last: LinkedNode<K, V> | null = null;
  clear(): void {
    super.clear();
    this.first = null;
    this.last = null;
  }
  protected createNode(key: K, value: V, parent: Node<K, V> | null = null) {
    const node = new LinkedNode(key, value, parent);
    if (this.last === null) {
      this.first = this.last = node;
    } else {
      this.last.next = node;
      node.prev = this.last;
      this.last = node;
    }
    return node;
  }
  containsValue(value: V): boolean {
    let node = this.first;
    while (node !== null) {
      if (equals(value, node.value)) return true;
      node = node.next;
    }
    return false;
  }
  traversal(visitor: (key: K, value: V) => boolean): void {
    let node = this.first;
    while (node !== null) {
      if (visitor(node.key, node.value)) return;
      node = node.next;
    }
  }
  protected afterRemove(willNode: Node<K, V>, removeNode: Node<K, V>): void {
    const node1 = willNode as LinkedNode<K, V>;
    const node2 = removeNode as LinkedNode<K, V>;
    if (node1 !== node2) {
      let tmp = node1.prev;
      node1.prev = node2.prev;
      node2.prev = tmp;
      if (node1.prev === null) this.first = node1;
      else node1.prev.next = node1;
      if (node2.prev === null) this.first = node2;
      else node2.prev.next = node2;
      tmp = node1.next;
      node1.next = node2.next;
      node2.next = tmp;
      if (node1.next === null) this.last = node1;
      else node1.next.prev = node1;
      if (node2.next === null) this.last = node2;
      else node2.next.prev = node2;
    }
    const prev = node2.prev;
    const next = node2.next;
    if (prev === null) this.first = next;
    else prev.next = next;
    if (next === null) this.last = prev;
    else next.prev = prev;
  }
}
