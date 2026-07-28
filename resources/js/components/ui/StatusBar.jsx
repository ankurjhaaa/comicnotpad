import { Sun, Moon } from 'lucide-react';

export function StatusBar({ wordCount = 0, saveStatus = 'saved', theme, onToggleTheme }) {
    const statusLabel = {
        saved: 'Saved',
        saving: 'Saving…',
        unsaved: 'Unsaved',
    };

    const statusColor = {
        saved: 'var(--text-muted)',
        saving: 'var(--warning)',
        unsaved: 'var(--danger)',
    };

    return (
        <div
            className="status-bar flex shrink-0 items-center justify-between px-4 py-1.5 text-xs"
            style={{
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                color: 'var(--text-muted)',
            }}
        >
            <div className="flex items-center gap-4">
                <span>{wordCount.toLocaleString()} words</span>
                <span style={{ color: statusColor[saveStatus] }}>
                    {statusLabel[saveStatus]}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onToggleTheme}
                    className="rounded p-1 transition-colors"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = 'var(--hover)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
                </button>
            </div>
        </div>
    );
}
