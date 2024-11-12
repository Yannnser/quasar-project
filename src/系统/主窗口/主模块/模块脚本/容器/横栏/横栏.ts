import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './_横栏.vue'

export const 横栏 = Node.create({
    name: '横栏',
    group: 'container',
    content: 'component*',

    addAttributes() {
        return {
            紧凑: {
                default: false,
            },
            窗口模式: {
                default: false,
            },

        }
    },
    // parseHTML() {
    //     return [
    //         {
    //             tag: 'div[data-type="菜单栏"]',
    //         },
    //     ]
    // },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': '横栏' })]
    },
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})