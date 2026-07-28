import { Head, Link } from '@inertiajs/react';
import PubLayout from '@/layouts/PubLayout';

export default function Privacy() {
    return (
        <PubLayout>
            <Head title="Privacy Policy - Evpad" />
            
            {/* Header */}
            <div className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text)' }}>Privacy Policy</h1>
                    <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Effective: July 28, 2026</p>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-12">
                
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xs font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--text-muted)' }}>On this page</h3>
                        <nav className="flex flex-col gap-3 text-sm">
                            <a href="#data-collection" className="hover:underline transition-colors" style={{ color: 'var(--text)' }}>1. Data Collection</a>
                            <a href="#data-usage" className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>2. How We Use Data</a>
                            <a href="#data-protection" className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>3. Data Protection</a>
                            <a href="#your-rights" className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>4. Your Rights</a>
                        </nav>
                        
                        <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                            <Link href="/terms" className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: 'var(--primary)' }}>
                                Terms of Service
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 max-w-3xl space-y-12">
                    
                    <section id="data-collection" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>1. Data Collection</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                At Evpad (an Echovel product), we believe in data minimization. We only collect the personal data required to provide our service to you.
                            </p>
                            <p>
                                This primarily includes your email address for authentication (via your Echovel Account) and the content you explicitly create and save within the Evpad application, such as your projects, nodes, and written text.
                            </p>
                        </div>
                    </section>

                    <section id="data-usage" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>2. How We Use Data</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                We use the information we collect to provide, maintain, and improve our services. Your written content is used exclusively to display it back to you and is never used for targeted advertising.
                            </p>
                            <p>
                                We do not sell your personal data to third parties. Your stories and notes remain completely private unless you explicitly choose to share them.
                            </p>
                        </div>
                    </section>

                    <section id="data-protection" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>3. Data Protection</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                We implement industry-standard security measures, including encryption in transit and at rest, to ensure your data remains secure and private.
                            </p>
                            <div className="p-4 rounded-lg border mt-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>Security Promise:</p>
                                <p className="text-sm mt-1">We treat your unpublished manuscripts with the utmost confidentiality. Access to production databases is strictly restricted.</p>
                            </div>
                        </div>
                    </section>

                    <section id="your-rights" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>4. Your Rights</h2>
                        <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                You have the right to access, correct, or delete your personal data. You can delete your projects at any time using the "Move to Trash" and permanent deletion tools provided in the application.
                            </p>
                            <p>
                                If you wish to delete your entire Echovel Account and all associated data, you can do so through the main Echovel account management dashboard.
                            </p>
                        </div>
                    </section>
                </div>

            </main>
        </PubLayout>
    );
}
