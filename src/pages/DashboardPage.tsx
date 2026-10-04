import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getUserPortfolios, deletePortfolio } from '../services/portfolioStore';
import ThemeToggle from '../components/ThemeToggle';

function formatThemeName(themeId) {
    if (!themeId) return 'Default';
    // Handle camelCase (e.g. boldMinimal -> Bold Minimal)
    // or kebab-case (e.g. retro-vaporwave -> Retro Vaporwave)
    const formatted = themeId
        .replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase
        .replace(/-/g, ' '); // split kebab-case
    // Capitalize first letter of each word
    return formatted.replace(/\b\w/g, c => c.toUpperCase());
}

export default function DashboardPage() {
    const { user, signOut } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        async function fetchPortfolios() {
            try {
                const results = await getUserPortfolios(user.uid);
                // Sort by publishedAt descending
                results.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                setPortfolios(results);
            } catch (err) {
                console.error('Error fetching portfolios:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchPortfolios();
    }, [user, navigate]);

    const handleDelete = async (slug) => {
        if (!window.confirm("Are you sure you want to delete this portfolio? This cannot be undone.")) return;

        try {
            await deletePortfolio(slug);
            setPortfolios(prev => prev.filter(p => p.slug !== slug));
        } catch (err) {
            console.error('Failed to delete portfolio:', err);
            alert('Failed to delete portfolio. Please try again.');
        }
    };

    return (
        <div className="upload-root" data-theme={isDark ? 'dark' : 'light'}>
            {/* Background Orbs */}
            <div className="landing-orbs">
                <div className="landing-orb landing-orb-1" />
                <div className="landing-orb landing-orb-2" />
                <div className="landing-orb landing-orb-3" />
            </div>

            {/* Navbar */}
            <nav className="upload-nav">
                <div className="upload-nav-inner">
                    <div className="upload-nav-brand" onClick={() => navigate('/upload')} style={{ cursor: 'pointer' }}>
                        <div className="landing-logo">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <span className="landing-brand-text">ResumeForge</span>
                    </div>

                    <div className="upload-nav-actions">
                        <button onClick={() => navigate('/upload')} className="landing-cta-secondary" style={{ padding: '8px 16px', background: isDark ? 'var(--color-slate-800)' : 'white' }}>
                            + New Portfolio
                        </button>
                        <ThemeToggle />
                        {user && (
                            <div className="upload-user-section">
                                <img src={user.photoURL} alt="" className="upload-user-avatar" />
                                <button onClick={signOut} className="upload-signout-btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="upload-main" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '140px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <div className="animate-fade-up" style={{ width: '100%', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h1 className="upload-title" style={{ fontSize: '2.8rem', textAlign: 'left', marginBottom: '8px' }}>
                                My Portfolios
                            </h1>
                            <p className="upload-subtitle" style={{ fontSize: '1.1rem', textAlign: 'left', margin: 0 }}>
                                Manage, view, and organize your AI-generated portfolios.
                            </p>
                        </div>
                        <button onClick={() => navigate('/upload')} className="btn-primary" style={{ padding: '12px 24px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            New Portfolio
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="animate-pulse-glow" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-slate-500)' }}>
                        Loading your portfolios...
                    </div>
                ) : portfolios.length === 0 ? (
                    <div className="upload-empty-state animate-fade-in" style={{ padding: '60px 40px', borderRadius: '16px', width: '100%' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={isDark ? 'var(--color-slate-600)' : 'var(--color-slate-400)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="9" y1="3" x2="9" y2="21" />
                        </svg>
                        <p className="upload-empty-title">You don't have any portfolios yet.</p>
                        <p className="upload-empty-hint" style={{ marginBottom: '24px' }}>Upload a resume to create your first stunning web portfolio.</p>
                        <button onClick={() => navigate('/upload')} className="btn-primary">
                            Create First Portfolio
                        </button>
                    </div>
                ) : (
                    <div className="bento-grid" style={{ width: '100%' }}>
                        {portfolios.map((portfolio, idx) => (
                            <div key={portfolio.slug} className="bento-card animate-fade-up" style={{ animationDelay: `${100 + idx * 50}ms`, padding: 0, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                {/* Mockup Header */}
                                <div style={{ height: '120px', background: isDark ? 'linear-gradient(135deg, #1e293b, #0f172a)' : 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', position: 'relative', borderBottom: `1px solid ${isDark ? '#334155' : '#cbd5e1'}` }}>
                                    {/* Theme Tag Overlay */}
                                    <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255, 255, 255, 0.95)', color: '#020617', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '24px', fontWeight: 700, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                        {formatThemeName(portfolio.theme)}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: -24, left: 24, width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', border: `4px solid ${isDark ? '#1e293b' : 'white'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                                        <span style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--font-family-display)' }}>{(portfolio.bio?.name || 'U').charAt(0)}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '36px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-slate-800)', marginBottom: '8px', lineHeight: 1.2 }}>
                                        {portfolio.bio?.name || 'Untitled Portfolio'}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--color-slate-500)', fontWeight: 500, marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                                        {portfolio.bio?.title || 'No title specified'}
                                    </p>
                                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)', fontWeight: 600 }}>
                                            {new Date(portfolio.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <a href={`#/p/${portfolio.slug}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem', borderRadius: '10px' }}>
                                                View Live
                                            </a>
                                            <button onClick={() => handleDelete(portfolio.slug)} className="btn-secondary" style={{ padding: '8px', color: '#ef4444', borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)', background: 'transparent', borderRadius: '10px' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-footer-inner">
                    <p className="landing-footer-copy">
                        © {new Date().getFullYear()} ResumeForge. Crafted with AI.
                    </p>
                </div>
            </footer>
        </div>
    );
}
