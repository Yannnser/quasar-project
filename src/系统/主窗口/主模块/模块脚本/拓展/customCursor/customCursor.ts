import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export const CustomCursor = Extension.create({
    name: 'customCursor',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('customCursor'),
                state: {
                    init() {
                        return DecorationSet.empty;
                    },
                    apply(tr, set) {
                        const { selection } = tr;
                        if (selection.empty) {
                            const decoration = Decoration.widget(
                                selection.from,
                                () => {
                                    const div = document.createElement('div');
                                    div.id = 'custom-cursor'
                                    return div;
                                },
                                { ignoreSelection: true }
                            );
                            return DecorationSet.create(tr.doc, [decoration]);
                        }
                        return set.map(tr.mapping, tr.doc);
                    },
                },
                props: {
                    decorations(state) {
                        return this.getState(state) as DecorationSet;
                    },
                },
            }),
        ];
    },
});