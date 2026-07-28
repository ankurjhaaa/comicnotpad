import { useEffect, useRef, useState } from 'react';

export function ContextMenu({ items, position, onClose }) {
    const ref = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        }

        function handleEscape(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!position) {
        return null;
    }

    return (
        <div
            ref={ref}
            className="fixed z-50 min-w-[160px] rounded py-1 text-sm shadow-lg"
            style={{
                top: position.y,
                left: position.x,
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
            }}
        >
            {items.map((item, i) => {
                if (item.separator) {
                    return (
                        <div
                            key={`sep-${i}`}
                            className="my-1"
                            style={{ borderTop: '1px solid var(--border)' }}
                        />
                    );
                }

                return (
                    <button
                        key={item.label}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left transition-colors"
                        style={{ color: item.danger ? 'var(--danger)' : 'inherit' }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--hover)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                        onClick={() => {
                            item.onClick();
                            onClose();
                        }}
                    >
                        {item.icon && <span className="w-4 opacity-60">{item.icon}</span>}
                        <span>{item.label}</span>
                        {item.shortcut && (
                            <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
                                {item.shortcut}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
