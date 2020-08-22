import path from 'path';
export const resolve = (p = '') => path.resolve(__dirname, '../../', p);
export const tempPath = resolve('./temp');
