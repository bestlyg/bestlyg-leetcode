export enum Color {
  RED,
  BLACK
}
export interface IColor {
  color: Color;
}
export function color<T>(node: IColor | null, color: Color): IColor | null {
  if (node === null) return node;
  node.color = color;
  return node;
}
export function red<T>(node: IColor | null): IColor | null {
  return color(node, Color.RED);
}
export function black<T>(node: IColor | null): IColor | null {
  return color(node, Color.BLACK);
}
export function colorOf<T>(node: IColor | null): Color {
  return node === null ? Color.BLACK : node.color;
}
export function isBlack<T>(node: IColor | null): boolean {
  return colorOf(node) === Color.BLACK;
}
export function isRed<T>(node: IColor | null): boolean {
  return colorOf(node) === Color.RED;
}
