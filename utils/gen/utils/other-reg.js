const otherStr = ["面试题", "剑指"];
const otherReg = new RegExp(`^(${otherStr.join("|")})`);
module.exports = otherReg;
