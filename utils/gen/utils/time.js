function getNowYear() {
  return new Date().getFullYear();
}
function getNowMonth() {
  return new Date().getMonth() + 1;
}
function getNowDay() {
  return new Date().getDate();
}
module.exports = { getNowYear, getNowMonth, getNowDay };
