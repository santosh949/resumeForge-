import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { THEMES, getTheme, getRandomThemeId } from '../templates/themes';
import RecruiterModeToggle from './RecruiterModeToggle';
import { useTheme } from '../context/ThemeContext';

export default function PortfolioNavbar({
    themeId,
    setThemeId,
    recruiterMode,
    setRecruiterMode,
    onPublish,
    publishing,
    isPreview = false,
    liveStats,
    onBack
}) {
    const { isDark } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fallback to the first theme if themeId is not yet available
    const currentTheme = themeId ? getTheme(themeId) : THEMES[0];

    // Group themes by category
    const themesByCategory = THEMES.reduce((acc, theme) => {
        const cat = theme.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(theme);
        return acc;
    }, {});

    return (
        <div className="portfolio-controls" data-theme={isDark ? 'dark' : 'light'}>

            {isPreview ? (
                <>
                    {/* Theme Selector Dropdown */}
                    {/* Theme Selector Button */}
                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="portfolio-theme-label"
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', outline: 'none' }}
                        >
                            <span style={{ fontSize: '1rem' }}>🎨</span> {currentTheme.name}
                            <span style={{ fontSize: '0.6rem', marginLeft: '4px', opacity: 0.7 }}>▼</span>
                        </button>

                        {isModalOpen && createPortal(
                            <div className="theme-modal-overlay" onClick={() => setIsModalOpen(false)}>
                                <div className="theme-modal-content" onClick={e => e.stopPropagation()} data-theme={isDark ? 'dark' : 'light'}>
                                    <div className="theme-modal-header">
                                        <h2 className="theme-modal-title">Choose a Theme</h2>
                                        <button className="theme-modal-close" onClick={() => setIsModalOpen(false)}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="theme-modal-body">
                                        {Object.entries(themesByCategory).map(([category, themes]) => (
                                            <div key={category} className="theme-modal-category">
                                                <div className="theme-modal-category-title">{category}</div>
                                                <div className="theme-modal-grid">
                                                    {themes.map(t => (
                                                        <div
                                                            key={t.id}
                                                            onClick={() => { setThemeId(t.id); setIsModalOpen(false); }}
                                                            className={`theme-card ${themeId === t.id ? 'active' : ''}`}
                                                        >
                                                            <div className="theme-color-preview" style={{ background: t.colors.bg, border: `3px solid ${t.colors.accent}` }} />
                                                            <div className="theme-card-info">
                                                                <span className="theme-card-name">{t.name}</span>
                                                                <span class="theme-card-font">{t.fonts.display.split(',')[0].replace(/['"]/g, '')}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>,
                            document.body
                        )}
                    </div>

                    <div className="portfolio-divider" />

                    {/* Shuffle theme */}
                    <button
                        onClick={() => setThemeId(getRandomThemeId())}
                        title="Shuffle Theme"
                        className="portfolio-ctrl-btn shuffle"
                        style={{ border: 'none', background: 'transparent' }}
                    >
                        🎲
                    </button>
                </>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}>
                    <span style={{ color: 'var(--color-slate-500)', fontSize: '0.8rem', fontWeight: 600 }}>Built with</span>
                    <a href="#/" style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', letterSpacing: '-0.02em' }}>ResumeForge</a>
                </div>
            )}

            <div className="portfolio-divider" />

            {/* Recruiter Toggle - Available in BOTH */}
            <RecruiterModeToggle enabled={recruiterMode} onToggle={() => setRecruiterMode(!recruiterMode)} />

            {isPreview && (
                <>
                    <div className="portfolio-divider" />

                    {/* Publish */}
                    <button
                        onClick={onPublish}
                        disabled={publishing}
                        className="portfolio-publish-btn">
                        {publishing ? '⏳' : '🚀'} {publishing ? 'Publishing...' : 'Publish'}
                    </button>

                    <div className="portfolio-divider" />

                    {/* Live stats mini */}
                    {liveStats && (
                        <div className="portfolio-stats-badge">
                            <span className="landing-live-dot" style={{ width: 5, height: 5 }} />
                            <strong>{liveStats.portfoliosCreated.toLocaleString()}</strong> portfolios live
                        </div>
                    )}

                    <div className="portfolio-divider" />

                    {/* Back button */}
                    <button
                        onClick={onBack}
                        title="Upload New Resume"
                        className="portfolio-ctrl-btn">
                        ↩️
                    </button>
                </>
            )}
        </div>
    );
}
