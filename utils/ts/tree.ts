/**
 * 树节点类
 */
export class TreeNode {
  /**
   * 构造树
   * @param arr
   */
  static factory(arr: number[]): TreeNode | null {
    if (arr.length === 0) return null;
    let root = new TreeNode(arr.shift());
    const queue = [root];
    while (queue.length !== 0) {
      const node = queue.shift();
      let temp = arr.shift();
      if (temp !== null && temp !== undefined) {
        node.left = new TreeNode(temp);
        queue.push(node.left);
      }
      temp = arr.shift();
      if (temp !== null && temp !== undefined) {
        node.right = new TreeNode(temp);
        queue.push(node.right);
      }
    }
    return root;
  }
  /**
   * 树的中序遍历
   * @param node
   * @param visitor
   */
  static inorder(node: TreeNode, visitor: (node: TreeNode) => boolean): void {
    let f = false;
    _inorder(node);
    function _inorder(node) {
      if (node === null || f) return;
      _inorder(node.left);
      if (f) return;
      f = visitor(node);
      _inorder(node.right);
    }
  }
  /**
   * 树的层序遍历
   * @param node
   * @param visitor
   */
  static levelOrder(
    node: TreeNode,
    visitor: (node: TreeNode) => boolean
  ): void {
    const queue = [node];
    while (queue.length !== 0) {
      const node = queue.shift();
      if (visitor(node)) return;
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
  /**
   * 打印树
   * @param {TreeNode} node
   */
  static print(node): void {
    let s = "";
    TreeNode.inorder(node, (node) => {
      s += node.val + " ";
      return false;
    });
    console.log(s.substr(0, s.length - 1));
  }
  constructor(
    public val: number = 0,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
  print(): void {
    TreeNode.print(this);
  }
  inorder(visitor: (node: TreeNode) => boolean): void {
    TreeNode.inorder(this, visitor);
  }
  levelOrder(visitor: (node: TreeNode) => boolean): void {
    TreeNode.levelOrder(this, visitor);
  }
}