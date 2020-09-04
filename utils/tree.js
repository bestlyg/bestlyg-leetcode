'use strict';
exports.__esModule = true;
exports.TreeNode = void 0;
/**
 * 树节点类
 */
var TreeNode = /** @class */ (function () {
  function TreeNode(val, left, right) {
    if (val === void 0) {
      val = 0;
    }
    if (left === void 0) {
      left = null;
    }
    if (right === void 0) {
      right = null;
    }
    this.val = val;
    this.left = left;
    this.right = right;
  }
  /**
   * 构造树
   * @param arr
   */
  TreeNode.factory = function (arr) {
    if (arr.length === 0) return null;
    var root = new TreeNode(arr.shift());
    var queue = [root];
    while (queue.length !== 0) {
      var node = queue.shift();
      var temp = arr.shift();
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
  };
  TreeNode.deserialize = function (data) {
    if (data === '[]') return null;
    var arr = data
      .substring(1, data.length - 1)
      .split(',')
      .map(function (v) {
        return v === 'null' ? null : Number(v);
      });
    return this.factory(arr);
  };
  TreeNode.serialize = function (node) {
    var queue = [node];
    var hasNum = function () {
      return queue.some(function (v) {
        return v !== null;
      });
    };
    var str = '';
    while (hasNum()) {
      var node_1 = queue.shift();
      if (node_1 === null) {
        str += 'null,';
        continue;
      } else {
        str += node_1.val + ',';
      }
      if (node_1.left !== null) queue.push(node_1.left);
      else queue.push(null);
      if (node_1.right !== null) queue.push(node_1.right);
      else queue.push(null);
    }
    return '[' + str.substr(0, str.length - 1) + ']';
  };
  /**
   * 树的前序遍历
   * @param node
   * @param visitor
   */
  TreeNode.preorder = function (node, visitor) {
    var f = false;
    _preorder(node);
    function _preorder(node) {
      if (node === null || f) return;
      f = visitor(node);
      node.left !== null && _preorder(node.left);
      node.right !== null && _preorder(node.right);
    }
  };
  /**
   * 树的中序遍历
   * @param node
   * @param visitor
   */
  TreeNode.inorder = function (node, visitor) {
    var f = false;
    _inorder(node);
    function _inorder(node) {
      if (node === null || f) return;
      _inorder(node.left);
      if (f) return;
      f = visitor(node);
      _inorder(node.right);
    }
  };
  /**
   * 树的层序遍历
   * @param node
   * @param visitor
   */
  TreeNode.levelOrder = function (node, visitor) {
    var queue = [node];
    while (queue.length !== 0) {
      var node_2 = queue.shift();
      if (visitor(node_2)) return;
      if (node_2.left !== null) queue.push(node_2.left);
      if (node_2.right !== null) queue.push(node_2.right);
    }
  };
  /**
   * 打印树
   * @param {TreeNode} node
   */
  TreeNode.print = function (node) {
    var s = '';
    TreeNode.preorder(node, function (node) {
      s += node.val + ' ';
      return false;
    });
    console.log(s.substr(0, s.length - 1));
  };
  TreeNode.prototype.print = function () {
    TreeNode.print(this);
  };
  TreeNode.prototype.preorder = function (visitor) {
    TreeNode.preorder(this, visitor);
  };
  TreeNode.prototype.inorder = function (visitor) {
    TreeNode.inorder(this, visitor);
  };
  TreeNode.prototype.levelOrder = function (visitor) {
    TreeNode.levelOrder(this, visitor);
  };
  TreeNode.prototype.serialize = function () {
    return TreeNode.serialize(this);
  };
  return TreeNode;
})();
exports.TreeNode = TreeNode;
