import { useTheme } from '@/hooks/useTheme';
import { Link, usePage } from '@inertiajs/react';

export default function PubLayout({ children }) {
    const { theme, toggleTheme } = useTheme();
    const { auth } = usePage().props;

    return (
        <div 
            className="min-h-screen transition-theme flex flex-col" 
            style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}
        >
            {/* Navigation */}
            <nav 
                className="sticky top-0 z-50 w-full px-6 py-4 mx-auto border-b"
                style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--background) 80%, transparent)', 
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderColor: 'var(--border)'
                }}
            >
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight transition-all hover:opacity-80 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="m19 12-7 7"/></svg>
                        </div>
                        WriterOS
                    </Link>
                    <div className="flex items-center gap-6 text-sm">
                        <button onClick={toggleTheme} className="text-xs uppercase tracking-wider transition-opacity hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
                            {theme === 'dark' ? 'Light' : 'Dark'}
                        </button>
                        {auth.user ? (
                            <Link href={`/${auth.user.username}`} className="px-5 py-2.5 rounded-md font-medium transition-transform hover:-translate-y-0.5 shadow-sm" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="font-medium transition-colors" style={{ color: 'var(--text-muted)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                                    Log in
                                </Link>
                                <Link href="/register" className="px-5 py-2.5 rounded-md font-medium transition-transform hover:-translate-y-0.5 shadow-sm" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
