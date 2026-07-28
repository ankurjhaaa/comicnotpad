import { Head, Link } from '@inertiajs/react';
import PubLayout from '@/layouts/PubLayout';

export default function Privacy() {
    return (
        <PubLayout>
            <Head title="Privacy Policy - Evpad" />
            <main className="mx-auto max-w-3xl px-6 py-12 md:py-24">
                <h1 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: 'var(--text)' }}>Privacy Policy</h1>
                <div className="space-y-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    <p>
                        At Evpad (an Echovel product), we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
                    </p>
                    <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: 'var(--text)' }}>1. Data Collection</h2>
                    <p>
                        We collect minimal personal data required to provide our service, primarily your email address for authentication and the content you explicitly create and save within Evpad.
                    </p>
                    <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: 'var(--text)' }}>2. Data Protection</h2>
                    <p>
                        Your written content is yours alone. We implement industry-standard security measures to ensure your data remains secure and private.
                    </p>
                    <div className="pt-8 border-t mt-12" style={{ borderColor: 'var(--border)' }}>
                        <Link href="/" className="hover:underline text-sm">← Back to Home</Link>
                    </div>
                </div>
            </main>
        </PubLayout>
    );
}
