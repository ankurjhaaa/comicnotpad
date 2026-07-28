import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ ancestors = [], currentName, onNavigate }) {
    if (!currentName) {
        return null;
    }

    return (
        <div
            className="flex items-center gap-1 overflow-hidden px-4 py-2 text-xs"
            style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
        >
            {ancestors.map((ancestor) => (
                <span key={ancestor.id} className="flex shrink-0 items-center gap-1">
                    <button
                        className="transition-colors hover:underline"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={() => onNavigate(ancestor.id)}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = 'var(--text-muted)')
                        }
                    >
                        {ancestor.name}
                    </button>
                    <ChevronRight size={10} className="shrink-0 opacity-40" />
                </span>
            ))}
            <span className="truncate" style={{ color: 'var(--text)' }}>
                {currentName}
            </span>
        </div>
    );
}
