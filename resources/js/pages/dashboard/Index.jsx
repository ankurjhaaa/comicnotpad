import { useForm, Head, Link } from '@inertiajs/react';
import UserLayout from '@/layouts/UserLayout';

export default function Dashboard({ projects }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/projects', {
            onSuccess: () => reset(),
        });
    };

    return (
        <UserLayout>
            <Head title="Dashboard - WriterOS" />

            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Create Project Section */}
                <div className="mb-12 p-6 rounded-lg shadow-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <h3 className="text-lg font-semibold mb-2">
                        Create New Project
                    </h3>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                        Give your new project a unique name.
                    </p>
                    <form className="flex flex-col sm:flex-row sm:items-start gap-3" onSubmit={submit}>
                        <div className="w-full sm:max-w-sm flex flex-col">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full rounded outline-none px-4 py-2.5 text-sm transition-colors"
                                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                                placeholder="My Epic Universe"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p className="mt-2 text-xs" style={{ color: 'var(--danger)' }}>
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing || !data.name.trim()}
                            className="rounded px-6 py-2.5 text-sm font-medium transition-colors"
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--background)',
                                opacity: (processing || !data.name.trim()) ? 0.5 : 1,
                            }}
                        >
                            Create
                        </button>
                    </form>
                </div>

                {/* Projects List */}
                <h2 className="text-xl font-semibold mb-6">Your Projects</h2>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link 
                            key={project.id}
                            href={`/${project.user?.username || 'user'}/${project.slug}`} 
                            className="block rounded-lg p-6 transition-all hover:-translate-y-0.5"
                            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                        >
                            <div className="font-medium mb-1 truncate">{project.name}</div>
                            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Updated {new Date(project.updated_at).toLocaleDateString()}
                            </div>
                        </Link>
                    ))}
                    
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-12 text-sm" style={{ color: 'var(--text-muted)' }}>
                            No projects yet. Create one above to get started!
                        </div>
                    )}
                </div>
            </main>
        </UserLayout>
    );
}
