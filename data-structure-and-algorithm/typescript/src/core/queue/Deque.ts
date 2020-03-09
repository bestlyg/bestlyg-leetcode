import Queue from "./Queue";
import IDeque from "./IDeque";

export default class Deque<T> extends Queue<T> implements IDeque<T> {
  enQueueRear(element: T): void {
    this.list.push(element);
  }
  enQueueFront(element: T): void {
    this.list.unshift(element);
  }
  deQueueRear(): T {
    this.thorwEmpty("deQueueRear");
    return this.list.pop()!;
  }
  deQueueFront(): T {
    this.thorwEmpty("deQueueFront");
    return this.list.shift()!;
  }
  rear(): T {
    return this.list[this.size() - 1];
  }
}
