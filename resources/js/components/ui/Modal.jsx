import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, size = 'sm' }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        function handleEscape(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const widthClass = size === 'lg' ? 'max-w-lg' : size === 'md' ? 'max-w-md' : 'max-w-sm';

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={(e) => {
                if (e.target === overlayRef.current) {
                    onClose();
                }
            }}
        >
            <div
                ref={contentRef}
                className={`w-full ${widthClass} rounded-lg p-5 shadow-xl`}
                style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                }}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="rounded p-1 transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--hover)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                    >
                        <X size={14} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
