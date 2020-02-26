import { blank, repeat } from "../../utils";

export enum BinaryTreesPrintStyle {
  PREORDER,
  INORDER,
  POSTORDER,
  LEVEL_ORDER_SLASHES,
  LEVEL_ORDER_LINES
}

export interface BinaryTreeInfo {
  /**
   * 根节点
   */
  _root(): object;
  /**
   * 左节点
   * @param {object} node
   * @return {object | null}
   */
  _left(node: object): object | null;
  /**
   * 右节点
   * @param {object} node
   * @return {object | null}
   */
  _right(node: object): object | null;
  /**
   * 输出节点的方式
   * @param {object} node
   * @return {string}
   */
  _string(node: object): string;
}
export default class BinaryTreesPrinter {
  public static print(
    tree: BinaryTreeInfo,
    style: BinaryTreesPrintStyle = BinaryTreesPrintStyle.PREORDER
  ): void {
    if (tree === null || tree._root() === null) return;
    this.printer(tree, style).print();
  }
  public static printString(
    tree: BinaryTreeInfo,
    style: BinaryTreesPrintStyle = BinaryTreesPrintStyle.PREORDER
  ): string {
    return this.printer(tree, style).printString();
  }
  private static printer(
    tree: BinaryTreeInfo,
    style: BinaryTreesPrintStyle
  ): Printer {
    switch (style) {
      case BinaryTreesPrintStyle.PREORDER:
        return new PreorderPrinter(tree);
      case BinaryTreesPrintStyle.INORDER:
        return new InorderPrinter(tree);
      case BinaryTreesPrintStyle.POSTORDER:
        return new PostorderPrinter(tree);
      case BinaryTreesPrintStyle.LEVEL_ORDER_LINES:
        return new LevelOrderLines(tree);
      case BinaryTreesPrintStyle.LEVEL_ORDER_SLASHES:
        return new LevelOrderSlashes(tree);
    }
  }
}
abstract class Printer {
  protected tree: BinaryTreeInfo;
  constructor(tree: BinaryTreeInfo) {
    this.tree = tree;
  }
  public abstract printString(): string;
  public print(): void {
    console.log(this.printString());
  }
}
class PreorderPrinter extends Printer {
  constructor(tree: BinaryTreeInfo) {
    super(tree);
  }
  //├│─└┌
  public printString(): string {
    const root = this.tree._root();
    if (root === null) return "";
    return this._printString(root, "");
  }
  private _printString(node: object, prefix: string): string {
    const _string = this.tree._string;
    const left = this.tree._left(node);
    const right = this.tree._right(node);
    const nodeString = _string(node);
    const halfLength = nodeString.length >> 1;
    let string = `${_string(node)}\n`;
    if (right !== null) {
      string += `${prefix + blank(halfLength)}${
        left === null ? "└" : "├"
      }${repeat("─", halfLength) + " R "}`;
      string += this._printString(
        right,
        prefix +
          `${blank(halfLength)}${left === null ? " " : "│"}${blank(halfLength)}`
      );
    }
    if (left !== null) {
      string += `${prefix + blank(halfLength)}└${repeat("─", halfLength) +
        " L "}`;
      string += this._printString(
        left,
        prefix + `${blank(halfLength)}${blank(halfLength + 1)}`
      );
    }
    return string;
  }
}
class InorderPrinter extends Printer {
  constructor(tree: BinaryTreeInfo) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}
class PostorderPrinter extends Printer {
  constructor(tree: BinaryTreeInfo) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}
class LevelOrderSlashes extends Printer {
  constructor(tree: BinaryTreeInfo) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}
class LevelOrderLines extends Printer {
  constructor(tree: BinaryTreeInfo) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}
