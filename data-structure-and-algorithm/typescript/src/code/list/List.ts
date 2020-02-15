export interface List<T> {
  readonly ELEMENT_NOT_FOUND: number;
  /**
   * 清除所有元素
   */
  clear(): void;
  /**
   * 返回元素的数量
   * @return
   */
  size(): number;
  /**
   * 是否为空
   * @return
   */
  isEmpty(): boolean;
  /**
   * 是否包含某个元素
   * @param element
   * @return
   */
  contains(element: T): boolean;
  /**
   * 在index位置插入元素
   * @param index
   * @param element
   */
  add(element: T, index?: number): void;
  /**
   * 获index位置的元素
   * @param index
   */
  get(index: number): T;
  /**
   * 设置index位置的元素
   * @param index
   * @param element
   * @return 原来的元素
   */
  set(index: number, element: T): T;
  /**
   * 删除元素
   * @param index
   * @return 删除成功返回true，若元素不存在返回false
   */
  remove(element: T | number): T | number;
  /**
   * 获取元素的index
   * @param element
   * @return
   */
  indexOf(element: T): number;
  /**
   * 获取头元素
   */
  first(): T;
  /**
   * 在头部添加一个元素
   * @param element
   */
  addFirst(element: T): void;
  /**
   * 删除头元素
   * @return 返回删除的元素
   */
  delFirst(): T;
  /**
   * 获取尾元素
   */
  last(): T;
  /**
   * 在尾部添加一个元素
   * @param element
   */
  addLast(element: T): void;
  /**
   * 删除尾元素
   * @return 返回删除的元素
   */
  delLast(): T;
}
