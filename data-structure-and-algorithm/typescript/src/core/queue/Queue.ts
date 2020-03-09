import AbstractQueue from "./AbstractQueue";
export default class Queue<T> extends AbstractQueue<T> {
  protected list: T[] = new Array<T>();
  size(): number {
    return this.list.length;
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  clear(): void {
    this.list.length = 0;
  }
  enQueue(element: T): void {
    this.list.push(element);
  }
  deQueue(): T {
    this.thorwEmpty("deQueue");
    return this.list.shift()!;
  }
  front(): T {
    this.thorwEmpty("front");
    return this.list[0];
  }
  toString(): string {
    let string: string = `size:${this.size()},front->[`;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i != 0) {
        string += ",";
      }
      string += this.list[i];
    }
    string += "]<-rear";
    return string;
  }
}
