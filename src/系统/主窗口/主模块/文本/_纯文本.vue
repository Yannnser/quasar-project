<script setup lang="ts">
const 参数 = defineProps(['传递']);
</script>
<template>
  {{ 参数.传递.内容 }}
</template>
