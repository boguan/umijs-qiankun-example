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

问题的源头是 Switch 函数返回路由共享组件 props 中 match 对象值变了。

例如：
```javascript
/app1/
/app1/index
/app1/user
```
三个路由，可共享同 props 为 match = { url: '/app1', ... } 的组件。在切换路由的时候，由于props不变，该组件不会被update或unmount。

但如果只有
```javascript
/app1/index
/app1/user
```
比如路由匹配到 /app1/index，props 为 match = { url: '/app1/index', ... }的组件 mount，另一个组件( props 为 match = { url: '/app1/user', ... })就会 unmount，显然不是我们期望的结果。

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
      microAppBase: '/app1'  // 新增 microAppBase 指向子应用根路由，类似类型为string的activeRule的值 
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

