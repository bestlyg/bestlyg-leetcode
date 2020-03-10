export interface IVisitor<T> {
  (element: T): boolean;
  stop: boolean;
}
export type Visitor<T> = (element: T) => boolean;
export function visitorMixin<T>(visitor: Visitor<T>): IVisitor<T> {
  let iVisitor = visitor as IVisitor<T>;
  iVisitor.stop = false;
  return iVisitor;
}
