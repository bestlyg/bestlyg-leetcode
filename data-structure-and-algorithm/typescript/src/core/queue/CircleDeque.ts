import CircleQueue from "./CircleQueue";
import IDeque from "./IDeque";

export default class CircleDeque<T> extends CircleQueue<T>
  implements IDeque<T> {
  rear(): T {
    this.thorwEmpty("rear");
    return this.elements[this.index(this.size() - 1)] as T;
  }
  enQueueRear(element: T): void {
    this.enQueue(element);
  }
  enQueueFront(element: T): void {
    this.ensureCapacity();
    this.head = this.index(-1);
    this.elements[this.head] = element;
    this.length++;
  }
  deQueueFront(): T {
    this.thorwEmpty("deQueueFront");
    return this.deQueue();
  }
  deQueueRear(): T {
    this.thorwEmpty("deQueueRear");
    const index = this.index(this.size() - 1);
    const el = this.elements[index] as T;
    Reflect.deleteProperty(this.elements, index);
    this.length--;
    return el;
  }
}
