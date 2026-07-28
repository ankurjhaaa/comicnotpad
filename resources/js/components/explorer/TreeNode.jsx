import { useState, useRef } from 'react';
import { ChevronRight, FileText, Folder, FolderOpen } from 'lucide-react';

export function TreeNode({ node, activeNodeId, depth = 0, onSelect, onContextMenu }) {
    const [isExpanded, setIsExpanded] = useState(depth === 0);
    const isFolder = node.type === 'folder';
    const isActive = node.id === activeNodeId;
    const hasChildren = isFolder && node.children_recursive && node.children_recursive.length > 0;

    function handleClick() {
        if (isFolder) {
            setIsExpanded((prev) => !prev);
        } else {
            onSelect(node);
        }
    }

    function handleContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu(e, node);
    }

    return (
        <div>
            <div
                className="tree-node flex items-center gap-1 rounded-sm px-2 py-0.75 text-[13px]"
                style={{
                    paddingLeft: `${depth * 16 + 8}px`,
                    backgroundColor: isActive ? 'var(--selection)' : 'transparent',
                    color: 'var(--text)',
                }}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
            >
                {/* Expand chevron (only for folders) */}
                <span className="flex w-4 shrink-0 items-center justify-center">
                    {isFolder && (
                        <ChevronRight
                            size={12}
                            style={{
                                color: 'var(--text-muted)',
                                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 150ms ease',
                            }}
                        />
                    )}
                </span>

                {/* Icon */}
                <span className="flex w-4 shrink-0 items-center justify-center">
                    {isFolder ? (
                        isExpanded ? (
                            <FolderOpen size={14} style={{ color: 'var(--text-muted)' }} />
                        ) : (
                            <Folder size={14} style={{ color: 'var(--text-muted)' }} />
                        )
                    ) : (
                        <FileText size={14} style={{ color: 'var(--text-muted)' }} />
                    )}
                </span>

                {/* Name */}
                <span className="truncate">{node.name}</span>
            </div>

            {/* Children */}
            {isFolder && isExpanded && node.children_recursive && (
                <div>
                    {node.children_recursive.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            activeNodeId={activeNodeId}
                            depth={depth + 1}
                            onSelect={onSelect}
                            onContextMenu={onContextMenu}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
