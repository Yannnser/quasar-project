<template>
  <node-view-wrapper>
    <q-bar
      style="line-height: 1"
      :dense="node.attrs.紧凑"
      :class="node.attrs.窗口模式 ? 'q-electron-drag 菜单栏' : ''"
      ><node-view-content></node-view-content
    ></q-bar>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3';

// const props = defineProps({
//   ...nodeViewProps,
// });

// props.node.content.forEach((item) => {
//   console.log(item);
// });
</script>
