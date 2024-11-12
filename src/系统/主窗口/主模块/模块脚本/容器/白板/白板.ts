import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './_白板.vue'

export const 白板 = Node.create({
    name: '白板',
    group: 'container',
    content: 'container* component*',
    // parseHTML() {
    //     return [
    //         {
    //             tag: 'div[data-type="白板"]',
    //         },
    //     ]
    // },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': '白板' })]
    },
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})

