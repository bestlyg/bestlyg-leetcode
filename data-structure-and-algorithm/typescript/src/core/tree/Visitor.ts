import { extend, IVisitor } from "../../utils";
export type Visitor<T> = ((element: T) => boolean) & IVisitor;
export function visitorMixin<T>(visitor: (element: T) => boolean): Visitor<T> {
  return extend(visitor, { stop: false });
}
