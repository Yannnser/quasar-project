import { boot } from 'quasar/wrappers'
import { IconSet } from 'quasar'
// import { 图标映射 } from 'src/stores/图标映射';

export default boot(async () => {
  const 默认图标映射 = {
    'gradient': 'ri-paint-line',
    'tune': 'ri-sound-module-line',
    'style': 'ri-color-filter-line',
    'warning': 'ri-error-warning-line'
  }
  IconSet.iconMapFn = (图标) => {
    if (默认图标映射[图标]) {
      return {
        cls: 默认图标映射[图标]
      }
    } else {
      return {
        cls: 图标
      }
    }
    // if (图标映射().原始列表存在(图标)) {
    //   return {
    //     cls: 图标
    //   }
    // }
  }
})
