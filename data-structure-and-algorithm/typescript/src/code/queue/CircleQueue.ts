import AbstractQueue from "./AbstractQueue";

export default class CircleQueue<T> extends AbstractQueue<T> {
  protected head: number = 0;
  protected length: number = 0;
  private capacity = 10;
  protected elements: (T | null)[];
  constructor(capacity: number) {
    super();
    this.capacity = capacity <= this.capacity ? this.capacity : capacity;
    this.elements = new Array<T | null>(this.capacity).fill(null);
  }
  size(): number {
    return this.length;
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  clear(): void {
    for (let i = 0, len = this.capacity; i < len; i++) {
      this.elements[i] = null;
    }
    this.head = 0;
    this.length = 0;
  }
  front(): T {
    this.thorwEmpty("front");
    return this.elements[this.index(0)]!;
  }
  enQueue(element: T): void {
    this.ensureCapacity();
    this.elements[this.index(this.size())] = element;
    this.length++;
  }
  deQueue(): T {
    this.thorwEmpty("deQueue");
    const index = this.index(0);
    const el = this.elements[index];
    this.elements[index] = null;
    this.head = this.index(1);
    this.length--;
    return el!;
  }
  protected ensureCapacity() {
    const capacity = this.capacity;
    if (capacity !== this.size()) return;
    this.capacity = capacity + (capacity >> 1);
    const newEl = new Array<T | null>(this.capacity).fill(null);
    for (let i = 0, len = this.capacity; i < len; i++) {
      newEl[i] = this.elements[this.index(i)];
    }
    this.elements = newEl;
    this.head = 0;
  }
  protected index(index: number): number {
    index += this.head;
    return index - (index >= this.capacity ? this.capacity : 0);
  }
  toString(): string {
    let string: string = `size:${this.size()},head:${this.head},[`;
    for (let i = 0, len = this.capacity; i < len; i++) {
      if (i != 0) {
        string += ",";
      }
      string += this.elements[i] ? this.elements[i] : "null";
    }
    string += "]";
    return string;
  }
}
