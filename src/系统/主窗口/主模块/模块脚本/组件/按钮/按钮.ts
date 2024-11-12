import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './_按钮.vue'

const 默认数据 = {
    名称: '按钮',
    类型: 'component',
    优先级: 100, //加载顺序,内外顺序
}
export const 按钮 = Node.create({
    name: 默认数据.名称,
    group: 'component',
    // inline: true,
    addAttributes() {
        return {

        }
    },
    // parseHTML() {
    //     return [
    //         {
    //             tag: 'div[data-type="按钮"]',
    //         },
    //     ]
    // },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': '按钮' })]
    },
    addNodeView() {
        return VueNodeViewRenderer(Component)
    },
})