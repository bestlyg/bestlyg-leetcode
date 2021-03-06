import path from 'path';
export const resolve = (p = '') => path.resolve(__dirname, '../../', p);
export const rootPath = resolve();
export const tempPath = resolve('./temp');
export const srcPath = resolve('./src');
