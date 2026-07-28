import { Head, Link, useForm } from '@inertiajs/react';
import PubLayout from '@/layouts/PubLayout';
import { register, login } from '@/routes';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(register.url());
    };

    return (
        <PubLayout>
            <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-10">
                <Head title="Register" />

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-sm" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                            Start building your epic universe today
                        </p>
                    </div>

                    <div className="py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 backdrop-blur-xl border transition-all" style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)', borderColor: 'var(--border)' }}>
                        <form className="space-y-5" onSubmit={submit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-1.5"
                                    style={{ color: 'var(--text)' }}
                                >
                                    Full Name
                                </label>
                                <div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none block w-full px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all"
                                        style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)', '--tw-ring-color': 'var(--text-muted)' }}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Jane Doe"
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--danger)' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium mb-1.5"
                                    style={{ color: 'var(--text)' }}
                                >
                                    Username
                                </label>
                                <div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all"
                                        style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)', '--tw-ring-color': 'var(--text-muted)' }}
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="janedoe"
                                    />
                                    {errors.username && (
                                        <p className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--danger)' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                            {errors.username}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-1.5"
                                    style={{ color: 'var(--text)' }}
                                >
                                    Email address
                                </label>
                                <div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all"
                                        style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)', '--tw-ring-color': 'var(--text-muted)' }}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--danger)' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mb-1.5"
                                    style={{ color: 'var(--text)' }}
                                >
                                    Password
                                </label>
                                <div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all"
                                        style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)', '--tw-ring-color': 'var(--text-muted)' }}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--danger)' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-medium mb-1.5"
                                    style={{ color: 'var(--text)' }}
                                >
                                    Confirm Password
                                </label>
                                <div>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-all"
                                        style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)', '--tw-ring-color': 'var(--text-muted)' }}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium focus:outline-none transition-transform hover:-translate-y-0.5 active:translate-y-0"
                                    style={{ backgroundColor: 'var(--text)', color: 'var(--background)', opacity: processing ? 0.7 : 1 }}
                                >
                                    {processing ? 'Creating account...' : 'Create account'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'var(--border)' }}>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                Already have an account?{' '}
                                <Link href={login.url()} className="font-semibold transition-colors hover:underline" style={{ color: 'var(--text)' }}>
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Decorative background blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none rounded-full blur-[100px] z-[-1]" style={{ background: 'radial-gradient(circle, var(--text) 0%, transparent 70%)' }}></div>
            </div>
        </PubLayout>
    );
}
