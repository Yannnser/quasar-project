import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state'

export const KeyScroll = Extension.create({
  name: 'keyScroll',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('keyScroll'),
        props: {
          handleKeyDown(view, event) {
            const { state } = view;
            const { doc, selection } = state;
            const $pos = doc.resolve(selection.from);

            const dom = findContainerWithScroll(view.dom)
            function findContainerWithScroll(node) {
              if (node.scrollHeight > node.clientHeight) {
                return node;
              } else if (node.parentNode) {
                return findContainerWithScroll(node.parentNode);
              }
            }
            // const dom = document.querySelector('.q-splitter__panel.q-splitter__after.col');
            if (!dom) {
              return false;
            }

            if (event.key === 'ArrowUp' && selection.from <= 10) {
              dom.scrollTop -= 20;
              // return true;
            } else if (event.key === 'ArrowDown' && (selection.from <= $pos.doc.content.size && selection.from >= $pos.doc.content.size - 10)) {
              dom.scrollTop += 20;
              // return true;
            }
            return false;
          },
        }
      })];
  },
});

