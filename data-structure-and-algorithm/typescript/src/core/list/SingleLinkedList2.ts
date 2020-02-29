/**
 * 单链表 有头结点
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
export default class SingleLinkedList2<T> extends AbstractList<T> {
  firstNode: Node<T>;
  constructor() {
    super();
    this.firstNode = new Node<T>({} as T, null);
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
  public clear(): void {
    this.firstNode.next = null;
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
    let cur = this.firstNode.next;
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
    return this.firstNode.next!.element;
  }
  public addFirst(element: T): void {
    const newNode = new Node<T>(element, this.firstNode.next);
    this.firstNode.next = newNode;
    this.length++;
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    if (this.size() === 1) {
      return this.delLastNode();
    }
    const oldNode = this.firstNode.next;
    this.firstNode.next = this.firstNode.next!.next;
    this.length--;
    return oldNode!.element;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this.node(this.size() - 1).element;
  }
  public addLast(element: T): void {
    if (this.firstNode.next) {
      const newNode = new Node<T>(element, null);
      const prev = this.node(this.size() - 1);
      prev.next = newNode;
      this.length++;
    } else {
      this.addFirst(element);
    }
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    if (this.length === 1) {
      return this.delLastNode();
    }
    const prev = this.node(this.size() - 2);
    const oldNode = prev.next;
    prev.next = null;
    this.length--;
    return oldNode!.element!;
  }
  private delLastNode(): T {
    const el = this.firstNode.next!.element;
    this.clear();
    return el;
  }
  /**
   * 根据index返回Node
   * @param index
   */
  private node(index: number): Node<T> {
    this.rangeCheck(index);
    let cur = this.firstNode.next;
    for (let i = 0; i < index; i++) {
      cur = cur!.next!;
    }
    return cur!;
  }
  toString(): string {
    let string = `size:${this.size()},elements:[`;
    let cur = this.firstNode.next;
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