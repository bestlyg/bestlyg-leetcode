const fs = require('fs-extra');
const { solvePath, solveTemplate, formatTemplate, resolve } = require('./utils');
const solve = require(resolve('temp/solve.js'));
run();
function run() {
  const { name, url, difficulty, tag, desc, solves } = solve;
  let str = formatTemplate(name, url, difficulty, tag, desc);
  let no = 1;
  for (const { type, time, memory, desc, code } of solves)
    str += solveTemplate(no++, type, time, memory, desc, code);
  fs.writeFileSync(solvePath(name.replace(/ /g, '')), str);
}
