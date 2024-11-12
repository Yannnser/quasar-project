import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './_间隔.vue'

export const 间隔 = Node.create({
    name: '间隔',
    group: 'component',
    // inline: true,
    parseHTML() {
        return [
            {
                tag: 'div[data-type="间隔"]',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': '间隔' })]
    },
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})