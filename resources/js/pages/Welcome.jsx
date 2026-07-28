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
            
            <main className="mx-auto max-w-7xl px-6 py-12 md:py-24 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Text & CTA */}
                    <div className="flex flex-col items-start text-left z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-medium border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }}></span>
                            Evpad is now live
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
                            Premium writing, <br/>
                            <span style={{ color: 'color-mix(in srgb, var(--text) 50%, var(--background))' }}>distraction-free.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg" style={{ color: 'var(--text-muted)' }}>
                            A stunningly fast environment to organize your thoughts, build worlds, and draft stories. Designed for focus, built for speed.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            {auth.user ? (
                                <Link href={dashboard.url({ user: auth.user.username })} className="px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                    Go to Dashboard
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </Link>
                            ) : (
                                <>
                                    <Link href={register.url()} className="px-6 py-3 rounded-md text-sm font-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                        Start Writing
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </Link>
                                    <Link href={login.url()} className="px-6 py-3 rounded-md text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center border" style={{ backgroundColor: 'transparent', color: 'var(--text)', borderColor: 'var(--border)' }}>
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Premium UI Preview */}
                    <div className="relative w-full z-10 lg:pl-10">
                        {/* Decorative background glow (hidden on mobile) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] opacity-10 pointer-events-none rounded-full blur-[80px] hidden md:block" style={{ background: 'radial-gradient(circle, var(--text) 0%, transparent 70%)' }}></div>
                        
                        <div 
                            className="rounded-xl overflow-hidden flex transition-all duration-700 border w-full relative z-10" 
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--editor-bg)', height: '500px' }}
                        >
                            {/* Fake Sidebar */}
                            <div className="w-48 shrink-0 border-r hidden sm:flex flex-col" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--explorer-bg)' }}>
                                <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
                                    <div className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>PROJECTS</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                </div>
                                <div className="p-3 flex-1 overflow-y-auto">
                                    <div className="flex items-center justify-between mb-1 px-3 py-2 rounded-md" style={{ backgroundColor: 'var(--selection)' }}>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Chapter 1</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-1 px-3 py-2 rounded-md transition-colors">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Chapter 2</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-1 px-3 py-2 rounded-md transition-colors">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Characters</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Fake Editor */}
                            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                                {/* Editor Toolbar */}
                                <div className="h-12 border-b flex items-center px-4 sm:px-6 gap-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>My Novel</span>
                                    <span className="text-sm" style={{ color: 'var(--border)' }}>/</span>
                                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Chapter 1</span>
                                </div>
                                
                                {/* Editor Content */}
                                <div className="p-6 sm:p-10 flex-1 relative">
                                    <div className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>Chapter 1: The Call</div>
                                    
                                    <div className="text-base sm:text-lg leading-relaxed relative min-h-[150px]" style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}>
                                        <div className="absolute inset-0 whitespace-pre-wrap">
                                            {typedText}
                                            <span className="inline-block w-[2px] h-[1.1em] ml-1 align-middle animate-pulse" style={{ backgroundColor: 'var(--primary)' }}></span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 mt-8 opacity-20">
                                        <div className="h-2 sm:h-3 rounded-full w-full" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                        <div className="h-2 sm:h-3 rounded-full w-[88%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                        <div className="h-2 sm:h-3 rounded-full w-[92%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                        <div className="h-2 sm:h-3 rounded-full w-[75%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                    </div>
                                </div>
                                
                                {/* Fade out gradient at bottom */}
                                <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--editor-bg))' }}></div>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/></svg>
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
                    <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl mb-6" style={{ color: 'var(--text)' }}>One account. <br/> Infinite possibilities.</h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
                        Evpad integrates seamlessly with your Echovel account. 
                        In the future, you will sign in once with <strong>auth.echovel.com</strong> and get instant access to your writing environment, secure storage, and more.
                    </p>
                    
                    <div className="flex justify-center">
                        <div className="rounded-2xl border p-2 backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'color-mix(in srgb, var(--background) 50%, transparent)' }}>
                            <div className="rounded-xl border px-8 py-6 flex flex-col items-center gap-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </div>
                                <div className="text-lg font-medium" style={{ color: 'var(--text)' }}>Sign in with Echovel</div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Coming Soon</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Background design elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none rounded-full border border-dashed" style={{ borderColor: 'var(--text)' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none rounded-full border border-dashed" style={{ borderColor: 'var(--text)' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.05] pointer-events-none rounded-full border" style={{ borderColor: 'var(--text)' }}></div>
            </section>
        </PubLayout>
    );
}
