import { useEffect, useRef, useCallback, useState } from 'react';
import { update as nodesUpdate } from '@/actions/App/Http/Controllers/NodeController';

export function useAutosave(nodeId, content, project, { delay = 1500 } = {}) {
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('saved');
    const timeoutRef = useRef(null);
    const lastSavedRef = useRef(content);

    const save = useCallback(() => {
        if (!nodeId || !project || content === lastSavedRef.current) {
            return;
        }

        setSaving(true);
        setSaveStatus('saving');

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        fetch(nodesUpdate.url({ user: project.user.username, project: project.slug, node: nodeId }), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
            },
            body: JSON.stringify({ content }),
        })
            .then((res) => {
                if (res.ok) {
                    lastSavedRef.current = content;
                    setSaveStatus('saved');
                } else {
                    setSaveStatus('unsaved');
                }
            })
            .catch(() => {
                setSaveStatus('unsaved');
            })
            .finally(() => {
                setSaving(false);
            });
    }, [nodeId, content]);

    useEffect(() => {
        if (!nodeId || content === lastSavedRef.current) {
            return;
        }

        setSaveStatus('unsaved');

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(save, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [content, nodeId, delay, save]);

    // Reset when node changes
    useEffect(() => {
        lastSavedRef.current = content;
        setSaveStatus('saved');
    }, [nodeId]);

    return { saving, saveStatus, saveNow: save };
}
