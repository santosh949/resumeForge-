import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { generateUniqueSlug, savePortfolio, isSlugAvailable, slugify } from '../services/portfolioStore';
import { onStatsSnapshot } from '../services/statsService';
import { getRandomThemeId, getTheme } from '../templates/themes';
import PortfolioRenderer from '../templates/PortfolioRenderer';
import PortfolioNavbar from '../components/PortfolioNavbar';
import AIAssistant from '../components/AIAssistant';
import ColorCustomizer from '../components/ColorCustomizer';

export default function PortfolioPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isDark } = useTheme();
    const [recruiterMode, setRecruiterMode] = useState(false);
    const [publishedSlug, setPublishedSlug] = useState('');
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [themeId, setThemeId] = useState('');
    const [liveStats, setLiveStats] = useState({ userCount: 0, portfoliosCreated: 0 });

    const data = location.state?.portfolioData;
    const [slugCandidate, setSlugCandidate] = useState('');
    const [slugStatus, setSlugStatus] = useState('idle'); // idle, checking, available, taken
    const [isPrePublishModalOpen, setIsPrePublishModalOpen] = useState(false);
    const [customAccent, setCustomAccent] = useState(null);

    // Assign random theme on mount
    useEffect(() => {
        setThemeId(getRandomThemeId());
    }, []);

    useEffect(() => {
        if (!data) navigate('/upload');
    }, [data, navigate]);

    // Initialize slug candidate
    useEffect(() => {
        if (data?.bio?.name || user?.displayName) {
            const name = data.bio?.name || user?.displayName;
            setSlugCandidate(slugify(name));
        } else {
            setSlugCandidate('portfolio');
        }
    }, [data, user]);

    // Validate slug availability
    useEffect(() => {
        if (!slugCandidate) return;

        const timer = setTimeout(async () => {
            setSlugStatus('checking');
            const available = await isSlugAvailable(slugCandidate);
            setSlugStatus(available ? 'available' : 'taken');
        }, 500);

        return () => clearTimeout(timer);
    }, [slugCandidate]);

    // Real-time stats
    useEffect(() => {
        const unsub = onStatsSnapshot((stats) => setLiveStats(stats));
        return () => unsub();
    }, []);

    if (!data || !themeId) return null;

    const currentTheme = getTheme(themeId);

    const handlePublish = async () => {
        if (slugStatus !== 'available') {
            alert('Please choose a unique and valid link suffix.');
            return;
        }

        setPublishing(true);
        try {
            await savePortfolio(slugCandidate, {
                ...data,
                themeId,
                userId: user?.uid,
                userPhoto: user?.photoURL,
            });

            setPublishedSlug(slugCandidate);
            setIsPrePublishModalOpen(false);
            setShowPublishModal(true);
        } catch (err) {
            console.error('Publish failed:', err);
            alert('Publishing failed. Please try again.');
        } finally {
            setPublishing(false);
        }
    };

    const publishedUrl = `${window.location.origin}${window.location.pathname}#/p/${publishedSlug}`;

    const copyUrl = () => {
        navigator.clipboard.writeText(publishedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            {/* ─── Premium Mobile Dock Wrapper ─── */}
            <div className="portfolio-dock">
                {/* ─── Premium Floating Controls Bar ─── */}
                <PortfolioNavbar
                    themeId={themeId}
                    setThemeId={setThemeId}
                    recruiterMode={recruiterMode}
                    setRecruiterMode={setRecruiterMode}
                    publishing={publishing}
                    onPublish={() => setIsPrePublishModalOpen(true)}
                    isPreview={true}
                    liveStats={liveStats}
                    onBack={() => navigate('/upload')}
                />

                {/* ─── Color Customizer ─── */}
                <ColorCustomizer currentAccent={customAccent} onAccentChange={setCustomAccent} isDark={isDark} />
            </div>

            {/* ─── Render the themed portfolio ─── */}
            <PortfolioRenderer data={data} themeId={themeId} recruiterMode={recruiterMode} customAccent={customAccent} />

            {/* ─── Pre-Publish Modal: Choose your Link ─── */}
            {isPrePublishModalOpen && (
                <div className="portfolio-modal-overlay" onClick={() => setIsPrePublishModalOpen(false)}>
                    <div className="portfolio-modal" data-theme={isDark ? 'dark' : 'light'} onClick={e => e.stopPropagation()}>
                        <div className="portfolio-modal-emoji">📎</div>
                        <h3 className="portfolio-modal-title">Customize your Link</h3>
                        <p className="portfolio-modal-desc">
                            Make your portfolio professional with a custom URL.
                        </p>

                        <div className="slug-editor-container">
                            <label className="slug-editor-label">Your Professional Link</label>
                            <div className="slug-input-group">
                                <span className="slug-prefix">resumeforge.com/#/p/</span>
                                <input
                                    type="text"
                                    value={slugCandidate}
                                    onChange={(e) => setSlugCandidate(slugify(e.target.value))}
                                    placeholder="your-name"
                                    className="slug-input"
                                />
                            </div>

                            {slugCandidate && (
                                <div className={`slug-status ${slugStatus}`}>
                                    {slugStatus === 'checking' && '⏳ Checking availability...'}
                                    {slugStatus === 'available' && '✅ This link is available!'}
                                    {slugStatus === 'taken' && '❌ This link is already taken.'}
                                </div>
                            )}
                        </div>

                        <div className="portfolio-modal-actions">
                            <button
                                onClick={handlePublish}
                                disabled={publishing || slugStatus !== 'available'}
                                className="portfolio-modal-btn-primary">
                                {publishing ? 'Publishing...' : '🚀 Finalize & Publish'}
                            </button>
                            <button
                                onClick={() => setIsPrePublishModalOpen(false)}
                                className="portfolio-modal-btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Success Publish Modal ─── */}
            {showPublishModal && (
                <div className="portfolio-modal-overlay" onClick={() => setShowPublishModal(false)}>
                    <div className="portfolio-modal" data-theme={isDark ? 'dark' : 'light'} onClick={e => e.stopPropagation()}>
                        <div className="portfolio-modal-emoji">🎉</div>
                        <h3 className="portfolio-modal-title">Portfolio Published!</h3>
                        <p className="portfolio-modal-desc">
                            Your portfolio is live and ready to share with the world
                        </p>

                        <div className="portfolio-modal-url-box">
                            <input
                                type="text"
                                value={publishedUrl}
                                readOnly
                                className="portfolio-modal-url-input"
                            />
                            <button
                                onClick={copyUrl}
                                className={`portfolio-modal-copy-btn ${copied ? 'copied' : ''}`}>
                                {copied ? '✓ Copied!' : 'Copy'}
                            </button>
                        </div>

                        <div className="portfolio-modal-actions">
                            <button
                                onClick={() => window.open(`#/p/${publishedSlug}`, '_blank')}
                                className="portfolio-modal-btn-primary">
                                🔗 View Live
                            </button>
                            <button
                                onClick={() => setShowPublishModal(false)}
                                className="portfolio-modal-btn-secondary">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Career Assistant */}
            <AIAssistant resumeData={data} isDark={isDark} />
        </div>
    );
}
