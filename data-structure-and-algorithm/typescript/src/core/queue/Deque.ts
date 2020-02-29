import Queue from "./Queue";
import IDeque from "./IDeque";

export default class Deque<T> extends Queue<T> implements IDeque<T> {
  enQueueRear(element: T): void {
    this.list.addLast(element);
  }
  enQueueFront(element: T): void {
    this.list.addFirst(element);
  }
  deQueueRear(): T {
    this.thorwEmpty("deQueueRear");
    return this.list.delLast();
  }
  deQueueFront(): T {
    this.thorwEmpty("deQueueFront");
    return this.list.delFirst();
  }
  rear(): T {
    return this.list.last();
  }
}
