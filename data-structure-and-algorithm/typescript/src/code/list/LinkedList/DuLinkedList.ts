/**
 * 双链表
 */
import { AbstractList } from "../AbstractList";
import { isNumber } from "../../../utils";
class Node<T> {
  element: T;
  prev: Node<T> | undefined;
  next: Node<T> | undefined;
  constructor(
    prev: Node<T> | undefined,
    element: T,
    next: Node<T> | undefined
  ) {
    this.prev = prev;
    this.element = element;
    this.next = next;
  }
  toString(): string {
    return `Node:${this.prev ? this.prev.element : "null"}->${this.element}->${
      this.next ? this.next.element : "null"
    }`;
  }
}
export class DuLinkList<T> extends AbstractList<T> {
  firstNode: Node<T> | undefined;
  lastNode: Node<T> | undefined;
  public add(element: T, index: number = this.size()): void {
    this.rangeCheckForAdd(index);
    if (index === 0) {
      this.addFirst(element);
    } else if (index === this.size()) {
      this.addLast(element);
    } else {
      const next = this.node(index);
      const prev = next.prev;
      const newNode: Node<T> = new Node(prev, element, next);
      prev!.next = newNode;
      next.prev = newNode;
      this.length++;
    }
  }
  public remove(element: number | T): number | T {
    if (isNumber(element)) {
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
      }
      this.length--;
      return el;
    } else {
      const index = this.indexOf(element);
      this.rangeCheck(index);
      if (index === 0) {
        this.delFirst();
      } else if (index === this.size() - 1) {
        this.delLast();
      } else {
        const prev = this.node(index - 1);
        const oldNode = prev.next;
        prev.next = oldNode!.next;
      }
      this.length--;
      return index!;
    }
  }
  public clear(): void {
    this.firstNode = undefined;
    this.lastNode = undefined;
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
      cur = cur!.next;
    }
    return this.ELEMENT_NOT_FOUND;
  }
  public first(): T {
    this.thorwEmpty("first");
    return this.firstNode!.element;
  }
  public addFirst(element: T): void {
    if (this.firstNode) {
      const oldNode = this.firstNode;
      this.firstNode = new Node<T>(undefined, element, oldNode);
      oldNode.prev = this.firstNode;
    } else {
      const newNode = new Node<T>(undefined, element, undefined);
      this.firstNode = newNode;
      this.lastNode = newNode;
    }
    this.length++;
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    const oldNode = this.firstNode;
    this.firstNode = this.firstNode!.next;
    return oldNode!.element!;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this.lastNode!.element;
  }
  public addLast(element: T): void {
    if (this.lastNode) {
      const newNode = new Node<T>(this.lastNode, element, undefined);
      this.lastNode.next = newNode;
      this.lastNode = newNode;
      this.length++;
    } else {
      this.addFirst(element);
    }
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    if (this.length === 1) {
      return this.delFirst();
    } else {
      const prev = this.node(this.size() - 2);
      const oldNode = prev.next;
      prev.next = undefined;
      return oldNode!.element!;
    }
  }
  /**
   * 根据index返回Node
   * @param index
   */
  private node(index: number): Node<T> {
    this.rangeCheck(index);
    const length = this.size();
    if (index <= length >> 1) {
      let cur = this.firstNode!;
      for (let i = 0; i < index; i++) {
        cur = cur.next!;
      }
      return cur;
    } else {
      let cur = this.lastNode!;
      for (let i = this.size() - 1; i > index; i--) {
        cur = cur.prev!;
      }
      return cur;
    }
  }
  toString(): string {
    this.thorwEmpty("toString");
    let string = `size:${this.size()},elements:[`;
    let cur = this.firstNode;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i !== 0) {
        string += ",";
      }
      string += cur;
      cur = cur!.next;
    }
    string += "]";
    return string;
  }
}
