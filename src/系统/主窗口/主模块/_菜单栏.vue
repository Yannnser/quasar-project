<script setup lang="ts">
defineOptions({
  name: 'ActionBar',
});
</script>
<template>
  <q-bar class="q-electron-drag">
    <slot></slot>
  </q-bar>
</template>
