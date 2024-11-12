<script setup lang="ts">
// import { useLayoutStore } from './stores/state-layout';
// import { useDocStore } from './stores/备/state-doc';
// import { useCommandCenter } from './stores/备/center-command';
// import { onMounted, onUnmounted } from 'vue';

defineOptions({
  name: 'App',
  preFetch: () => {
    // useCommandCenter().registerDefaultCommands();
    // useDocStore().initialize();
  },
});

// onMounted(() => {
//   window.ipcControl.ipcOnWindowClose(() => {
//     useDocStore().saveState();
//   });
// });

// onUnmounted(async () => {
//   window.ipcControl.ipcRemoveAllListeners();
// });
</script>

<template>
  <router-view />
</template>
