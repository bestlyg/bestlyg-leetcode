/**
 * 树节点类
 * @param {number} val
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * 构造树节点
 * @param {number[]} arr
 */
function treeNodeFactory(arr) {
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
 * @param {TreeNode} node
 * @param {(node:TreeNode)=>void} visitor
 */
function treeNodeInorder(node, visitor) {
  if (node.left !== null) treeNodeInorder(node.left, visitor);
  visitor(node);
  if (node.right !== null) treeNodeInorder(node.right, visitor);
}
/**
 * 打印树
 * @param {TreeNode} node
 */
function treeNodePrint(node) {
  let string = "";
  treeNodeInorder(node, (node) => (string += node.val + " "));
  return string.substr(0, string.length - 1);
}
module.exports = { TreeNode, treeNodeFactory, treeNodeInorder, treeNodePrint };
