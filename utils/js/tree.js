/**
 * 树节点类
 * @param {number} val
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * 构造树
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
 * @param {(node:TreeNode)=>boolean} visitor
 */
function treeNodeInorder(node, visitor) {
  let f = false;
  _inorder(node);
  function _inorder(node) {
    if (node === null || f) return;
    _inorder(node.left, visitor);
    if (f) return;
    f = visitor(node);
    _inorder(node.right, visitor);
  }
}
/**
 * 树的层序遍历
 * @param {TreeNode} node
 * @param {(node:TreeNode)=>boolean} visitor
 */
function treeNodeLevelOrder(node, visitor) {
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
function treeNodePrint(node) {
  let s = "";
  treeNodeInorder(node, (node) => {
    s += node.val + " ";
    return false;
  });
  console.log(s.substr(0, s.length - 1));
}
module.exports = {
  TreeNode,
  treeNodeFactory,
  treeNodeInorder,
  treeNodeLevelOrder,
  treeNodePrint
};
