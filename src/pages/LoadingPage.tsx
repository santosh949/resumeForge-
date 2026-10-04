import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { extractTextFromPDF } from '../services/pdfParser';
import { categorizeResume } from '../services/aiCategorizer';
import { incrementPortfolioCount } from '../services/statsService';

const STEPS = [
    { text: 'Extracting your impact...', icon: '📄' },
    { text: 'Analyzing your experience...', icon: '🔍' },
    { text: 'Designing your layout...', icon: '🎨' },
    { text: 'Optimizing for recruiters...', icon: '🚀' },
    { text: 'Adding finishing touches...', icon: '✨' },
];

export default function LoadingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const processingRef = useRef(false);

    useEffect(() => {
        if (!location.state?.file) {
            navigate('/upload');
            return;
        }

        if (processingRef.current) return;
        processingRef.current = true;

        const processResume = async () => {
            try {
                // Step 1: Extract text
                setCurrentStep(0);
                setProgress(15);
                const rawText = await extractTextFromPDF(location.state.file);

                if (!rawText || rawText.trim().length < 50) {
                    throw new Error('Could not extract enough text from the PDF. Please make sure it\'s not image-based.');
                }

                // Step 2: Analyze
                setCurrentStep(1);
                setProgress(35);

                // Step 3: Design
                setCurrentStep(2);
                setProgress(55);
                const portfolioData = await categorizeResume(rawText);

                // Step 4: Optimize
                setCurrentStep(3);
                setProgress(75);
                await new Promise(r => setTimeout(r, 800));

                // Step 5: Finish
                setCurrentStep(4);
                setProgress(95);
                await new Promise(r => setTimeout(r, 600));

                setProgress(100);
                await new Promise(r => setTimeout(r, 400));

                // Increment the global portfolio counter
                await incrementPortfolioCount();

                // Navigate to content editor for review before generating portfolio
                navigate('/edit-content', { state: { portfolioData }, replace: true });
            } catch (err) {
                console.error('Processing error:', err);
                setError(err.message || 'Something went wrong. Please try again.');
            }
        };

        processResume();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: isDark ? 'var(--color-slate-950)' : 'var(--color-slate-50)' }}>
            {error ? (
                <div style={{ textAlign: 'center', maxWidth: '400px', animation: 'fade-up 0.5s ease-out' }}>
                    <div style={{ width: '80px', height: '80px', margin: '0 auto 24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', fontFamily: 'var(--font-family-display)' }}>
                        Oops, something went wrong
                    </h2>
                    <p style={{ marginBottom: '32px', color: isDark ? '#94a3b8' : '#64748b', lineHeight: '1.5' }}>
                        {error}
                    </p>
                    <button onClick={() => navigate('/upload')} className="btn-primary" style={{ padding: '12px 32px' }}>
                        Try Again
                    </button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', maxWidth: '500px', width: '100%', animation: 'fade-up 0.5s ease-out' }}>
                    {/* Animated orb */}
                    <div style={{ position: 'relative', width: '128px', height: '128px', margin: '0 auto 40px' }}>
                        <div style={{ position: 'absolute', inset: '0', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #34d399)' }} className="animate-pulse" />
                        <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? '#0f172a' : '#f8fafc', zIndex: 2 }}>
                            <span style={{ fontSize: '2.5rem' }} className="animate-bounce">{STEPS[currentStep]?.icon}</span>
                        </div>
                        {/* Spinning ring */}
                        <div className="animate-spin" style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#10b981', borderRightColor: '#34d399', zIndex: 1 }} />
                    </div>

                    {/* Status text */}
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '12px', fontFamily: 'var(--font-family-display)' }}>
                        Creating your portfolio
                    </h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '32px', color: '#10b981', fontWeight: 600, transition: 'all 0.5s ease' }}>
                        {STEPS[currentStep]?.text}
                    </p>

                    {/* Progress bar */}
                    <div style={{ width: '100%', maxWidth: '320px', margin: '0 auto', height: '8px', borderRadius: '999px', overflow: 'hidden', background: isDark ? '#1e293b' : '#e2e8f0' }}>
                        <div style={{ height: '100%', borderRadius: '999px', transition: 'width 0.7s ease-out', width: `${progress}%`, background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                    </div>

                    {/* Steps indicator */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                        {STEPS.map((_, i) => (
                            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', transition: 'all 0.3s ease', background: i <= currentStep ? '#10b981' : (isDark ? '#334155' : '#cbd5e1'), transform: i === currentStep ? 'scale(1.4)' : 'scale(1)' }} />
                        ))}
                    </div>

                    <p style={{ marginTop: '32px', fontSize: '0.75rem', color: isDark ? '#475569' : '#94a3b8' }}>
                        Powered by AI · This usually takes 10–20 seconds
                    </p>
                </div>
            )}
        </div>
    );
}
