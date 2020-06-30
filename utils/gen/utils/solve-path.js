const resolve = require("./resolve");
const { otherReg } = require("./other-reg");
function solvePath(name) {
  name = name.replace(" ", "");
  const num = ~~(parseInt(name) / 200);
  const path = otherReg.test(name)
    ? "other"
    : `${num === 0 ? "" : num * 20}1-${(num + 1) * 20}0`;
  return resolve(`./src/${path}/${name}.md`);
}
module.exports = solvePath;
