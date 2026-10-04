import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function PrivacyPolicy() {
    const { isDark } = useTheme();

    return (
        <div className="landing-root" data-theme={isDark ? 'dark' : 'light'} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Minimal Navbar */}
            <nav className="landing-nav" style={{ position: 'relative', borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, background: isDark ? '#0f172a' : '#ffffff' }}>
                <div className="landing-nav-inner">
                    <Link to="/" className="landing-nav-brand" style={{ textDecoration: 'none' }}>
                        <div className="landing-logo">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <span className="landing-brand-text">ResumeForge</span>
                    </Link>
                    <div className="landing-nav-actions">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main style={{ flex: 1, position: 'relative', zIndex: 1, padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: isDark ? '#1e293b' : '#ffffff', padding: '3rem', borderRadius: '16px', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: isDark ? '#f8fafc' : '#0f172a' }}>Privacy Policy</h1>

                    <div style={{ color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p>Effective Date: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '1rem', marginTop: '2rem' }}>1. Information We Collect</h2>
                            <p>We process information from the resumes you upload (PDFs) solely for the purpose of generating your portfolio website. This includes text, contact information, work experience, and education history.</p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>2. How We Use Information</h2>
                            <p>The information extracted by our AI (Google Gemini) is used exclusively to assemble your portfolio UI. We do not sell, rent, or use your resume data for any secondary purposes.</p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>3. Data Storage & Security</h2>
                            <p>All portfolio data is securely stored in our managed database (Firebase/Firestore). When you publish a portfolio, the data required to display that portfolio is stored. You have the right to request deletion of your account and associated portfolios at any time.</p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>4. AI Processing</h2>
                            <p>We utilize third-party AI APIs (Google) to parse your resume. The uploaded files are temporarily processed by these services strictly to categorize the data into sections like "Experience," "Skills," and "Summary," and then discarded.</p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>5. Contact Us</h2>
                            <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at privacy@resumeforge.dev.</p>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="landing-footer" style={{ borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, background: isDark ? '#0f172a' : '#ffffff', padding: '2rem' }}>
                <div className="landing-footer-inner" style={{ justifyContent: 'center' }}>
                    <p className="landing-footer-copy">
                        © {new Date().getFullYear()} ResumeForge. Crafted with AI.
                    </p>
                </div>
            </footer>
        </div>
    );
}
