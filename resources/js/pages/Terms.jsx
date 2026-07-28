import { Head, Link } from '@inertiajs/react';
import PubLayout from '@/layouts/PubLayout';

export default function Terms() {
    return (
        <PubLayout>
            <Head title="Terms of Service - Evpad" />
            
            {/* Header */}
            <div className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text)' }}>Terms of Service</h1>
                    <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Effective: July 28, 2026</p>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-12">
                
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xs font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--text-muted)' }}>On this page</h3>
                        <nav className="flex flex-col gap-3 text-sm">
                            <a href="#welcome" className="hover:underline transition-colors" style={{ color: 'var(--text)' }}>1. Welcome to Evpad</a>
                            <a href="#your-content" className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>2. Your Content</a>
                            <a href="#privacy" className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>3. Privacy & Copyright</a>
                            <a href="#account" className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>4. Your Echovel Account</a>
                        </nav>
                        
                        <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                            <Link href="/privacy" className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: 'var(--primary)' }}>
                                Privacy Policy
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 max-w-3xl space-y-12">
                    
                    <section id="welcome" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>1. Welcome to Evpad</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                Thank you for using Evpad, an Echovel product. We build Evpad to provide a distraction-free, lightning-fast environment for your writing, notes, and world-building.
                            </p>
                            <p>
                                By using our Services, you are agreeing to these terms. Please read them carefully. Our Services are very diverse, so sometimes additional terms or product requirements may apply.
                            </p>
                        </div>
                    </section>

                    <section id="your-content" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>2. Your Content in our Services</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                Some of our Services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours.
                            </p>
                            <p>
                                When you upload, submit, store, send or receive content to or through our Services, you give Echovel (and those we work with) a worldwide license to use, host, store, reproduce, modify, create derivative works (such as those resulting from translations, adaptations or other changes we make so that your content works better with our Services).
                            </p>
                            <div className="p-4 rounded-lg border mt-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>Note on Intellectual Property:</p>
                                <p className="text-sm mt-1">We do not claim ownership over the manuscripts, stories, or notes you write within Evpad. Your ideas remain exclusively yours.</p>
                            </div>
                        </div>
                    </section>

                    <section id="privacy" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>3. Privacy and Copyright Protection</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                Echovel's privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Echovel can use such data in accordance with our privacy policies.
                            </p>
                        </div>
                    </section>

                    <section id="account" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>4. Your Echovel Account</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                You may need an Echovel Account in order to use some of our Services. You may create your own Echovel Account, or your Echovel Account may be assigned to you by an administrator, such as your employer or educational institution.
                            </p>
                            <p>
                                To protect your Echovel Account, keep your password confidential. You are responsible for the activity that happens on or through your Echovel Account. Try not to reuse your Echovel Account password on third-party applications.
                            </p>
                        </div>
                    </section>
                </div>

            </main>
        </PubLayout>
    );
}
