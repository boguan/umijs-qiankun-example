import { defineConfig } from 'umi';
const { name } = require('./package.json');


export default defineConfig({
  base: `/${name}`, //  basename={window.__POWERED_BY_QIANKUN__ ? '/app2' : '/'}
  mountElementId: 'root',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/user', component: '@/pages/user' },
  ],
  qiankun: {
    slave: {}
  }
});
