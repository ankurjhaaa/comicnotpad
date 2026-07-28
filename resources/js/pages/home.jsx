import { useState, useCallback, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Explorer } from '@/components/explorer/Explorer';
import { Editor } from '@/components/editor/Editor';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useAutosave } from '@/hooks/useAutosave';

export default function Home({ tree, activeNode: initialActiveNode }) {
    const [activeNode, setActiveNode] = useState(initialActiveNode || null);
    const [content, setContent] = useState(initialActiveNode?.content || '');
    const [wordCount, setWordCount] = useState(0);

    const { saveStatus, saveNow } = useAutosave(activeNode?.id, content);

    const handleSelectNode = useCallback(
        (node) => {
            // Save current content first
            saveNow();

            // Fetch full node data via JSON
            fetch(`/nodes/${node.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setActiveNode(data);
                    setContent(data.content || '');
                })
                .catch((err) => {
                    console.error('Failed to load node:', err);
                });
        },
        [saveNow],
    );

    const handleSearchSelect = useCallback(
        (result) => {
            handleSelectNode(result);
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
            />
        ),
        [tree, activeNode?.id, handleSelectNode],
    );

    return (
        <>
            <Head title={activeNode ? activeNode.name : 'WriterOS'} />
            <AppLayout
                wordCount={wordCount}
                saveStatus={saveStatus}
                explorerContent={explorerContent}
                onSearchSelect={handleSearchSelect}
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
                            onContentChange={handleContentChange}
                            onWordCountChange={handleWordCountChange}
                        />
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
