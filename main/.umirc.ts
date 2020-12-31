import { defineConfig } from 'umi';

export default defineConfig({
  base: '/',
  layout: {
    name: '微前端项目', // TODO
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg', // TODO
    layout: 'side',
  },
  locale: {},
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  routes: [
    // {
    //   name: '首页',
    //   path: '/index', 
    //   icon: 'smile', // icon name 为 组件名小写后去掉 outlined 或者 filled 或者 twotone，所得值。举例：<UserOutlined /> 的 icon name 即： user。
    //   component: '@/pages/index',
    // },
    // {
    //   name: '用户',
    //   path: '/user', 
    //   icon: 'smile', // icon name 为 组件名小写后去掉 outlined 或者 filled 或者 twotone，所得值。举例：<UserOutlined /> 的 icon name 即： user。
    //   component: '@/pages/user',
    // },
    {
      name: 'App1',
      path: '/app1',
      icon: 'smile',
      routes: [
        {
          path: '/app1/index',
          name: 'index',
          microApp: 'App1',
          wrappers: [
            '@/wrappers/microApp',
          ],
          microAppBase: '/app1'
        },
        {
          path: '/app1/user',
          name: 'User',
          microApp: 'App1',
          wrappers: [
            '@/wrappers/microApp',
          ],
          microAppBase: '/app1'
        },
        {
          path: '/app1/list',
          name: 'List',
          microApp: 'App1',
          wrappers: [
            '@/wrappers/microApp',
          ],
          microAppBase: '/app1'
        },
      ],
    },
    {
      name: 'App2',
      path: '/app2',
      icon: 'smile',
      routes: [
        {
          path: '/app2/',
          name: 'index',
          microApp: 'App2',
          wrappers: [
            '@/wrappers/microApp',
          ],
        },
        {
          path: '/app2/user',
          name: 'User',
          microApp: 'App2',
          wrappers: [
            '@/wrappers/microApp',
          ],
        },
      ],
    },
  ],
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'App1', // 唯一 id
          entry: '//localhost:8001', // html entry
          container: '#subapp-container',
          activeRule: '/app1',
          props: { // 可以向子应用传参数
            //   age: 1,
            routerBase: '/app1', // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
            autoSetLoading: true,
          },
        },
        {
          name: 'App2',
          entry: '//localhost:8002',
          container: '#subapp-container',
          activeRule: '/app2',
          props: { // 可以向子应用传参数
            autoSetLoading: true,
          },
        },
      ],
    },
  },

  lessLoader: {
    modifyVars: {
      '@ant-prefix': 'main',
    },
    javascriptEnabled: true,
  },

  antd: {
    config:{
      prefixCls:'main'
    }
  },
});