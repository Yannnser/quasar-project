<script setup lang="ts">
import { ref } from 'vue';
import { copyToClipboard } from 'quasar';
import { storeToRefs } from 'pinia';
import { 图标映射 } from 'src/stores/图标映射';

import YText from './文本/_文本.vue';

const 图标操作 = 图标映射();
const { 原始图标列表 } = storeToRefs(图标操作);

// const 分隔 = ref(80);
const 页面 = ref('图标');
const 内页面 = ref('收藏');

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

defineOptions({
  name: 'IconGroup',
});
</script>
<template>
  <q-layout view="hHh LpR fFf" container>
    <q-header reveal>
      <q-bar>
        <q-btn flat icon="ri-layout-left-2-line" @click="toggleLeftDrawer" />
        <q-space />
        <q-tabs dense inline-label v-model="内页面">
          <q-tab
            style="user-select: none"
            dense
            name="全部"
            label="全部"
            icon="ri-bubble-chart-line"
          />
          <q-tab
            style="user-select: none"
            dense
            name="收藏"
            label="收藏"
            icon="ri-bookmark-3-line"
          />
        </q-tabs>
        <q-space />
        <q-btn flat icon="ri-layout-right-2-line" @click="toggleRightDrawer" />
      </q-bar>
      <!-- <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar> -->
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" :width="75" side="left">
      <q-tabs dense vertical v-model="页面">
        <q-space />
        <q-tab name="图标" label="图标" icon="ri-instance-line" />
        <q-tab name="风格" label="风格" />
        <q-space />
      </q-tabs>
    </q-drawer>

    <q-drawer
      show-if-above
      style="user-select: text"
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
    </q-drawer>

    <q-page-container>
      <!-- <q-splitter v-model="分隔" unit="px" style="height: calc(100vh - 32px)"> -->
      <!-- <template v-slot:after> -->
      <q-tab-panels v-model="页面">
        <q-tab-panel name="图标">
          <q-tab-panels v-model="内页面">
            <q-tab-panel name="收藏">
              <!-- <div style="display: contents">
                <q-btn
                  v-for="图标 in 收藏列表"
                  :key="图标"
                  :icon="图标"
                  @click="copyToClipboard(获取中文的(图标))"
                  @click.right="图标操作.切换收藏(图标)"
                  :text-color="图标操作.收藏列表存在(图标) ? 'primary' : null"
                >
                </q-btn>
              </div> -->
            </q-tab-panel>

            <q-tab-panel name="全部">
              <div style="display: contents">
                <!-- 原始图标列表
                <q-btn
                  :id="英文图标"
                  v-for="(中文图标, 英文图标) in 原始映射"
                  :key="中文图标"
                  :icon="中文图标"
                  @click="copyToClipboard(获取中文的(中文图标))"
                  @dblclick="copyToClipboard(获取图标(英文图标))"
                  @click.right="图标操作.切换收藏(中文图标)"
                  :text-color="
                    图标操作.收藏列表存在(中文图标) ? 'primary' : null
                  "

                  @dblclick="图标操作.切换收藏(图标)"
                  :text-color="图标操作.收藏列表存在(图标) ? 'primary' : null"
                >
                </q-btn> -->
                <q-btn
                  :id="图标"
                  v-for="图标 in 原始图标列表"
                  :key="图标"
                  :icon="图标"
                  @click="copyToClipboard(图标)"
                >
                </q-btn>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>

        <q-tab-panel name="风格">
          <YText />
        </q-tab-panel>
      </q-tab-panels>
      <!-- </template> -->

      <!-- <template v-slot:before> </template> -->
      <!-- </q-splitter> -->
    </q-page-container>

    <q-footer align="center">
      123s
      <q-tabs dense v-model="页面">
        <q-space />
        <q-tab name="图标" label="图标" icon="ri-instance-line" />
        <q-tab name="风格" label="风格" />
        <q-space />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style lang="sass">
.q-color-picker__header-content.q-color-picker__header-content--dark
  background-color: var(--q-dark-page) !important
</style>
