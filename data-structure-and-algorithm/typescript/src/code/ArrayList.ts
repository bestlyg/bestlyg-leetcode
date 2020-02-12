export default class ArrayList<T> {
  private elements: Array<T> = []; //所有元素储存
  private static ELEMENT_NOT_FOUND = -1;
  /**
   * 清除所有元素
   */
  public clear(): void {
    this.elements.length = 0;
  }
  /**
   * 元素的数量
   * @return
   */
  public size(): number {
    return this.elements.length;
  }
  /**
   * 是否为空
   * @return
   */
  public isEmpty(): boolean {
    return this.elements.length === 0;
  }
  /**
   * 查看元素的索引
   * @param element
   * @return
   */
  public indexOf(element: T): number {
    for (let i = 0, len = this.size(); i < len; i++) {
      if (this.elements[i] === element) {
        return i;
      }
    }
    return ArrayList.ELEMENT_NOT_FOUND;
  }
  /**
   * 获取index位置的元素
   * @param index
   * @return
   */
  public get(index: number): T {
    this.rangeCheck(index);
    return this.elements[index];
  }
  /**
   * 设置index位置的元素
   * @param index
   * @param element
   * @return 原来的元素ֵ
   */
  public set(index: number, element: T): T {
    this.rangeCheck(index);
    return this.elements.splice(index, 1, element)[0];
  }
  /**
   * 是否包含某个元素
   * @param element
   * @return
   */
  public contains(element: T): boolean {
    return this.indexOf(element) !== ArrayList.ELEMENT_NOT_FOUND;
  }
  /**
   * 添加元素到尾部
   * @param element
   */
  public add(element: T): void {
    this.elements.push(element);
  }
  /**
   * 在index位置插入一个元素
   * @param index
   * @param element
   */
  //   public add(index: number, element: T) {}

  /**
   * 删除index位置的元素
   * @param index
   * @return
   */
  public remove(index: number): T {
    this.rangeCheck(index);
    return this.elements.splice(index, 1)[0];
  }
  private rangeCheck(index: number) {
    if (index < 0 || index >= this.elements.length) {
      throw new Error("下标越界");
    }
  }
  public toString(): string {
    let string = `size:${this.size()}\nelements:[`;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i !== 0) {
        string += ",\n";
      } else {
        string += "\n";
      }
      string += `  ${this.elements[i]}`;
    }
    string += "\n]";
    return string;
  }
}
