import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState, useRef } from 'react';
import { onStatsSnapshot } from '../services/statsService';
import ThemeToggle from '../components/ThemeToggle';

/* ─── Animated counter hook (scroll-triggered) ─── */
function useCounter(target, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        if (target === 0) { setCount(0); return; }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let start = 0;
                    const step = target / (duration / 16);
                    const timer = setInterval(() => {
                        start += step;
                        if (start >= target) { setCount(target); clearInterval(timer); }
                        else setCount(Math.floor(start));
                    }, 16);
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return { count, ref };
}

/* ─── Particle Background ─── */
function ParticleField({ isDark }) {
    return (
        <div className="landing-particles">
            {Array.from({ length: 25 }).map((_, i) => (
                <div
                    key={i}
                    className="landing-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 10 + 10}s`,
                        background: isDark
                            ? `rgba(110, 231, 183, ${Math.random() * 0.35 + 0.1})`
                            : `rgba(16, 185, 129, ${Math.random() * 0.3 + 0.1})`,
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Interactive Mockup Card ─── */
function MockupCard({ isDark, className = '' }) {
    return (
        <div className={`landing-mockup-card ${className}`}>
            <div className="landing-mockup-chrome" style={{
                background: isDark ? '#1e293b' : '#f1f5f9',
                borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            }}>
                <span className="landing-mockup-dot" style={{ background: '#ef4444' }} />
                <span className="landing-mockup-dot" style={{ background: '#f59e0b' }} />
                <span className="landing-mockup-dot" style={{ background: '#22c55e' }} />
                <span className="landing-mockup-url" style={{
                    background: isDark ? '#0f172a' : '#e2e8f0',
                    color: isDark ? '#64748b' : '#94a3b8',
                }}>resumeforge.dev/portfolio</span>
            </div>
            <div className="landing-mockup-body" style={{
                background: isDark
                    ? 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)'
                    : 'linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)',
            }}>
                <div style={{ padding: '20px' }}>
                    <div className="landing-mockup-avatar" style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                    }} />
                    <div style={{ width: '70%', height: 10, borderRadius: 5, marginTop: 12, background: isDark ? '#334155' : '#e2e8f0' }} />
                    <div style={{ width: '50%', height: 7, borderRadius: 4, marginTop: 8, background: isDark ? '#1e293b' : '#f1f5f9' }} />
                    <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
                        {[60, 45, 75].map((w, j) => (
                            <div key={j} style={{ width: `${w}%`, height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${isDark ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)'}, transparent)` }} />
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
                        {[1, 2, 3, 4].map(k => (
                            <div key={k} style={{ height: 28, borderRadius: 6, background: isDark ? '#1e293b' : '#f1f5f9', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Feature SVG Icons ─── */
const featureIcons = {
    bolt: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    target: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
    ),
    globe: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    palette: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" /><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" /><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
    ),
    shield: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    ),
    wand: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" />
            <path d="M17.8 11.8 19 13" /><path d="M15 9h0" /><path d="M17.8 6.2 19 5" />
            <path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" />
        </svg>
    ),
};

export default function LandingPage() {
    const { user, signIn } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [liveStats, setLiveStats] = useState({ userCount: 0, portfoliosCreated: 0 });
    const heroRef = useRef(null);

    useEffect(() => {
        if (user) navigate('/upload');
    }, [user, navigate]);

    // Real-time Firestore stats listener
    useEffect(() => {
        const unsub = onStatsSnapshot((stats) => setLiveStats(stats));
        return () => unsub();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSignIn = async () => {
        try { await signIn(); } catch (err) { console.error(err); }
    };

    // Live stats for animated counters
    const stat1 = useCounter(liveStats.userCount);
    const stat2 = useCounter(liveStats.portfoliosCreated);

    const features = [
        { icon: 'bolt', title: 'Lightning Fast', desc: 'Upload your resume and get a fully built portfolio in under 30 seconds. No coding required.', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
        { icon: 'target', title: 'Recruiter Optimized', desc: 'AI highlights key achievements and metrics that recruiters actually look for.', gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
        { icon: 'globe', title: 'Instant Publishing', desc: 'One-click publish with a unique shareable URL. Your portfolio goes live immediately.', gradient: 'linear-gradient(135deg, #10b981, #14b8a6)' },
        { icon: 'palette', title: 'Premium Themes', desc: 'Choose from stunning, hand-crafted themes designed by professional UI designers.', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
        { icon: 'shield', title: 'Privacy First', desc: 'Your data stays secure. We only process your resume to generate the portfolio.', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
        { icon: 'wand', title: 'AI Intelligence', desc: 'Powered by Google Gemini AI to intelligently categorize and present your skills.', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)' },
    ];

    const steps = [
        { num: '01', title: 'Upload Resume', desc: 'Drop your PDF resume — we handle the rest', icon: '📄' },
        { num: '02', title: 'AI Processes', desc: 'Gemini AI extracts and categorizes your data', icon: '🤖' },
        { num: '03', title: 'Get Portfolio', desc: 'Receive a stunning, ready-to-share portfolio', icon: '🚀' },
    ];

    return (
        <div className="landing-root" data-theme={isDark ? 'dark' : 'light'}>
            <ParticleField isDark={isDark} />

            {/* ─── GRADIENT ORB BACKGROUND ─── */}
            <div className="landing-orbs">
                <div className="landing-orb landing-orb-1" style={{
                    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                }} />
                <div className="landing-orb landing-orb-2" style={{
                    transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
                }} />
                <div className="landing-orb landing-orb-3" />
            </div>

            {/* ─── NAVBAR ─── */}
            <nav className="landing-nav">
                <div className="landing-nav-inner">
                    <div className="landing-nav-brand">
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

                    <div className="landing-nav-links">
                        <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="landing-nav-link">Features</a>
                        <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="landing-nav-link">How it Works</a>
                        <a href="#stats" onClick={(e) => { e.preventDefault(); document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }); }} className="landing-nav-link">Live Stats</a>
                    </div>

                    <div className="landing-nav-actions">
                        <ThemeToggle />
                        <button onClick={handleSignIn} className="landing-signin-btn" id="nav-sign-in-btn">
                            <svg width="18" height="18" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── HERO ─── */}
            <section className="landing-hero" ref={heroRef}>
                <div className="landing-hero-content animate-fade-up">
                    <div className="landing-badge">
                        <span className="landing-badge-dot" />
                        <span>AI-Powered Portfolio Generator</span>
                        <span className="landing-badge-new">NEW</span>
                    </div>

                    <h1 className="landing-hero-title">
                        Transform Your Resume
                        <br />
                        Into a{' '}
                        <span className="landing-gradient-text">
                            Stunning Portfolio
                        </span>
                    </h1>

                    <p className="landing-hero-subtitle">
                        Upload your PDF resume and watch AI create a beautiful, recruiter-optimized
                        portfolio website in seconds. No coding. No design skills. Just results.
                    </p>

                    <div className="landing-hero-actions">
                        <button onClick={handleSignIn} className="landing-cta-primary" id="hero-sign-in-btn">
                            <svg width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            Get Started Free
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="landing-cta-secondary">
                            See How It Works
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                            </svg>
                        </a>
                    </div>

                    {/* Live user badge — replaces fake logos */}
                    <div className="landing-trust-row">
                        <div className="landing-live-badge">
                            <span className="landing-live-dot" />
                            LIVE
                        </div>
                        <span className="landing-trust-text">
                            <strong>{liveStats.userCount.toLocaleString()}</strong> users have joined
                            {liveStats.portfoliosCreated > 0 && (
                                <> · <strong>{liveStats.portfoliosCreated.toLocaleString()}</strong> portfolios created</>
                            )}
                        </span>
                    </div>
                </div>

                {/* Hero Mockup */}
                <div className="landing-hero-visual animate-fade-up delay-300">
                    <MockupCard isDark={isDark} className="landing-mockup-main" />
                    <MockupCard isDark={isDark} className="landing-mockup-float-1" />
                    <MockupCard isDark={isDark} className="landing-mockup-float-2" />
                    <div className="landing-hero-glow" />
                </div>
            </section>

            {/* ─── SCROLLING MARQUEE (replaces logos) ─── */}
            <section className="landing-marquee-section">
                <div className="landing-marquee-track">
                    <div className="landing-marquee-content">
                        {['AI-Powered', '⚡ Instant Generation', '🎯 Recruiter-Ready', '🌐 One-Click Publish', '🎨 Premium Themes', '🔒 Privacy First', '✨ Gemini AI', '📄 PDF to Portfolio'].map((text, i) => (
                            <span key={i} className="landing-marquee-item">{text}</span>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {['AI-Powered', '⚡ Instant Generation', '🎯 Recruiter-Ready', '🌐 One-Click Publish', '🎨 Premium Themes', '🔒 Privacy First', '✨ Gemini AI', '📄 PDF to Portfolio'].map((text, i) => (
                            <span key={`dup-${i}`} className="landing-marquee-item">{text}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="landing-features-section" id="features">
                <div className="landing-section-header animate-fade-up">
                    <span className="landing-section-badge">Features</span>
                    <h2 className="landing-section-title">
                        Everything You Need to{' '}
                        <span className="landing-gradient-text">Stand Out</span>
                    </h2>
                    <p className="landing-section-subtitle">
                        Powerful AI tools that transform your resume into a portfolio that gets you noticed.
                    </p>
                </div>

                <div className="landing-features-grid">
                    {features.map((feat, i) => (
                        <div
                            key={i}
                            className={`landing-feature-card animate-fade-up delay-${(i % 3 + 1) * 100}`}
                            onMouseEnter={() => setHoveredFeature(i)}
                            onMouseLeave={() => setHoveredFeature(null)}
                        >
                            <div className="landing-feature-icon-wrap" style={{
                                background: hoveredFeature === i ? feat.gradient : (isDark ? '#1e293b' : '#f1f5f9'),
                                color: hoveredFeature === i ? '#fff' : (isDark ? '#94a3b8' : '#64748b'),
                            }}>
                                {featureIcons[feat.icon]}
                            </div>
                            <h3 className="landing-feature-title">{feat.title}</h3>
                            <p className="landing-feature-desc">{feat.desc}</p>
                            <div className="landing-feature-line" style={{
                                background: feat.gradient,
                                transform: hoveredFeature === i ? 'scaleX(1)' : 'scaleX(0)',
                            }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="landing-steps-section" id="how-it-works">
                <div className="landing-section-header animate-fade-up">
                    <span className="landing-section-badge">Process</span>
                    <h2 className="landing-section-title">
                        Three Steps to Your{' '}
                        <span className="landing-gradient-text">Dream Portfolio</span>
                    </h2>
                    <p className="landing-section-subtitle">
                        From PDF to published portfolio in under a minute.
                    </p>
                </div>

                <div className="landing-steps-row">
                    {steps.map((step, i) => (
                        <div key={i} className={`landing-step-card animate-fade-up delay-${(i + 1) * 200}`}>
                            <div className="landing-step-num">{step.num}</div>
                            <div className="landing-step-icon">{step.icon}</div>
                            <h3 className="landing-step-title">{step.title}</h3>
                            <p className="landing-step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── LIVE STATS ─── */}
            <section className="landing-stats-section" id="stats">
                <div className="landing-section-header animate-fade-up">
                    <span className="landing-section-badge">
                        <span className="landing-live-dot" style={{ marginRight: 6 }} />
                        Live Stats
                    </span>
                    <h2 className="landing-section-title">
                        Real Numbers,{' '}
                        <span className="landing-gradient-text">Real Impact</span>
                    </h2>
                    <p className="landing-section-subtitle">
                        These numbers update in real-time as people use ResumeForge.
                    </p>
                </div>

                <div className="landing-stats-grid">
                    <div className="landing-stat-card" ref={stat1.ref}>
                        <div className="landing-stat-live-indicator">
                            <span className="landing-live-dot" /> LIVE
                        </div>
                        <span className="landing-stat-number">{stat1.count.toLocaleString()}</span>
                        <span className="landing-stat-label">Users Joined</span>
                    </div>
                    <div className="landing-stat-card" ref={stat2.ref}>
                        <div className="landing-stat-live-indicator">
                            <span className="landing-live-dot" /> LIVE
                        </div>
                        <span className="landing-stat-number">{stat2.count.toLocaleString()}</span>
                        <span className="landing-stat-label">Portfolios Created</span>
                    </div>
                    <div className="landing-stat-card">
                        <div className="landing-stat-live-indicator" style={{ opacity: 0.5 }}>
                            ⚡ BENCHMARK
                        </div>
                        <span className="landing-stat-number">&lt;30s</span>
                        <span className="landing-stat-label">Avg. Generation Time</span>
                    </div>
                </div>
            </section>

            {/* ─── INTERACTIVE SHOWCASE ─── */}
            <section className="landing-showcase-section">
                <div className="landing-section-header animate-fade-up">
                    <span className="landing-section-badge">Showcase</span>
                    <h2 className="landing-section-title">
                        Beautiful Portfolios,{' '}
                        <span className="landing-gradient-text">Every Time</span>
                    </h2>
                    <p className="landing-section-subtitle">
                        Each portfolio is uniquely crafted with premium themes, animations, and responsive design.
                    </p>
                </div>
                <div className="landing-showcase-grid animate-fade-up delay-200">
                    {[
                        { label: 'Gradient Wave', color: '#10b981', desc: 'Flowing gradients & modern curves' },
                        { label: 'Dark Minimal', color: '#8b5cf6', desc: 'Clean, sophisticated dark mode' },
                        { label: 'Creative Bold', color: '#f43f5e', desc: 'Eye-catching & vibrant design' },
                    ].map((theme, i) => (
                        <div key={i} className="landing-showcase-card">
                            <div className="landing-showcase-preview" style={{
                                background: `linear-gradient(160deg, ${theme.color}11, ${theme.color}22)`,
                                borderTop: `3px solid ${theme.color}`,
                            }}>
                                <div style={{ padding: 16 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: theme.color, marginBottom: 10 }} />
                                    <div style={{ height: 8, width: '60%', borderRadius: 4, background: isDark ? '#334155' : '#e2e8f0', marginBottom: 6 }} />
                                    <div style={{ height: 6, width: '40%', borderRadius: 3, background: isDark ? '#1e293b' : '#f1f5f9' }} />
                                    <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
                                        {[1, 2, 3].map((_, j) => (
                                            <div key={j} style={{ height: 20, borderRadius: 4, flex: 1, background: isDark ? '#1e293b' : '#f1f5f9', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="landing-showcase-info">
                                <span className="landing-showcase-label">{theme.label}</span>
                                <span className="landing-showcase-desc">{theme.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="landing-final-cta">
                <div className="landing-final-cta-inner animate-fade-up">
                    <h2 className="landing-final-cta-title">
                        Ready to Build Your Portfolio?
                    </h2>
                    <p className="landing-final-cta-text">
                        Join {liveStats.userCount > 0 ? `${liveStats.userCount.toLocaleString()} professionals` : 'professionals'} who've transformed their careers with ResumeForge.
                    </p>
                    <button onClick={handleSignIn} className="landing-cta-primary landing-cta-white" id="final-cta-btn">
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Start Building — It's Free
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="landing-footer">
                <div className="landing-footer-inner">
                    <div className="landing-footer-brand">
                        <div className="landing-logo" style={{ width: 32, height: 32 }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>ResumeForge</span>
                    </div>
                    <div className="landing-footer-links">
                        <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
                        <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>How it Works</a>
                        <a href="#stats" onClick={(e) => { e.preventDefault(); document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }); }}>Live Stats</a>
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                    <p className="landing-footer-copy">
                        © {new Date().getFullYear()} ResumeForge. Crafted with AI.
                    </p>
                </div>
            </footer>
        </div>
    );
}
