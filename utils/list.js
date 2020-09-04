'use strict';
exports.__esModule = true;
exports.ListNode = void 0;
var ListNode = /** @class */ (function () {
  function ListNode(val, next) {
    if (val === void 0) {
      val = 0;
    }
    if (next === void 0) {
      next = null;
    }
    this.val = val;
    this.next = next;
  }
  /**
   * 构造链表
   * @param arr
   */
  ListNode.factory = function (arr) {
    if (arr.length === 0) return null;
    var root = new ListNode(arr.shift());
    var temp = root;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
      var val = arr_1[_i];
      temp.next = new ListNode(val);
      temp = temp.next;
    }
    return root;
  };
  /**
   * 遍历链表
   * @param node
   * @param visitor
   */
  ListNode.traversal = function (node, visitor) {
    var temp = node;
    while (temp !== null) {
      if (visitor(temp)) return;
      temp = temp.next;
    }
  };
  /**
   * 打印链表
   * @param node
   */
  ListNode.print = function (node) {
    var s = '',
      temp = node;
    while (temp !== null) {
      s += temp.val + ' ';
      temp = temp.next;
    }
    console.log(s.substr(0, s.length - 1));
  };
  /**
   * 翻转链表长度
   * @param node
   */
  ListNode.reverse = function (node) {
    var newRoot;
    function _reverse(node, prevNode) {
      if (node.next !== null) _reverse(node.next, node);
      else newRoot = node;
      node.next = prevNode;
    }
    _reverse(node, null);
    return newRoot;
  };
  /**
   * 获取链表最后一个节点
   * @param node
   */
  ListNode.lastNode = function (node) {
    var temp = node;
    if (temp === null) return null;
    while (temp.next !== null) temp = temp.next;
    return temp;
  };
  /**
   * 获取链表长度
   * @param node
   */
  ListNode.len = function (node) {
    var l = 0;
    var temp = node;
    if (temp === null) return l;
    while (temp !== null) {
      l++;
      temp = temp.next;
    }
    return l;
  };
  ListNode.prototype.traversal = function (visitor) {
    ListNode.traversal(this, visitor);
  };
  ListNode.prototype.print = function () {
    ListNode.print(this);
  };
  ListNode.prototype.length = function () {
    return ListNode.len(this);
  };
  ListNode.prototype.reverse = function () {
    return ListNode.reverse(this);
  };
  ListNode.prototype.lastNode = function () {
    return ListNode.lastNode(this);
  };
  return ListNode;
})();
exports.ListNode = ListNode;
