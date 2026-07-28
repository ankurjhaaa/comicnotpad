import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, FileText, Folder, ChevronRight, X } from 'lucide-react';

export function SearchPalette({ isOpen, onClose, onSelect }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searching, setSearching] = useState(false);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery('');
            setResults([]);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    const performSearch = useCallback((q) => {
        if (!q.trim()) {
            setResults([]);

            return;
        }

        setSearching(true);

        fetch(`/search?q=${encodeURIComponent(q)}`, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setResults(Array.isArray(data) ? data : []);
                setSelectedIndex(0);
            })
            .catch(() => {
                setResults([]);
            })
            .finally(() => {
                setSearching(false);
            });
    }, []);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => performSearch(query), 250);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, performSearch]);

    function handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            onSelect(results[selectedIndex], query);
            onClose();
        } else if (e.key === 'Escape') {
            onClose();
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="w-full max-w-lg overflow-hidden rounded-lg shadow-2xl"
                style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                }}
            >
                {/* Search input */}
                <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ borderBottom: '1px solid var(--border)' }}
                >
                    <Search size={16} style={{ color: 'var(--text-muted)' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search files, folders, content..."
                        className="flex-1 bg-transparent text-sm outline-none"
                        style={{ color: 'var(--text)' }}
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Results */}
                <div className="max-h-75 overflow-y-auto">
                    {searching && (
                        <div
                            className="px-4 py-3 text-sm"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Searching…
                        </div>
                    )}

                    {!searching && query && results.length === 0 && (
                        <div
                            className="px-4 py-3 text-sm"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            No results found
                        </div>
                    )}

                    {results.map((result, i) => (
                        <button
                            key={result.id}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
                            style={{
                                backgroundColor:
                                    i === selectedIndex ? 'var(--hover)' : 'transparent',
                                color: 'var(--text)',
                            }}
                            onMouseEnter={() => setSelectedIndex(i)}
                            onClick={() => {
                                onSelect(result, query);
                                onClose();
                            }}
                        >
                            {result.type === 'folder' ? (
                                <Folder size={14} style={{ color: 'var(--text-muted)' }} />
                            ) : (
                                <FileText size={14} style={{ color: 'var(--text-muted)' }} />
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="truncate">{result.name}</div>
                                {result.ancestors && result.ancestors.length > 0 && (
                                    <div
                                        className="flex items-center gap-0.5 truncate text-xs"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {result.ancestors.map((a, j) => (
                                            <span key={a.id} className="flex items-center gap-0.5">
                                                {j > 0 && <ChevronRight size={8} />}
                                                {a.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer */}
                {!query && (
                    <div
                        className="px-4 py-2 text-xs"
                        style={{
                            color: 'var(--text-muted)',
                            borderTop: '1px solid var(--border)',
                        }}
                    >
                        Type to search across all files and content
                    </div>
                )}
            </div>
        </div>
    );
}
