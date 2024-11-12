<script setup lang="ts">
import { ref } from 'vue';

import ActionBar from './主窗口/主模块/_菜单栏.vue';
import IconGroup from './主窗口/主模块/_图标管理.vue';
import ExtendCursor from './主窗口/主模块/_拓展光标.vue';
// import { 图标映射 } from 'src/stores/图标映射';
// const 图标 = 图标映射();

const leftopen = ref(false);
const rightopen = ref(false);

const ifIconGroup = ref(true);

// import { useTextSelection } from '@vueuse/core';
// const state = useTextSelection();

// window.shortcutsControl.绑定快捷键('ctrl+k', () => {
//   alert('ctrl+k!!!');
// });

// const input = ref('E:/创作卡片/素材/星空.jpg');
// const bgStyle = computed(() => {
//   return {
//     backgroundImage: `url(local://${input.value
//       .replaceAll('\\', '/')
//       .replaceAll('"', '')})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//   };
// });
</script>

<template>
  <ExtendCursor />

  <q-layout view="hHh LpR fFf">
    <q-header>
      <ActionBar>
        <q-space />
        <q-btn
          flat
          size="10px"
          icon="ri-settings-2-line"
          @click="ifIconGroup = !ifIconGroup"
        >
        </q-btn>
        <q-space />
      </ActionBar>
    </q-header>
    <q-drawer side="left" v-model="leftopen"> </q-drawer>
    <q-drawer side="right" v-model="rightopen">123</q-drawer>
    <q-page-container style="height: 100vh">
      <IconGroup class="图标" v-if="ifIconGroup" />
    </q-page-container>
    <q-footer>
      <q-bar dense>
        <q-space />
        <q-btn
          flat
          size="11px"
          icon="ri-settings-2-line"
          @click="ifIconGroup = !ifIconGroup"
        >
          <span style="font-size: 12px; padding-left: 2px; letter-spacing: 1px"
            >玉聚灵创</span
          >
        </q-btn>
        <q-space />
      </q-bar>
    </q-footer>
  </q-layout>
</template>

<style lang="sass">
.q-bar--dark,.q-bar,.图标,.q-header,.q-footer
  background: $dark-page
</style>
