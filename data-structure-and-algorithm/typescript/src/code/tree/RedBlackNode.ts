import Node from "./Node";
export enum Color {
  RED,
  BLACK
}
export function color<T>(node: Node<T> | null, color: Color): Node<T> | null {
  if (node === null) return node;
  (node as RedBlackNode<T>).color = color;
  return node;
}
export function red<T>(node: Node<T> | null): Node<T> | null {
  return color(node, Color.RED);
}
export function black<T>(node: Node<T> | null): Node<T> | null {
  return color(node, Color.BLACK);
}
export function colorOf<T>(node: Node<T> | null): Color {
  return node === null ? Color.BLACK : (node as RedBlackNode<T>).color;
}
export function isBlack<T>(node: Node<T> | null): boolean {
  return colorOf(node) === Color.BLACK;
}
export function isRed<T>(node: Node<T> | null): boolean {
  return colorOf(node) === Color.RED;
}
export default class RedBlackNode<T> extends Node<T> {
  color: Color = Color.RED;
  public toString(): string {
    return (this.color === Color.RED ? "R" : "B") + "_" + this.element;
  }
}
