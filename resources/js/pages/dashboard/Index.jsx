import { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import UserLayout from '@/layouts/UserLayout';
import projectsRoutes from '@/routes/projects';
import { AppWindow, MoreVertical, LayoutGrid, List, Trash2 } from 'lucide-react';

export default function Dashboard({ projects }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = (projectSlug, username) => {
        if (confirm('Are you sure you want to move this project to trash?')) {
            router.delete(projectsRoutes.destroy.url({ user: username, project: projectSlug }), {
                preserveScroll: true,
                onSuccess: () => setOpenDropdownId(null)
            });
        }
    };

    return (
        <UserLayout>
            <Head title="Projects - Evpad" />

            <div className="max-w-7xl mx-auto" onClick={() => { if (openDropdownId) setOpenDropdownId(null); }}>
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>My Projects</h1>
                    
                    <div className="flex items-center gap-2">
                        {/* View Toggles (Placeholder for future functionality) */}
                        <div className="flex items-center p-1 rounded-lg border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                            <button className="p-1.5 rounded bg-black/5 dark:bg-white/5" style={{ color: 'var(--text)' }}>
                                <LayoutGrid size={18} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ color: 'var(--text-muted)' }}>
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div>
                        <div className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>Recent Projects</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
                            {projects.map((project) => {
                                const d = new Date(project.updated_at);
                                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                const formattedDate = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
                                const isDropdownOpen = openDropdownId === project.id;
                                const projectUsername = project.user?.username || 'user';

                                return (
                                <div key={project.id} className="relative">
                                    <Link 
                                        href={projectsRoutes.show.url({ user: projectUsername, project: project.slug })} 
                                        className="group flex flex-col rounded-xl p-4 transition-all hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10"
                                        style={{ backgroundColor: 'var(--background)' }}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)', color: 'var(--primary)' }}>
                                                <AppWindow size={20} />
                                            </div>
                                            <button 
                                                className={`p-1.5 rounded-full transition-opacity hover:bg-black/5 dark:hover:bg-white/5 relative z-10 ${isDropdownOpen ? 'opacity-100 bg-black/5 dark:bg-white/5' : 'md:opacity-0 md:group-hover:opacity-100'}`}
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    e.stopPropagation();
                                                    setOpenDropdownId(isDropdownOpen ? null : project.id); 
                                                }}
                                            >
                                                <MoreVertical size={16} style={{ color: 'var(--text-muted)' }} />
                                            </button>
                                        </div>
                                        <div className="font-medium truncate mb-1" style={{ color: 'var(--text)' }}>{project.name}</div>
                                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                            {formattedDate}
                                        </div>
                                    </Link>
                                    
                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div 
                                            ref={dropdownRef}
                                            className="absolute right-4 top-12 w-48 rounded-xl border shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100" 
                                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button 
                                                onClick={() => handleDelete(project.slug, projectUsername)}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-red-500/10 text-red-600 dark:text-red-400"
                                            >
                                                <Trash2 size={16} />
                                                Move to Trash
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )})}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
                            <AppWindow size={32} />
                        </div>
                        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text)' }}>No projects yet</h3>
                        <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                            Create your first project to start organizing your stories and documents. Use the New button in the sidebar.
                        </p>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
