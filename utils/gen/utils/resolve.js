const path = require('path');
module.exports = (p = '') => path.resolve(path.resolve(__dirname, '../../../'), p);
