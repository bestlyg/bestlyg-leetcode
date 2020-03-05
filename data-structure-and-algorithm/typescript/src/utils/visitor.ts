import { extend } from "./index";
interface IVisitor {
  stop: boolean;
}
export type Visitor_T<T> = ((element: T) => boolean) & IVisitor;
export type Visitor_KV<K, V> = ((key: K, value: V) => boolean) & IVisitor;
export function visitorMixin_T<T>(
  visitor: (element: T) => boolean
): Visitor_T<T> {
  return extend(visitor, { stop: false });
}
export function visitorMixin_KV<K, V>(
  visitor: (key: K, value: V) => boolean
): Visitor_KV<K, V> {
  return extend(visitor, { stop: false });
}
