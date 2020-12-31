# umi-qiankun-example
父子都是UmiJS创建的应用

### 问题

父应用路由如下设置，导致子路由打不开

```Javascript
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
    },
    {
      path: '/app1/user',
      name: 'User',
      microApp: 'App1',
      wrappers: [
        '@/wrappers/microApp',
      ],
    },
    {
      path: '/app1/list',
      name: 'List',
      microApp: 'App1',
      wrappers: [
        '@/wrappers/microApp',
      ],
    },
  ],
},
```

### 问题分析

问题的源头是 Switch 函数返回路由共享组件 props 中 match 值变了。
初衷是好的，但是不得不把上面代码中 path: '/app1/index' 更改为 path: '/app1/', 因为要 match = { url: '/app1', ... }，才使得该共享组件有意义
https://github.com/umijs/umi/blob/v3.3.3/packages/renderer-react/src/renderRoutes/Switch.tsx#L27

## 解决方案

0 路由配置改为
```Javascript
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
```

1 renderRoutes.tsx 125行 添加 microAppBase
```Javascript
const routeProps = {
  microAppBase: route.microAppBase || '', // 添加一行
  ...
};
```
https://github.com/umijs/umi/blob/v3.3.3/packages/renderer-react/src/renderRoutes/renderRoutes.tsx#L125

2 Switch.tsx 第18 改为
```Javascript
const path = child.props.microAppBase || child.props.path || child.props.from;
```
https://github.com/umijs/umi/blob/v3.3.3/packages/renderer-react/src/renderRoutes/Switch.tsx#L18

