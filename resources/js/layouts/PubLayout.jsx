import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Link, usePage } from '@inertiajs/react';
import { home, login, register, dashboard, terms, privacy } from '@/routes';

export default function PubLayout({ children }) {
    const { theme, toggleTheme, mounted } = useTheme();
    const { auth } = usePage().props;
    const [showApps, setShowApps] = useState(false);
    const appsRef = useRef(null);

    // Close apps dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (appsRef.current && !appsRef.current.contains(event.target)) {
                setShowApps(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div 
            className="min-h-screen transition-theme flex flex-col w-full" 
            style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}
        >
            {/* Navigation */}
            <nav 
                className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 mx-auto border-b transition-colors"
                style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--background) 90%, transparent)', 
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderColor: 'var(--border)'
                }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl sm:text-2xl font-medium tracking-tight flex items-center gap-2 group">
                            <div className="w-7 h-7 rounded flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="m19 12-7 7"/></svg>
                            </div>
                            <span style={{ color: 'var(--text)' }}>Evpad</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5 text-sm relative">
                        {/* Google style apps launcher */}
                        <div className="relative" ref={appsRef}>
                            <button 
                                onClick={() => setShowApps(!showApps)} 
                                className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center w-9 h-9" 
                                style={{ color: 'var(--text-muted)' }} 
                                aria-label="Echovel Apps"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </button>

                            {/* Apps Dropdown */}
                            {showApps && (
                                <div className="absolute right-0 mt-2 w-64 rounded-xl border shadow-xl p-4 z-50 origin-top-right transition-all" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <div className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: 'var(--text-muted)' }}>Echovel Ecosystem</div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors gap-1">
                                            <div className="w-10 h-10 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                            </div>
                                            <span className="text-xs font-medium mt-1">Auth</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors gap-1">
                                            <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="m19 12-7 7"/></svg>
                                            </div>
                                            <span className="text-xs font-medium mt-1">Evpad</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors gap-1">
                                            <div className="w-10 h-10 rounded bg-green-500/10 text-green-500 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                            </div>
                                            <span className="text-xs font-medium mt-1">More</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: 'var(--border)' }}>
                                        <a href="#" className="text-xs font-medium hover:underline" style={{ color: 'var(--text)' }}>More from Echovel</a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={toggleTheme} className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center w-9 h-9" style={{ color: 'var(--text-muted)' }} aria-label="Toggle Theme">
                            {mounted && (theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                            ))}
                        </button>

                        {auth.user ? (
                            <Link href={dashboard.url({ user: auth.user.username })} className="px-5 py-2 rounded font-medium transition-colors border hidden sm:block" style={{ backgroundColor: 'var(--text)', color: 'var(--background)', borderColor: 'var(--text)' }}>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login.url()} className="hidden sm:inline-block font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 px-4 py-2 rounded" style={{ color: 'var(--text)' }}>
                                    Sign in
                                </Link>
                                <Link href={register.url()} className="px-5 py-2 rounded font-medium transition-colors border" style={{ backgroundColor: 'var(--text)', color: 'var(--background)', borderColor: 'var(--text)' }}>
                                    Get started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="flex-1">
                {children}
            </div>

            {/* Footer */}
            <footer className="w-full px-6 py-12 mt-12 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="m19 12-7 7"/></svg>
                        </div>
                        <span className="font-semibold tracking-tight text-sm">Evpad</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        An <span className="font-medium" style={{ color: 'var(--text)' }}>Echovel</span> product.
                    </div>
                    <div className="flex gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <Link href={terms.url()} className="hover:underline">Terms</Link>
                        <Link href={privacy.url()} className="hover:underline">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
