import { Head, Link, usePage } from '@inertiajs/react';
import PubLayout from '@/layouts/PubLayout';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <PubLayout>
            <Head title="WriterOS - Your minimalist writing environment" />
            
            {/* Hero Section */}
            <main className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 text-center flex flex-col items-center relative">
                
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, var(--text) 0%, transparent 70%)' }}></div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-medium border shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)', color: 'var(--text-muted)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }}></span>
                    WriterOS 2.0 is now live
                </div>

                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] z-10" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
                    The blank page, <br/> <span style={{ color: 'color-mix(in srgb, var(--text) 40%, var(--background))' }}>perfected.</span>
                </h1>
                
                <p className="text-lg sm:text-xl mb-12 max-w-2xl leading-relaxed z-10" style={{ color: 'var(--text-muted)' }}>
                    A stunningly fast, distraction-free environment to organize your thoughts, build worlds, and draft stories. Minimalist design, powerful features.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center z-10 w-full sm:w-auto">
                    {auth.user ? (
                        <Link href={`/${auth.user.username}`} className="px-8 py-3.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                            Go to your Dashboard
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </Link>
                    ) : (
                        <>
                            <Link href="/register" className="px-8 py-3.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--text)', color: 'var(--background)' }}>
                                Start Writing Now
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </Link>
                            <Link href="/login" className="px-8 py-3.5 rounded-lg text-sm font-medium transition-all hover:bg-opacity-80 flex items-center justify-center border" style={{ backgroundColor: 'transparent', color: 'var(--text)', borderColor: 'var(--border)' }}>
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </main>

            {/* Premium UI Preview */}
            <section className="mx-auto max-w-5xl px-6 pb-32 relative z-10">
                <div 
                    className="rounded-xl overflow-hidden flex shadow-2xl transition-all duration-700 hover:shadow-3xl border" 
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--editor-bg)', height: '550px' }}
                >
                    {/* Fake Sidebar */}
                    <div className="w-56 shrink-0 border-r hidden sm:flex flex-col" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--explorer-bg)' }}>
                        <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)' }}>
                            <div className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>PROJECTS</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </div>
                        <div className="p-3 flex-1 overflow-y-auto">
                            <div className="flex items-center justify-between mb-1 px-3 py-2 rounded-md" style={{ backgroundColor: 'var(--selection)' }}>
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Chapter 1: The Call</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1 px-3 py-2 rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Chapter 2: Departure</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1 px-3 py-2 rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Characters</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Fake Editor */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                        {/* Editor Toolbar/Breadcrumb */}
                        <div className="h-12 border-b flex items-center px-6 gap-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>My Epic Novel</span>
                            <span className="text-sm" style={{ color: 'var(--border)' }}>/</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Chapter 1: The Call</span>
                        </div>
                        
                        {/* Editor Content */}
                        <div className="p-8 sm:p-16 flex-1">
                            <div className="text-4xl font-bold mb-8" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>Chapter 1: The Call</div>
                            
                            <div className="space-y-4">
                                <div className="h-3 rounded-full w-full" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                <div className="h-3 rounded-full w-[95%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                <div className="h-3 rounded-full w-[85%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                <div className="h-3 rounded-full w-[90%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                <div className="h-3 rounded-full w-[60%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                            </div>
                            
                            <div className="space-y-4 mt-8">
                                <div className="h-3 rounded-full w-full" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                <div className="h-3 rounded-full w-[88%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                <div className="h-3 rounded-full w-[92%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                                <div className="h-3 rounded-full w-[75%]" style={{ backgroundColor: 'var(--surface-2)' }}></div>
                            </div>

                            {/* Blinking cursor effect */}
                            <div className="mt-8 flex items-center">
                                <div className="w-[2px] h-6 animate-pulse" style={{ backgroundColor: 'var(--primary)' }}></div>
                            </div>
                        </div>
                        
                        {/* Fade out gradient at bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--editor-bg))' }}></div>
                    </div>
                </div>
            </section>
        </PubLayout>
    );
}
