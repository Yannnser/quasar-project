import { defineAsyncComponent } from 'vue';
import AText from './主窗口/主模块/文本/_纯文本.vue';
export function 获取组件(目录: string, 组件名称: string) {

    const currentComponent = defineAsyncComponent({
        loader: () => import(`./主窗口/主模块/${目录}/${组件名称}.vue`),
        loadingComponent: AText,
        errorComponent: AText,
        delay: 200, // 延迟 200ms 后显示加载状态
        timeout: 3000, // 3000ms 后显示错误状态
        onError() {
            // console.error(
            //   `Failed to load component ${组件路径} after ${attempts} attempts`,
            //   error
            // );
            // if (attempts <= 3) {
            //   retry();
            // } else {
            //   fail();
            // }
        },
    });
    return currentComponent;
}

