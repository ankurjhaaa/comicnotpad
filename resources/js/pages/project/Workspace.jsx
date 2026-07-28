import { useState, useCallback, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Explorer } from '@/components/explorer/Explorer';
import { Editor } from '@/components/editor/Editor';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useAutosave } from '@/hooks/useAutosave';
import { show as nodesShow } from '@/actions/App/Http/Controllers/NodeController';

export default function Workspace({ project, tree, activeNode: initialActiveNode, initialExpandedFolders }) {
    const [activeNode, setActiveNode] = useState(initialActiveNode || null);
    const [content, setContent] = useState(initialActiveNode?.content || '');
    const [wordCount, setWordCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const { saveStatus, saveNow } = useAutosave(activeNode?.id, content, project);

    const handleSelectNode = useCallback(
        (node, query = '') => {
            // Save current content first
            saveNow();

            // Fetch full node data via JSON
            fetch(nodesShow.url({ user: project.user.username, project: project.slug, node: node.id }), {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setActiveNode(data);
                    setContent(data.content || '');
                    setSearchQuery(query);
                })
                .catch((err) => {
                    console.error('Failed to load node:', err);
                });
        },
        [saveNow],
    );

    const handleSearchSelect = useCallback(
        (result, query) => {
            handleSelectNode(result, query);
        },
        [handleSelectNode],
    );

    const handleBreadcrumbNavigate = useCallback(
        (nodeId) => {
            handleSelectNode({ id: nodeId });
        },
        [handleSelectNode],
    );

    const handleContentChange = useCallback((html) => {
        setContent(html);
        // Clear search highlight once user edits
        setSearchQuery('');
    }, []);

    const handleWordCountChange = useCallback((count) => {
        setWordCount(count);
    }, []);

    const explorerContent = useMemo(
        () => (
            <Explorer
                tree={tree || []}
                activeNodeId={activeNode?.id}
                onSelect={handleSelectNode}
                initialExpandedFolders={initialExpandedFolders}
                project={project}
            />
        ),
        [tree, activeNode?.id, handleSelectNode, initialExpandedFolders, project],
    );

    return (
        <>
            <Head title={activeNode ? activeNode.name : 'WriterOS'} />
            <AppLayout
                wordCount={wordCount}
                saveStatus={saveStatus}
                explorerContent={explorerContent}
                onSearchSelect={handleSearchSelect}
                onSearchOpen={saveNow}
            >
                <div className="flex h-full flex-col">
                    {/* Breadcrumb */}
                    {activeNode && (
                        <Breadcrumb
                            ancestors={activeNode.ancestors || []}
                            currentName={activeNode.name}
                            onNavigate={handleBreadcrumbNavigate}
                        />
                    )}

                    {/* Editor */}
                    <div className="min-h-0 flex-1">
                        <Editor
                            node={activeNode}
                            searchQuery={searchQuery}
                            onContentChange={handleContentChange}
                            onWordCountChange={handleWordCountChange}
                        />
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
