const resolve = require('./resolve');
const { otherReg } = require('./other-reg');
function getPath(name) {
  name = name.replace(/ /g, '');
  const num = ~~((parseInt(name) - 1) / 200);
  return otherReg.test(name) ? 'other' : `${num === 0 ? '' : num * 20}1-${(num + 1) * 20}0`;
}
function solvePath(name) {
  name = name.replace(/ /g, '');
  return resolve(`./src/${getPath(name)}/${name}.md`);
}
module.exports = { getPath, solvePath };
