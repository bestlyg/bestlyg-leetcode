/**
 * 链表节点类
 * @param {number} val
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * 构造链表
 * @param {number[]} arr
 */
function listNodeFactory(arr) {
  if (arr.length === 0) return null;
  const root = new ListNode(arr.shift());
  let temp = root;
  for (const val of arr) {
    temp.next = new ListNode(val);
    temp = temp.next;
  }
  return root;
}
/**
 * 遍历链表
 * @param {ListNode} node
 * @param {(node:ListNode)=>boolean} visitor
 */
function listNodeTraversal(node, visitor) {
  let temp = node;
  while (temp !== null) {
    if (visitor(temp)) return;
    temp = temp.next;
  }
}
/**
 * 打印链表
 * @param {ListNode} node
 */
function listNodePrint(node) {
  let s = "",
    temp = node;
  while (temp !== null) {
    s += temp.val + " ";
    temp = temp.next;
  }
  console.log(s.substr(0, s.length - 1));
}
/**
 * 获取链表长度
 * @param {ListNode} node
 */
function listNodeLength(node) {
  let l = 0,
    temp = node;
  if (temp === null) return l;
  while (temp !== null) {
    l++;
    temp = temp.next;
  }
  return l;
}
/**
 * 翻转链表长度
 * @param {ListNode} node
 */
function listNodeReverse(node) {
  let newRoot;
  function _reverse(node, prevNode) {
    if (node.next !== null) _reverse(node.next, node);
    else newRoot = node;
    node.next = prevNode;
  }
  _reverse(node, null);
  return newRoot;
}
/**
 * 获取链表最后一个节点
 * @param {ListNode} node
 */
function listNodeLastNode(node) {
  let temp = node;
  if (temp === null) return null;
  while (temp.next !== null) temp = temp.next;
  return temp;
}
module.exports = {
  ListNode,
  listNodeFactory,
  listNodeTraversal,
  listNodePrint,
  listNodeLength,
  listNodeReverse,
  listNodeLastNode
};
