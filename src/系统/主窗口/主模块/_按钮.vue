<script setup lang="ts">
import { ref, computed } from 'vue';

const 内容 = ref(new Set<string>());
fetch('dir://E:/创作卡片/鉴赏参考')
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      console.error('Error:', data.error);
    } else {
      data.forEach((filePath) => {
        内容.value.add(filePath);
      });
    }
  })
  .catch((error) => console.error('Fetch Error:', error));

const 适配_默认风格 = computed(() => {
  const 适配对象 = {};
  return 适配对象;
});

defineOptions({
  name: 'BaseButton',
});
</script>
<template>
  <q-btn v-bind="适配_默认风格"></q-btn>
  <q-img v-for="(item, index) in 内容" :key="index" :src="`local://${item}`">
    <template v-slot:error>
      <div class="absolute-full flex flex-center bg-negative text-white">
        {{ item }} 加载错误
      </div>
    </template>
  </q-img>
  {{ 内容 }}
</template>
