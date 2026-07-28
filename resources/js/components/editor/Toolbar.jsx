import { useRef, useEffect, useState } from 'react';
import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Quote,
    Code,
    Link as LinkIcon,
} from 'lucide-react';

export function Toolbar({ editor }) {
    const toolbarRef = useRef(null);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (!editor) {
            return;
        }

        function updatePosition() {
            const { from, to, empty } = editor.state.selection;

            if (empty) {
                setPosition(null);

                return;
            }

            const { view } = editor;
            const start = view.coordsAtPos(from);
            const end = view.coordsAtPos(to);

            const editorRect = view.dom.closest('.editor-container')?.getBoundingClientRect();

            if (!editorRect) {
                return;
            }

            setPosition({
                top: start.top - editorRect.top - 46,
                left: (start.left + end.left) / 2 - editorRect.left,
            });
        }

        editor.on('selectionUpdate', updatePosition);
        editor.on('blur', () => setPosition(null));

        return () => {
            editor.off('selectionUpdate', updatePosition);
        };
    }, [editor]);

    if (!position || !editor) {
        return null;
    }

    const buttons = [
        {
            icon: <Bold size={14} />,
            action: () => editor.chain().focus().toggleBold().run(),
            active: editor.isActive('bold'),
            title: 'Bold',
        },
        {
            icon: <Italic size={14} />,
            action: () => editor.chain().focus().toggleItalic().run(),
            active: editor.isActive('italic'),
            title: 'Italic',
        },
        {
            icon: <Strikethrough size={14} />,
            action: () => editor.chain().focus().toggleStrike().run(),
            active: editor.isActive('strike'),
            title: 'Strikethrough',
        },
        { separator: true },
        {
            icon: <Heading1 size={14} />,
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: editor.isActive('heading', { level: 1 }),
            title: 'Heading 1',
        },
        {
            icon: <Heading2 size={14} />,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: editor.isActive('heading', { level: 2 }),
            title: 'Heading 2',
        },
        { separator: true },
        {
            icon: <Quote size={14} />,
            action: () => editor.chain().focus().toggleBlockquote().run(),
            active: editor.isActive('blockquote'),
            title: 'Quote',
        },
        {
            icon: <Code size={14} />,
            action: () => editor.chain().focus().toggleCode().run(),
            active: editor.isActive('code'),
            title: 'Code',
        },
    ];

    return (
        <div
            ref={toolbarRef}
            className="absolute z-40 flex items-center gap-0.5 rounded-md px-1 py-1 shadow-lg"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--toolbar-bg)',
                border: '1px solid var(--border)',
            }}
        >
            {buttons.map((btn, i) => {
                if (btn.separator) {
                    return (
                        <div
                            key={`sep-${i}`}
                            className="mx-0.5 h-4"
                            style={{ borderLeft: '1px solid var(--border)' }}
                        />
                    );
                }

                return (
                    <button
                        key={btn.title}
                        className="rounded p-1.5 transition-colors"
                        style={{
                            color: btn.active ? 'var(--background)' : 'var(--toolbar-text)',
                            backgroundColor: btn.active ? 'var(--toolbar-text)' : 'transparent',
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            btn.action();
                        }}
                        title={btn.title}
                    >
                        {btn.icon}
                    </button>
                );
            })}
        </div>
    );
}
