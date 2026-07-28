import { useTheme } from '@/hooks/useTheme';
import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { logout } from '@/routes';

export default function UserLayout({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div 
            className="min-h-screen transition-theme flex flex-col" 
            style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}
        >
            <nav className="flex items-center justify-between px-6 py-4 mx-auto max-w-5xl w-full" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="text-lg font-bold tracking-tight">
                    WriterOS <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>/ Projects</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                    <button onClick={toggleTheme} className="text-xs uppercase tracking-wider transition-opacity hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <Link href={logout.url()} method="post" as="button" className="flex items-center gap-1 transition-colors" style={{ color: 'var(--text-muted)' }} onMouseEnter={(e) => e.target.style.color = 'var(--danger)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                        <LogOut size={14} />
                        Logout
                    </Link>
                </div>
            </nav>

            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
