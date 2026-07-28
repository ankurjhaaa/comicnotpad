import { Head, Link } from '@inertiajs/react';
import PubLayout from '@/layouts/PubLayout';

export default function Terms() {
    return (
        <PubLayout>
            <Head title="Terms of Service - Evpad" />
            <main className="mx-auto max-w-3xl px-6 py-12 md:py-24">
                <h1 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: 'var(--text)' }}>Terms of Service</h1>
                <div className="space-y-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    <p>
                        Welcome to Evpad, an Echovel product. By using our service, you agree to the following terms and conditions. 
                        Please read them carefully.
                    </p>
                    <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: 'var(--text)' }}>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using Evpad, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                    </p>
                    <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: 'var(--text)' }}>2. User Content</h2>
                    <p>
                        You retain all rights to any content you submit, post or display on or through the service. We claim no intellectual property rights over the material you provide to the service.
                    </p>
                    <div className="pt-8 border-t mt-12" style={{ borderColor: 'var(--border)' }}>
                        <Link href="/" className="hover:underline text-sm">← Back to Home</Link>
                    </div>
                </div>
            </main>
        </PubLayout>
    );
}
