import { useState, useCallback, useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useResizable } from '@/hooks/useResizable';
import { StatusBar } from '@/components/ui/StatusBar';
import { SearchPalette } from '@/components/ui/SearchPalette';

export function AppLayout({ children, wordCount = 0, saveStatus = 'saved', explorerContent, onSearch, onSearchSelect }) {
    const { theme, toggleTheme } = useTheme();
    const { width: explorerWidth, onMouseDown: onResizeStart } = useResizable();
    const [showExplorer, setShowExplorer] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [focusMode, setFocusMode] = useState(false);

    const shortcuts = useMemo(
        () => ({
            'mod+k': () => setShowSearch(true),
            'mod+b': () => setShowExplorer((prev) => !prev),
            'mod+shift+f': () => {
                setFocusMode((prev) => !prev);

                if (!focusMode) {
                    setShowExplorer(false);
                } else {
                    setShowExplorer(true);
                }
            },
        }),
        [focusMode],
    );

    useKeyboard(shortcuts);

    const handleSearchOpen = useCallback(() => {
        setShowSearch(true);
    }, []);

    return (
        <div
            className={`flex h-screen flex-col ${focusMode ? 'focus-mode' : ''}`}
            style={{ backgroundColor: 'var(--background)' }}
        >
            {/* Main content area */}
            <div className="flex min-h-0 flex-1">
                {/* Explorer */}
                {showExplorer && !focusMode && (
                    <>
                        <div
                            className="shrink-0 overflow-hidden"
                            style={{
                                width: `${explorerWidth}px`,
                                borderRight: '1px solid var(--border)',
                            }}
                        >
                            {explorerContent}
                        </div>

                        {/* Resize handle */}
                        <div
                            className="w-0.75 shrink-0 cursor-col-resize transition-colors"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseDown={onResizeStart}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = 'var(--border)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                        />
                    </>
                )}

                {/* Editor area */}
                <div className="min-w-0 flex-1">{children}</div>
            </div>

            {/* Status Bar */}
            <StatusBar
                wordCount={wordCount}
                saveStatus={saveStatus}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            {/* Search Palette */}
            <SearchPalette
                isOpen={showSearch}
                onClose={() => setShowSearch(false)}
                onSelect={onSearchSelect}
            />
        </div>
    );
}
