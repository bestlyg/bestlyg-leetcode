export default interface IMap<K, V> {
  /**
   * 获取映射元素数量
   * @return {number} 返回数量的值
   */
  size(): number;
  /**
   * 判断映射是否为空
   * @return {boolean} true|false
   */
  isEmpty(): boolean;
  /**
   * 清空映射
   */
  clear(): void;
  /**
   * 设置元素的key和value
   * @param {K} key 元素的键
   * @param {V} value 元素的值
   * @return {V| null} 若元素已存在则返回原值，若不存在则返回null
   */
  put(key: K, value: V): V | null;
  /**
   * 根据元素的key获取元素的值
   * @param {K} key 元素的键
   * @return {V|null} 元素的值，若不存在则返回null
   */
  get(key: K): V | null;
  /**
   * 根据元素的key删除元素
   * @param {K} key 元素的键
   * @return {V} 删除元素的值
   */
  remove(key: K): V | null;
  /**
   * 判断元素的键是否存在
   * @param {K} key 元素的键
   * @return {boolean} true|false
   */
  containsKey(key: K): boolean;
  /**
   * 判断元素的值是否存在
   * @param {V} value 元素的值
   * @return {boolean} true|false
   */
  containsValue(value: V): boolean;
  /**
   * 遍历元素
   * @param {(key: K, value: V) => boolean } visitor 遍历器
   */
  traversal(visitor: (key: K, value: V) => boolean): void;
}
