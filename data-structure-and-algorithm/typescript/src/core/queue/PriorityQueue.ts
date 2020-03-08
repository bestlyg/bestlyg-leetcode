import IQueue from "./IQueue";
import BinaryHeap from "../heap/BinaryHeap";
export default class PriorityQueue<T> implements IQueue<T> {
  private heap: BinaryHeap<T>;
  constructor(comparator: (t1: T, t2: T) => number) {
    this.heap = new BinaryHeap<T>(comparator);
  }
  size(): number {
    return this.heap.size();
  }
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }
  clear(): void {
    this.heap.clear();
  }
  enQueue(element: T): void {
    this.heap.add(element);
  }
  deQueue(): T {
    return this.heap.remove();
  }
  front(): T {
    return this.heap.get();
  }
}
