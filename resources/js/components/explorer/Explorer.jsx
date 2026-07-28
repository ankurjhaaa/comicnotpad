import { useState, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { FilePlus, FolderPlus, Search } from 'lucide-react';
import { TreeNode } from './TreeNode';
import { ContextMenu } from '../ui/ContextMenu';
import { Modal } from '../ui/Modal';

export function Explorer({ tree = [], activeNodeId, onSelect, onSearch, initialExpandedFolders, projectUrl }) {
    const [contextMenu, setContextMenu] = useState(null);
    const [createModal, setCreateModal] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Use initial state from server to completely prevent hydration flashes
    const [expandedFolders, setExpandedFolders] = useState(initialExpandedFolders || {});

    const toggleFolder = useCallback((id, isExpanded) => {
        setExpandedFolders((prev) => {
            const next = { ...prev, [id]: isExpanded };
            // Save state in cookie for SSR hydration
            document.cookie = `writeros-expanded=${encodeURIComponent(JSON.stringify(next))}; path=/; max-age=31536000; SameSite=Lax`;
            return next;
        });
    }, []);

    const handleContextMenu = useCallback((e, node) => {
        setContextMenu({
            position: { x: e.clientX, y: e.clientY },
            node,
        });
    }, []);

    function handleCreateItem(type, parentId = null) {
        setCreateModal({ type, parentId });
        setNewItemName('');
    }

    function submitCreate() {
        if (!newItemName.trim() || submitting) {
            return;
        }

        setSubmitting(true);

        router.post(`${projectUrl}/nodes`, {
            name: newItemName.trim(),
            type: createModal.type,
            parent_id: createModal.parentId || null,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setCreateModal(null);
                setNewItemName('');
            },
            onFinish: () => {
                setSubmitting(false);
            },
        });
    }

    function handleDelete(node) {
        if (!confirm(`Delete "${node.name}"?`)) {
            return;
        }

        router.delete(`${projectUrl}/nodes/${node.id}`, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    const contextMenuItems = contextMenu
        ? [
              ...(contextMenu.node.type === 'folder'
                  ? [
                        {
                            label: 'New Page',
                            icon: <FilePlus size={14} />,
                            onClick: () => handleCreateItem('page', contextMenu.node.id),
                        },
                        {
                            label: 'New Folder',
                            icon: <FolderPlus size={14} />,
                            onClick: () => handleCreateItem('folder', contextMenu.node.id),
                        },
                        { separator: true },
                    ]
                  : []),
              {
                  label: 'Delete',
                  danger: true,
                  onClick: () => handleDelete(contextMenu.node),
              },
          ]
        : [];

    return (
        <div
            className="explorer-panel flex h-full flex-col"
            style={{ backgroundColor: 'var(--explorer-bg)' }}
        >
            {/* Header */}
            <div
                className="flex shrink-0 items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid var(--border)' }}
            >
                <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Explorer
                </span>
                <div className="flex items-center gap-1">
                    <button
                        className="rounded p-1 transition-colors"
                        title="Search (⌘K)"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--hover)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                        onClick={onSearch}
                    >
                        <Search size={14} />
                    </button>
                    <button
                        className="rounded p-1 transition-colors"
                        title="New Page"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--hover)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                        onClick={() => handleCreateItem('page')}
                    >
                        <FilePlus size={14} />
                    </button>
                    <button
                        className="rounded p-1 transition-colors"
                        title="New Folder"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--hover)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                        onClick={() => handleCreateItem('folder')}
                    >
                        <FolderPlus size={14} />
                    </button>
                </div>
            </div>

            {/* Tree */}
            <div className="flex-1 overflow-y-auto py-1">
                {tree.length === 0 ? (
                    <div
                        className="px-4 py-8 text-center text-xs"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <p className="mb-2">No files yet</p>
                        <p>Create a folder or page to get started</p>
                    </div>
                ) : (
                    tree.map((node) => (
                        <TreeNode
                            key={node.id}
                            node={node}
                            activeNodeId={activeNodeId}
                            onSelect={onSelect}
                            onContextMenu={handleContextMenu}
                            expandedFolders={expandedFolders}
                            onToggleFolder={toggleFolder}
                        />
                    ))
                )}
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <ContextMenu
                    items={contextMenuItems}
                    position={contextMenu.position}
                    onClose={() => setContextMenu(null)}
                />
            )}

            {/* Create Modal */}
            <Modal
                isOpen={!!createModal}
                onClose={() => setCreateModal(null)}
                title={createModal?.type === 'folder' ? 'New Folder' : 'New Page'}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitCreate();
                    }}
                >
                    <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder={createModal?.type === 'folder' ? 'Folder name' : 'Page title'}
                        className="mb-3 w-full rounded px-3 py-2 text-sm outline-none"
                        style={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                        }}
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setCreateModal(null)}
                            className="rounded px-3 py-1.5 text-sm transition-colors"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = 'var(--hover)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || !newItemName.trim()}
                            className="rounded px-3 py-1.5 text-sm transition-colors"
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--background)',
                                opacity: submitting || !newItemName.trim() ? 0.5 : 1,
                            }}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
