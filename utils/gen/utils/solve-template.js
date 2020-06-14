const { getNowYear, getNowMonth, getNowDay } = require("./time");
module.exports = function solveTemplate(no, type, time, memory, desc, code) {
  let str = `## 题解 ${no} - ${type}
- 编辑时间：${getNowYear()}.${getNowMonth()}.${getNowDay()}
- 执行用时：${time}ms
- 内存消耗：${memory}MB
- 编程语言：${type}
- 解法介绍：${desc}。
`;
  str += "```" + type + "\n" + code + "\n```\n";
  return str;
};
