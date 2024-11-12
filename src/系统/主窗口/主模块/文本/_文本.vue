<template>
  <div style="user-select: text">
    <div>
      <component :is="纯文本组件" :传递="纯文本"></component>
    </div>
    <div>
      <component :is="艺术组件" :传递="艺术"></component>
    </div>
    <div>
      <component :is="艺术组件" :传递="艺术"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 获取组件 } from 'src/系统/动态导入';
import { computed } from 'vue';

// const 描述 = ref({
//   风格: '纯文本',
//   内容: '纯文本',
// });

const 纯文本 = ref({
  风格: '纯文本',
  内容: '纯文本',
});

const 艺术 = ref({
  风格: '艺术',
  内容: '艺术',
});

// const currentComponent = computed(() => {
//   const 组件 = 获取组件(
//     描述.value.风格 ? `文本/_${描述.value.风格}` : '文本/_纯文本'
//   );
//   return 组件;
// });

const 纯文本组件 = computed(() => {
  const 组件 = 获取组件('文本', '_纯文本');
  return 组件;
});

const 艺术组件 = computed(() => {
  const 组件 = 获取组件('文本', '_艺术');
  return 组件;
});

defineOptions({
  name: 'YText',
});
</script>
