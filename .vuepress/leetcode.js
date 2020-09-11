const { fs, resolve, commonSort } = require('./utils');
const leetcodePath = resolve('src');
const sidebar = {
  '/src/': [],
};
const dirs = fs.readdirSync(leetcodePath).sort(commonSort);
for (const dir of dirs) {
  const files = fs.readdirSync(`${leetcodePath}/${dir}`).sort(commonSort);
  const obj = {
    title: dir,
    collapsable: false,
    children: [],
  };
  for (const file of files) {
    obj.children.push(`${dir}/${file}`);
  }
  sidebar['/src/'].push(obj);
}
module.exports = sidebar;
