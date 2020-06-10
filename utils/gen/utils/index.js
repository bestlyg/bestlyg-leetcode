const { getNowYear, getNowMonth, getNowDay } = require("./time");
const solveTemplate = require("./solve-template");
const formatTemplate = require("./format-template");
const resolve = require("./resolve");
const solvePath = require("./solve-path");
module.exports = {
  getNowYear,
  getNowMonth,
  getNowDay,
  solveTemplate,
  formatTemplate,
  resolve,
  solvePath
};
