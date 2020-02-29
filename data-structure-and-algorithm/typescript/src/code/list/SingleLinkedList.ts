/**
 * 单链表 无头结点
 */
import AbstractList from "./AbstractList";
class Node<T> {
  element: T;
  next: Node<T> | null;
  constructor(element: T, next: Node<T> | null) {
    this.element = element;
    this.next = next;
  }
  toString(): string {
    return `Node:${this.element}->${this.next?.element}`;
  }
}
export default class SingleLinkedList<T> extends AbstractList<T> {
  firstNode: Node<T> | null = null;
  public remove(element: number): T {
    this.rangeCheck(element);
    let el: T;
    if (element === 0) {
      el = this.delFirst();
    } else if (element === this.size() - 1) {
      el = this.delLast();
    } else {
      const prev = this.node(element - 1);
      el = prev.next!.element!;
      prev.next = prev.next!.next;
      this.length--;
    }
    return el;
  }
  public add(element: T, index: number = this.size()): void {
    this.rangeCheckForAdd(index);
    if (index === 0) {
      this.addFirst(element);
    } else if (index === this.size()) {
      this.addLast(element);
    } else {
      const prev = this.node(index - 1);
      const newNode: Node<T> = new Node(element, prev.next);
      prev.next = newNode;
      this.length++;
    }
  }
  public clear(): void {
    this.firstNode = null;
    this.length = 0;
  }
  public get(index: number): T {
    return this.node(index).element;
  }
  public set(index: number, element: T): T {
    this.rangeCheck(index);
    const node = this.node(index);
    const oldElement = node.element;
    node.element = element;
    return oldElement;
  }
  public indexOf(element: T): number {
    let cur = this.firstNode;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (cur!.element === element) {
        return i;
      }
      cur = cur!.next!;
    }
    return this.ELEMENT_NOT_FOUND;
  }
  public first(): T {
    this.thorwEmpty("first");
    return this.firstNode!.element!;
  }
  public addFirst(element: T): void {
    if (this.firstNode) {
      const newNode = new Node<T>(element, this.firstNode);
      this.firstNode = newNode;
    } else {
      this.firstNode = new Node<T>(element, null);
    }
    this.length++;
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    const oldNode = this.firstNode;
    if (this.size() == 1) {
      return this.delLastNode();
    }
    this.firstNode = this.firstNode!.next;
    this.length--;
    return oldNode!.element!;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this.node(this.size() - 1).element;
  }
  public addLast(element: T): void {
    if (this.firstNode) {
      const newNode = new Node<T>(element, null);
      const prev = this.node(this.size() - 1);
      prev.next = newNode;
    } else {
      this.firstNode = new Node<T>(element, null);
    }
    this.length++;
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    if (this.length === 1) {
      return this.delLastNode();
    } else {
      const prev = this.node(this.size() - 2);
      const oldNode = prev.next;
      prev.next = null;
      this.length--;
      return oldNode!.element!;
    }
  }
  private delLastNode(): T {
    const el = this.firstNode!.element;
    this.clear();
    return el;
  }
  /**
   * 根据index返回Node
   * @param index
   */
  private node(index: number): Node<T> {
    this.rangeCheck(index);
    let cur = this.firstNode as Node<T>;
    for (let i = 0; i < index; i++) {
      cur = cur.next!;
    }
    return cur;
  }
  toString(): string {
    let string = `size:${this.size()},elements:[`;
    let cur = this.firstNode;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i !== 0) {
        string += ",";
      }
      string += cur;
      if (i != len - 1) {
        cur = cur!.next;
      }
    }
    string += "]";
    return string;
  }
}
