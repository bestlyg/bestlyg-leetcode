import { IColor, Color } from "../../utils/color";
import Node from "./Node";
export default class RedBlackNode<T> extends Node<T> implements IColor {
  color: Color = Color.RED;
  public toString(): string {
    return (this.color === Color.RED ? "R" : "B") + "_" + this.element;
  }
}
