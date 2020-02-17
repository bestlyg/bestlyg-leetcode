/**
 * 双向循环链表
 */
import AbstractList from "./AbstractList";
import { isNumber } from "../../utils";
class Node<T> {
  element: T;
  prev: Node<T>;
  next: Node<T>;
  constructor(prev: Node<T>, element: T, next: Node<T>) {
    this.prev = prev;
    this.element = element;
    this.next = next;
  }
  toString(): string {
    return `Node:${this.prev.element}->${this.element}->${this.next.element}`;
  }
}
export default class DuCircleLinkedList<T> extends AbstractList<T> {
  firstNode: Node<T> | null = null;
  lastNode: Node<T> | null = null;
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
        this.length--;
      }
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
    this.firstNode = null;
    this.lastNode = null;
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
      this.firstNode = new Node<T>(this.lastNode!, element, this.firstNode);
      this.lastNode!.next = this.firstNode;
      oldNode.prev = this.firstNode;
    } else {
      const newNode = new Node<T>({} as Node<T>, element, {} as Node<T>);
      this.firstNode = newNode;
      this.lastNode = newNode;
      newNode.prev = newNode;
      newNode.next = newNode;
    }
    this.length++;
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    if (this.length === 1) {
      return this.delLastNode();
    }
    const oldNode = this.firstNode;
    this.firstNode = this.firstNode!.next;
    this.length--;
    return oldNode!.element!;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this.lastNode!.element;
  }
  public addLast(element: T): void {
    if (this.lastNode) {
      const newNode = new Node<T>(this.lastNode, element, this.firstNode!);
      this.lastNode.next = newNode;
      this.lastNode = newNode;
      this.firstNode!.prev = newNode;
      this.length++;
    } else {
      this.addFirst(element);
    }
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    if (this.length === 1) {
      return this.delLastNode();
    } else {
      const oldNode = this.node(this.size() - 1);
      const prev = oldNode.prev;
      prev.next = this.firstNode!;
      this.lastNode = prev;
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
