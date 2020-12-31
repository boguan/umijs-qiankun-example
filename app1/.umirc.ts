import { defineConfig } from 'umi';
const { name } = require('./package.json');


export default defineConfig({
  base: `/${name}`, //  basename={window.__POWERED_BY_QIANKUN__ ? '/app1' : '/'}
  mountElementId: 'root',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/index', component: '@/pages/index' },
    { path: '/user', component: '@/pages/user' },
    { path: '/list', component: '@/pages/list' },
  ],
  qiankun: {
    slave: {}
  }
});
