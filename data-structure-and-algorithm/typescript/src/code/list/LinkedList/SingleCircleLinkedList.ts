/**
 * 单向循环链表
 */
import AbstractList from "../AbstractList";
import { isNumber } from "../../../utils";
class Node<T> {
  element: T;
  next: Node<T>;
  constructor(element: T, next: Node<T>) {
    this.element = element;
    this.next = next;
  }
  toString(): string {
    return `Node:${this.element}->${this.next.element}`;
  }
}
export default class SingleCircleLinkedList<T> extends AbstractList<T> {
  firstNode: Node<T> | undefined;
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
    return this.firstNode!.element!;
  }
  public addFirst(element: T): void {
    const newNode = new Node<T>(element, {} as Node<T>);
    const lastNode = this.size() === 0 ? newNode : this.node(this.size() - 1);
    lastNode.next = newNode;
    this.firstNode = newNode;
    this.length++;
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    if (this.length === 1) {
      return this.delLastNode();
    }
    const oldNode = this.firstNode;
    this.firstNode = this.firstNode!.next;
    return oldNode!.element;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this.node(this.size() - 1).element;
  }
  public addLast(element: T): void {
    const newNode = new Node<T>(element, {} as Node<T>);
    const lastNode = this.size() === 0 ? newNode : this.node(this.size() - 1);
    lastNode.next = newNode;
    if (this.size() === 0) {
      this.firstNode = newNode;
    }
    newNode.next = this.firstNode!;
    this.length++;
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    if (this.length === 1) {
      return this.delLastNode();
    }
    const prev = this.node(this.size() - 2);
    const oldNode = prev.next;
    prev.next = this.firstNode!;
    return oldNode.element;
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
