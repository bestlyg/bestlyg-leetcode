const { getNowYear, getNowMonth, getNowDay } = require("./time");
const solveTemplate = require("./solve-template");
const formatTemplate = require("./format-template");
const resolve = require("./resolve");
const solvePath = require("./solve-path");
const { otherReg, otherStr } = require("./other-reg");
const { specMark, specMarkStr } = require("./spec-mark");
module.exports = {
  getNowYear,
  getNowMonth,
  getNowDay,
  solveTemplate,
  formatTemplate,
  resolve,
  solvePath,
  otherReg,
  otherStr,
  specMark,
  specMarkStr
};
