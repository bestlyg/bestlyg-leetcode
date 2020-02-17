import IQueue from "./IQueue";

export default interface IDeque<T> extends IQueue<T> {
  /**
   * 尾部入队
   * @param element
   */
  enQueueRear(element: T): void;
  /**
   * 头部入队
   * @param element
   */
  enQueueFront(element: T): void;
  /**
   * 尾部出队
   */
  deQueueRear(): void;
  /**
   * 头部出队
   */
  deQueueFront(): void;
  /**
   * 查看尾元素
   */
  rear(): T;
}
