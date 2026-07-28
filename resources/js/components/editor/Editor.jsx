import { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import { Toolbar } from './Toolbar';

export function Editor({ node, searchQuery = '', onContentChange, onWordCountChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Placeholder.configure({
                placeholder: 'Start writing…',
            }),
            CharacterCount,
            Highlight,
        ],
        content: node?.content || '',
        editorProps: {
            attributes: {
                class: 'tiptap-editor',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onContentChange(html);

            // Word count
            const text = editor.state.doc.textContent;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            onWordCountChange(words);
        },  
    });

    // Update content when node changes
    useEffect(() => {
        if (editor && node) {
            const currentContent = editor.getHTML();

            if (currentContent !== node.content) {
                editor.commands.setContent(node.content || '', false);

                // Recalculate word count
                const text = editor.state.doc.textContent;
                const words = text.trim() ? text.trim().split(/\s+/).length : 0;
                onWordCountChange(words);
            }

            // Handle search highlighting
            if (searchQuery) {
                setTimeout(() => {
                    let pos = null;
                    editor.state.doc.descendants((node, p) => {
                        if (pos !== null) return false;
                        if (node.isText) {
                            const idx = node.text.toLowerCase().indexOf(searchQuery.toLowerCase());
                            if (idx !== -1) {
                                pos = p + idx;
                                return false; // Stop iterating
                            }
                        }
                    });

                    if (pos !== null) {
                        editor.commands.setTextSelection({ from: pos, to: pos + searchQuery.length });
                        editor.commands.focus();
                        
                        try {
                            const domInfo = editor.view.domAtPos(pos);
                            let domNode = domInfo.node;
                            if (domNode.nodeType === Node.TEXT_NODE) {
                                domNode = domNode.parentElement;
                            }
                            if (domNode && domNode.scrollIntoView) {
                                domNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        } catch (e) {
                            editor.view.dom.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                }, 50);
            }
        }
    }, [node?.id, searchQuery, editor]);

    if (!node) {
        return (
            <div
                className="flex h-full items-center justify-center"
                style={{ color: 'var(--text-muted)' }}
            >
                <div className="text-center">
                    <p className="mb-1 text-sm">Select a file to start writing</p>
                    <p className="text-xs">or create a new page from the explorer</p>
                </div>
            </div>
        );
    }

    return (
        <div className="editor-container relative h-full overflow-y-auto" style={{ backgroundColor: 'var(--editor-bg)' }}>
            <Toolbar editor={editor} />
            <div className="mx-auto max-w-3xl px-8 py-4 lg:px-16">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
