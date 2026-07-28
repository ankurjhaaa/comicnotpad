import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Link, usePage, useForm } from '@inertiajs/react';
import { LogOut, Search, Plus, Folder, Clock, Trash2, Settings, Menu, Grip, X } from 'lucide-react';
import { logout, dashboard } from '@/routes';
import { store as projectsStore } from '@/actions/App/Http/Controllers/ProjectController';

export default function UserLayout({ children }) {
    const { theme, toggleTheme, mounted } = useTheme();
    const { auth } = usePage().props;
    
    // UI States
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showApps, setShowApps] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    // Refs for outside click
    const appsRef = useRef(null);
    const profileRef = useRef(null);

    // Create Project Form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const submitCreate = (e) => {
        e.preventDefault();
        post(projectsStore.url(), {
            onSuccess: () => {
                reset();
                setIsCreateModalOpen(false);
            },
        });
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (appsRef.current && !appsRef.current.contains(event.target)) setShowApps(false);
            if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get user initials
    const userInitials = auth?.user?.name 
        ? auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        : 'U';

    return (
        <div 
            className="h-screen w-full flex flex-col overflow-hidden transition-theme" 
            style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}
        >
            {/* Top App Bar */}
            <header className="h-16 flex items-center justify-between px-3 sm:px-6 shrink-0 border-b z-20" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                {/* Left: Logo & Menu */}
                <div className="flex items-center gap-2 sm:gap-4 w-auto md:w-60 shrink-0">
                    <button 
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 md:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu size={20} style={{ color: 'var(--text-muted)' }} />
                    </button>
                    <Link href={dashboard.url({ user: auth.user.username })} className="text-xl font-medium tracking-tight flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded flex items-center justify-center transition-transform group-hover:scale-105" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="m19 12-7 7"/></svg>
                        </div>
                        <span className="hidden sm:inline-block">Evpad</span>
                    </Link>
                </div>

                {/* Center: Global Search */}
                <div className="flex-1 max-w-2xl px-4 hidden md:block">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search size={18} style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full rounded-full outline-none pl-11 pr-4 py-2.5 text-sm transition-colors border"
                            style={{ 
                                backgroundColor: 'var(--surface)', 
                                borderColor: 'var(--border)',
                                color: 'var(--text)' 
                            }}
                            onFocus={(e) => {
                                e.target.style.backgroundColor = 'var(--background)';
                                e.target.style.borderColor = 'var(--primary)';
                            }}
                            onBlur={(e) => {
                                e.target.style.backgroundColor = 'var(--surface)';
                                e.target.style.borderColor = 'var(--border)';
                            }}
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 sm:gap-2 justify-end">
                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center w-10 h-10" style={{ color: 'var(--text-muted)' }} aria-label="Toggle Theme">
                        {mounted && (theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                        ))}
                    </button>

                    {/* Apps Launcher */}
                    <div className="relative" ref={appsRef}>
                        <button 
                            onClick={() => setShowApps(!showApps)} 
                            className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center w-10 h-10" 
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <Grip size={20} />
                        </button>
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
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => setShowProfile(!showProfile)} 
                            className="w-9 h-9 ml-1 sm:ml-2 rounded-full flex items-center justify-center text-sm font-semibold transition-transform hover:scale-105 border-2 border-transparent hover:border-black/10 dark:hover:border-white/10"
                            style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
                        >
                            {userInitials}
                        </button>
                        
                        {showProfile && (
                            <div className="absolute right-0 mt-2 w-72 rounded-xl border shadow-xl p-2 z-50 origin-top-right transition-all" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="p-4 flex flex-col items-center text-center border-b mb-2" style={{ borderColor: 'var(--border)' }}>
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-3" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
                                        {userInitials}
                                    </div>
                                    <div className="font-semibold" style={{ color: 'var(--text)' }}>{auth.user.name}</div>
                                    <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>@{auth.user.username}</div>
                                </div>
                                
                                <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ color: 'var(--text)' }}>
                                    <Settings size={18} style={{ color: 'var(--text-muted)' }} />
                                    Account Settings
                                </Link>
                                <Link href={logout.url()} method="post" as="button" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400" style={{ color: 'var(--text)' }}>
                                    <LogOut size={18} />
                                    Sign out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex-1 flex overflow-hidden relative">
                
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden" 
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Left Sidebar */}
                <aside 
                    className={`fixed md:static inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 py-4 px-3 ${sidebarOpen ? 'translate-x-0 border-r md:border-transparent' : '-translate-x-full'}`}
                    style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                >
                    {/* New Button */}
                    <button 
                        onClick={() => {
                            setIsCreateModalOpen(true);
                            setSidebarOpen(false);
                        }}
                        className="flex items-center gap-3 px-5 py-4 mb-6 rounded-2xl shadow-sm hover:shadow-md transition-all font-medium text-sm group border"
                        style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
                    >
                        <div className="flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                            <Plus size={24} style={{ color: 'var(--primary)' }} />
                        </div>
                        New Project
                    </button>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        <Link href={dashboard.url({ user: auth.user.username })} className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)', color: 'var(--primary)' }}>
                            <Folder size={18} />
                            My Projects
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ color: 'var(--text)' }}>
                            <Clock size={18} style={{ color: 'var(--text-muted)' }} />
                            Recent
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ color: 'var(--text)' }}>
                            <Trash2 size={18} style={{ color: 'var(--text-muted)' }} />
                            Trash
                        </Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" style={{ backgroundColor: 'var(--surface)' }}>
                    {children}
                </main>
            </div>

            {/* Create Project Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}></div>
                    <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>Create Project</h2>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <X size={20} style={{ color: 'var(--text-muted)' }} />
                            </button>
                        </div>
                        
                        <form onSubmit={submitCreate}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg px-4 py-3 outline-none transition-all border-2"
                                    style={{ 
                                        backgroundColor: 'var(--background)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text)'
                                    }}
                                    placeholder="Untitled Project"
                                    autoFocus
                                    required
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                />
                                {errors.name && (
                                    <p className="mt-2 text-xs" style={{ color: 'var(--danger)' }}>{errors.name}</p>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                    style={{ color: 'var(--text)' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || !data.name.trim()}
                                    className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                    style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}
                                >
                                    {processing ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
