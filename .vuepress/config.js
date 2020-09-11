const { resolve } = require('./utils');
const lcSidebar = require('./leetcode');
// console.log(sidebar);
module.exports = {
  title: 'BestLyg LeetCode',
  description: 'bestlyg leetcode',
  dest: resolve('dist'),
  // @vuepress/plugin-active-header-links 页面滚动时自动激活侧边栏链接的插件
  // @vuepress/back-to-top 回到顶部的插件
  plugins: ['@vuepress/active-header-links', '@vuepress/back-to-top'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Link',
        items: [
          { text: 'github', link: 'https://github.com/bestlyg' },
          { text: 'gitee', link: 'https://gitee.com/bestlyg' },
        ],
      },
    ],
    // 添加侧边栏
    sidebar: {
      ...lcSidebar,
      '/': [''],
    },
    // sidebar: 'auto',
    sidebarDepth: 3,
    // 利用git添加最后一次更新时间
    lastUpdated: 'Last Updated',
    // 启用页面滚动效果
    smoothScroll: true,
  },
};
