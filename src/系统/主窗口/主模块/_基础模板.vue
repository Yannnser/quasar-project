<script setup lang="ts">
import { watch } from 'vue';

import { useEditor, EditorContent } from '@tiptap/vue-3';
// import Document from '@tiptap/extension-document';
import 根节点 from './模块脚本/容器/根节点';
import 横栏 from './模块脚本/容器/横栏';
import 白板 from './模块脚本/容器/白板';
import 文本 from './模块脚本/组件/文本';
import 间隔 from './模块脚本/组件/间隔';
import 按钮 from './模块脚本/组件/按钮';

// import UniqueID from '@tiptap-pro/extension-unique-id';
// import DragHandle from '@tiptap-pro/extension-drag-handle';
// import Dropcursor from '@tiptap/extension-dropcursor';

const jsonModel = defineModel('json', { default: {} });
// const htmlModel = defineModel('html', { default: '' });
// const textModel = defineModel('text', { default: '' });

// interface 默认设置 {
//   内容: string;
//   拓展: [];
//   可编辑: boolean;
//   自动聚焦: boolean | number | 'all' | 'end' | 'start' | null;
// }

// const 默认设置: 默认设置 = {
//   内容: '',
//   拓展: [],
//   可编辑: true,
//   自动聚焦: true,
// };

const editor = useEditor({
  content: jsonModel.value,
  extensions: [
    根节点,
    文本,
    按钮,
    横栏,
    间隔,
    白板,
    // UniqueID.configure({
    //   types: ['按钮'],
    // }),
    // Dropcursor.configure({
    //   color: '#e2e8f0',
    //   width: 4,
    // }),
    // DragHandle.configure({
    //   render() {
    //     const element = document.createElement('div');

    //     element.classList.add('custom-drag-handle');

    //     return element;
    //   },
    // }),
  ],
  injectCSS: false,
  editable: false,
  onUpdate: ({ editor }) => {
    jsonModel.value = editor.getJSON();
    // htmlModel.value = editor.getHTML();
    // textModel.value = editor.getText();
    console.log(jsonModel.value);
  },

  // onTransaction: ({ editor }) => {
  //   const 应用 = {
  //     获取JSON: () => {
  //       return editor.getJSON();
  //     },
  //     获取HTML: () => {
  //       return editor.getHTML();
  //     },
  //     获取文本: () => {
  //       return editor.getText();
  //     },
  //   };
  //   Object.assign(window, { 应用 });
  // },
});

watch(jsonModel, (value) => {
  const isSame =
    JSON.stringify(editor.value.getJSON()) === JSON.stringify(value);
  // const isSame = editor.value.getHTML() === value;
  if (isSame) {
    return;
  }
  editor.value.commands.setContent(value, false);
  // htmlModel.value = editor.value.getHTML();
  // textModel.value = editor.value.getText();
});
// onBeforeUnmount({
//   editor: () => {
//     editor.value.destroy();
//   },
// });

defineOptions({
  name: 'BaseTemplate',
});
</script>

<template>
  <editor-content class="no-border" :editor="editor" />
</template>

<style lang="scss">
.no-border > div {
  border: none;
  outline: none;
}

div[data-node-view-wrapper],
div[data-node-view-content] {
  display: contents;
}
</style>
