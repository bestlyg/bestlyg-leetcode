export default interface IQueue<T> {
  /**
   * 获取队列长度
   */
  size(): number;
  /**
   * 判断是否为空
   */
  isEmpty(): boolean;
  /**
   * 清空队列
   */
  clear(): void;
  /**
   * 入队
   * @param element
   */
  enQueue(element: T): void;
  /**
   * 出队
   */
  deQueue(): T;
  /**
   * 查看头元素
   */
  front(): T;
}
