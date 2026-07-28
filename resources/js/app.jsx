import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'WriterOS';

createInertiaApp({
    title: (title) => (title ? `${title} — ${appName}` : appName),
    progress: {
        color: '#1a1a1a',
    },
});
