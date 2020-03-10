export interface IVisitor<K, V> {
  (key: K, value: V): boolean;
  stop: boolean;
}
export type Visitor<K, V> = (key: K, value: V) => boolean;
export function visitorMixin<K, V>(visitor: Visitor<K, V>): IVisitor<K, V> {
  let iVisitor = visitor as IVisitor<K, V>;
  iVisitor.stop = false;
  return iVisitor;
}
