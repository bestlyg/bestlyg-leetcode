export enum Color {
  RED,
  BLACK
}
export interface IColor {
  color: Color;
}
export function color<T>(
  node: IColor | undefined,
  color: Color
): IColor | undefined {
  if (node === undefined) return node;
  node.color = color;
  return node;
}
export function red<T>(node: IColor | undefined): IColor | undefined {
  return color(node, Color.RED);
}
export function black<T>(node: IColor | undefined): IColor | undefined {
  return color(node, Color.BLACK);
}
export function colorOf<T>(node: IColor | undefined): Color {
  return node === undefined ? Color.BLACK : node.color;
}
export function isBlack<T>(node: IColor | undefined): boolean {
  return colorOf(node) === Color.BLACK;
}
export function isRed<T>(node: IColor | undefined): boolean {
  return colorOf(node) === Color.RED;
}
