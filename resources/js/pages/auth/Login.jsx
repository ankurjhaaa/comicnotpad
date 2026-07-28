import { Head, Link, useForm } from '@inertiajs/react';
import PubLayout from '@/layouts/PubLayout';
import { login, register } from '@/routes';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(login.url());
    };

    return (
        <PubLayout>
            <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-10">
                <Head title="Log in" />

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-sm" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                            Enter your credentials to access your workspace
                        </p>
                    </div>

                    <div className="py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 backdrop-blur-xl border transition-all" style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)', borderColor: 'var(--border)' }}>
                        <form className="space-y-6" onSubmit={submit}>
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
                                        autoComplete="current-password"
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        className="h-4 w-4 rounded focus:ring-0 cursor-pointer"
                                        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', accentColor: 'var(--text)' }}
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium focus:outline-none transition-transform hover:-translate-y-0.5 active:translate-y-0"
                                    style={{ backgroundColor: 'var(--text)', color: 'var(--background)', opacity: processing ? 0.7 : 1 }}
                                >
                                    {processing ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'var(--border)' }}>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                Don't have an account?{' '}
                                <Link href={register.url()} className="font-semibold transition-colors hover:underline" style={{ color: 'var(--text)' }}>
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Decorative background blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 opacity-10 pointer-events-none rounded-full blur-[100px] z-[-1]" style={{ background: 'radial-gradient(circle, var(--text) 0%, transparent 70%)' }}></div>
            </div>
        </PubLayout>
    );
}
