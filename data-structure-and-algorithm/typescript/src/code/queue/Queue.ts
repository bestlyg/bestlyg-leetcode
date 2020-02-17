import DuLinkedList from "../list/DuLinkedList";
import List from "../list/List";
import AbstractQueue from "./AbstractQueue";
export default class Queue<T> extends AbstractQueue<T> {
  protected list: List<T> = new DuLinkedList<T>();
  size(): number {
    return this.list.size();
  }
  isEmpty(): boolean {
    return this.list.isEmpty();
  }
  clear(): void {
    this.list.clear();
  }
  enQueue(element: T): void {
    this.list.addLast(element);
  }
  deQueue(): T {
    return this.list.delFirst();
  }
  front(): T {
    this.thorwEmpty("front");
    return this.list.first();
  }
  toString(): string {
    let string: string = `size:${this.size()},front->[`;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i != 0) {
        string += ",";
      }
      string += this.list.get(i);
    }
    string += "]<-rear";
    return string;
  }
}
