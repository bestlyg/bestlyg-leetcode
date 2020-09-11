const path = require('path');
const resolve = (p = '') => path.resolve(__dirname, '../', p);
const fs = require('fs-extra');
const commonSort = (a, b) => parseInt(a) - parseInt(b);
module.exports = { resolve, fs, commonSort };
