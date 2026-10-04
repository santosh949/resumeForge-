import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { onStatsSnapshot } from '../services/statsService';
import ThemeToggle from '../components/ThemeToggle';

/* ─── Floating Particles (same as landing page) ─── */
function ParticleField({ isDark }) {
    return (
        <div className="upload-particles">
            {Array.from({ length: 20 }).map((_, i) => (
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

/* ─── Animated upload icon ─── */
function UploadVisual({ isDark, isActive }) {
    return (
        <div className={`upload-visual ${isActive ? 'upload-visual-active' : ''}`}>
            <div className="upload-visual-ring upload-visual-ring-1" />
            <div className="upload-visual-ring upload-visual-ring-2" />
            <div className="upload-visual-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                    stroke={isActive ? '#10b981' : (isDark ? '#94a3b8' : '#64748b')}
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
            </div>
        </div>
    );
}

/* ─── Feature Tip Cards ─── */
const tips = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        title: 'Instant Generation',
        desc: 'AI builds your portfolio in under 30 seconds',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
            </svg>
        ),
        title: 'Recruiter Optimized',
        desc: 'Highlights what recruiters actually look for',
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        title: 'Privacy First',
        desc: 'Your data is processed securely, nothing stored',
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    },
];

export default function UploadPage() {
    const { user, signOut } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [hoveredTip, setHoveredTip] = useState(null);
    const [liveStats, setLiveStats] = useState({ userCount: 0, portfoliosCreated: 0 });

    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate]);

    // Real-time stats
    useEffect(() => {
        const unsub = onStatsSnapshot((stats) => setLiveStats(stats));
        return () => unsub();
    }, []);

    const validateFile = (file) => {
        if (!file) return 'No file selected';
        if (file.type !== 'application/pdf') return 'Only PDF files are supported';
        if (file.size > 10 * 1024 * 1024) return 'File must be under 10MB';
        return null;
    };

    const handleFile = (file) => {
        const err = validateFile(file);
        if (err) { setError(err); setSelectedFile(null); return; }
        setError('');
        setSelectedFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    const handleInputChange = (e) => {
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };

    const handleGenerate = () => {
        if (!selectedFile) return;
        navigate('/loading', { state: { file: selectedFile } });
    };

    return (
        <div className="upload-root" data-theme={isDark ? 'dark' : 'light'}>
            <ParticleField isDark={isDark} />

            {/* ─── Gradient Orbs ─── */}
            <div className="landing-orbs">
                <div className="landing-orb landing-orb-1" />
                <div className="landing-orb landing-orb-2" />
                <div className="landing-orb landing-orb-3" />
            </div>

            {/* ─── Premium Navbar ─── */}
            <nav className="upload-nav">
                <div className="upload-nav-inner">
                    <div className="upload-nav-brand" onClick={() => navigate('/')}>
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

                    {/* Live Stats Mini Badge */}
                    <div className="upload-stats-mini">
                        <div className="upload-stats-mini-item">
                            <span className="landing-live-dot" />
                            <span><strong>{liveStats.userCount.toLocaleString()}</strong> users</span>
                        </div>
                        <div className="upload-stats-mini-divider" />
                        <div className="upload-stats-mini-item">
                            <span><strong>{liveStats.portfoliosCreated.toLocaleString()}</strong> portfolios</span>
                        </div>
                    </div>

                    <div className="upload-nav-actions">
                        <button onClick={() => navigate('/dashboard')} className="landing-cta-secondary" style={{ padding: '8px 16px', background: isDark ? 'var(--color-slate-800)' : 'white' }}>
                            My Portfolios
                        </button>
                        <ThemeToggle />
                        {user && (
                            <div className="upload-user-section">
                                <img src={user.photoURL} alt=""
                                    className="upload-user-avatar" />
                                <button onClick={signOut} className="upload-signout-btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* ─── Main Content ─── */}
            <main className="upload-main">
                {/* Header */}
                <div className="upload-header animate-fade-up">
                    <div className="landing-badge" style={{ marginBottom: 20 }}>
                        <span className="landing-badge-dot" />
                        <span>AI-Powered Portfolio Generator</span>
                    </div>
                    <h1 className="upload-title">
                        Upload Your <span className="landing-gradient-text">Resume</span>
                    </h1>
                    <p className="upload-subtitle">
                        Drop your PDF resume and watch AI create a stunning portfolio in seconds
                    </p>
                </div>

                {/* ─── Drop Zone ─── */}
                <div
                    className={`upload-dropzone animate-fade-up delay-200 ${dragActive ? 'upload-dropzone-active' : ''} ${selectedFile ? 'upload-dropzone-ready' : ''}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {/* Animated border */}
                    <div className="upload-dropzone-border" />

                    <input ref={fileInputRef} type="file" accept=".pdf"
                        style={{ display: 'none' }} onChange={handleInputChange} id="pdf-upload-input" />

                    {selectedFile ? (
                        <div className="upload-file-info animate-fade-in">
                            <div className="upload-file-check">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <p className="upload-file-name">{selectedFile.name}</p>
                            <p className="upload-file-size">{(selectedFile.size / 1024).toFixed(1)} KB · PDF</p>
                            <span className="upload-file-change">Ready to generate · Click to change file</span>
                        </div>
                    ) : (
                        <div className="upload-empty-state">
                            <UploadVisual isDark={isDark} isActive={dragActive} />
                            <p className="upload-empty-title">
                                {dragActive ? 'Drop it right here!' : 'Drag & drop your resume'}
                            </p>
                            <p className="upload-empty-hint">
                                or click to browse · PDF only · Max 10MB
                            </p>
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="upload-error animate-fade-in">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={!selectedFile}
                    id="generate-portfolio-btn"
                    className={`upload-generate-btn animate-fade-up delay-300 ${selectedFile ? 'upload-generate-btn-ready' : ''}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Generate Portfolio
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>

                {/* ─── Tip Cards ─── */}
                <div className="upload-tips animate-fade-up delay-400">
                    {tips.map((tip, i) => (
                        <div key={i} className="upload-tip-card"
                            onMouseEnter={() => setHoveredTip(i)}
                            onMouseLeave={() => setHoveredTip(null)}>
                            <div className="upload-tip-icon" style={{
                                background: hoveredTip === i ? tip.gradient : (isDark ? '#1e293b' : '#f1f5f9'),
                                color: hoveredTip === i ? '#fff' : (isDark ? '#94a3b8' : '#64748b'),
                            }}>
                                {tip.icon}
                            </div>
                            <div>
                                <p className="upload-tip-title">{tip.title}</p>
                                <p className="upload-tip-desc">{tip.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

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
