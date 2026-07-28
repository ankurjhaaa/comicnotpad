import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PubLayout from '@/layouts/PubLayout';
import { login, register, dashboard } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    // Typing effect state
    const fullText = "The wind howled through the narrow streets of the city, carrying with it the scent of impending rain and something older. Something metallic.\n\nElias adjusted his collar against the chill, his eyes fixed on the neon sign flickering across the street. The message it displayed wasn't meant for everyone.";
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 40); // typing speed

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <PubLayout>
            <Head title="Evpad - Your minimalist writing environment" />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 md:pt-16 lg:pt-24 pb-12 lg:pb-32 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Text & CTA */}
                    <div className="flex flex-col items-start text-left z-10 pt-4 lg:pt-0 lg:pr-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.15]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
                            Smart writing<br />
                            for everyone
                        </h1>
                        
                        <p className="text-base sm:text-lg mb-8 leading-relaxed font-normal max-w-sm" style={{ color: 'var(--text-muted)' }}>
                            Secure, smart, and easy-to-use. Now enhanced with Echovel Workspace.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                            {auth.user ? (
                                <Link href={dashboard.url({ user: auth.user.username })} className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 flex items-center justify-center w-full sm:w-auto" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={register.url()} className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 flex items-center justify-center w-full sm:w-auto" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                        Create an account
                                    </Link>
                                    <Link href={login.url()} className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center w-full sm:w-auto" style={{ color: 'var(--text)' }}>
                                        Sign in
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column: UI Preview */}
                    <div className="relative w-full z-10 flex justify-center lg:justify-end">
                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 pointer-events-none rounded-full blur-[80px] hidden lg:block" style={{ background: 'radial-gradient(circle, var(--text) 0%, transparent 70%)' }}></div>
                        
                        <div 
                            className="rounded-2xl overflow-hidden flex transition-all duration-700 border w-full max-w-115 relative z-10 shadow-2xl bg-white dark:bg-black" 
                            style={{ borderColor: 'var(--border)', height: '420px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
                        >
                            {/* Fake Sidebar */}
                            <div className="w-48 shrink-0 border-r hidden sm:flex flex-col" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                                <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="m19 12-7 7"/></svg>
                                        </div>
                                        <span className="text-sm font-semibold tracking-tight">Evpad</span>
                                    </div>
                                </div>
                                <div className="p-3 flex-1 overflow-y-auto space-y-1 mt-2">
                                    <div className="flex items-center justify-between px-3 py-2 rounded-full" style={{ backgroundColor: 'var(--selection)' }}>
                                        <div className="flex items-center gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Chapter 1</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Chapter 2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Fake Editor */}
                            <div className="flex-1 flex flex-col h-full overflow-hidden relative" style={{ backgroundColor: 'var(--background)' }}>
                                {/* Editor Toolbar */}
                                <div className="h-12 flex items-center px-5 gap-3 border-b" style={{ borderColor: 'var(--border)' }}>
                                    <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>Draft</span>
                                </div>
                                
                                {/* Editor Content */}
                                <div className="px-6 md:px-8 pt-6 flex-1 relative text-left">
                                    <div className="text-2xl font-bold mb-4" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>The Call</div>
                                    
                                    <div className="text-sm md:text-base leading-relaxed relative min-h-50" style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}>
                                        <div className="absolute inset-0 whitespace-pre-wrap pr-4">
                                            {typedText}
                                            <span className="inline-block w-0.5 h-[1.1em] ml-1 align-middle animate-pulse" style={{ backgroundColor: 'var(--text)' }}></span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Fade out gradient at bottom */}
                                <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Feature Highlights Section */}
            <section className="border-t py-24 sm:py-32" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7" style={{ color: 'var(--text-muted)' }}>Powerful Features</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text)' }}>Everything you need. Nothing you don't.</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: 'var(--text)' }}>
                                    <div className="rounded-md p-2 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                    </div>
                                    Distraction-free Editor
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: 'var(--text-muted)' }}>
                                    <p className="flex-auto">The UI gets out of your way so you can focus purely on the text. No clunky sidebars or unnecessary formatting popups while you're in the flow.</p>
                                </dd>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: 'var(--text)' }}>
                                    <div className="rounded-md p-2 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                    </div>
                                    Lightning Fast
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: 'var(--text-muted)' }}>
                                    <p className="flex-auto">Engineered to be incredibly performant. Navigating between chapters, auto-saving, and loading massive documents happens instantly.</p>
                                </dd>
                            </div>
                            {/* Feature 3 */}
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: 'var(--text)' }}>
                                    <div className="rounded-md p-2 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="9" x2="9" y1="3" y2="21" /></svg>
                                    </div>
                                    Project Organization
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: 'var(--text-muted)' }}>
                                    <p className="flex-auto">Structure your novel, script, or notes into a tree of documents. Drag, drop, and reorganize easily without losing context.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>

            {/* Echovel Ecosystem Integration Section */}
            <section className="border-t py-24 sm:py-32 overflow-hidden relative" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--explorer-bg)' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-sm font-medium border bg-opacity-50 backdrop-blur-md" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
                        Part of the Echovel Ecosystem
                    </div>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl mb-6" style={{ color: 'var(--text)' }}>One account. <br /> Infinite possibilities.</h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
                        Evpad integrates seamlessly with your Echovel account.
                        In the future, you will sign in once with <strong>auth.echovel.com</strong> and get instant access to your writing environment, secure storage, and more.
                    </p>

                    <div className="flex justify-center">
                        <div className="rounded-2xl border p-2 backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'color-mix(in srgb, var(--background) 50%, transparent)' }}>
                            <div className="rounded-xl border px-8 py-6 flex flex-col items-center gap-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <div className="text-lg font-medium" style={{ color: 'var(--text)' }}>Sign in with Echovel</div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Coming Soon</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background design elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 opacity-[0.03] pointer-events-none rounded-full border border-dashed" style={{ borderColor: 'var(--text)' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 opacity-[0.04] pointer-events-none rounded-full border border-dashed" style={{ borderColor: 'var(--text)' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 opacity-[0.05] pointer-events-none rounded-full border" style={{ borderColor: 'var(--text)' }}></div>
            </section>
        </PubLayout>
    );
}
