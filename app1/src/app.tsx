import { LifeCycles } from 'single-spa';

export const qiankun: LifeCycles = {
  // 应用加载之前
  async bootstrap(props) {
      console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
      // props.base = `/${name}`;
      // delete props.base;
      console.log('app1 mount', props);
      console.log(window.__POWERED_BY_QIANKUN__) // true
      console.log( window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) // http://localhost:8001/
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};

export function render(oldRender: any) {
  // history.push('/user'); 
  oldRender();
}