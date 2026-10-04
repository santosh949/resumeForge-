import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getPortfolio } from '../services/portfolioStore';
import PortfolioRenderer from '../templates/PortfolioRenderer';
import PortfolioNavbar from '../components/PortfolioNavbar';

export default function PublishedPortfolio() {
    const { slug } = useParams();
    const { isDark } = useTheme();
    const [data, setData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [recruiterMode, setRecruiterMode] = useState(false);

    useEffect(() => {
        async function loadPortfolio() {
            try {
                const portfolio = await getPortfolio(slug);
                if (portfolio) {
                    setData(portfolio);
                } else {
                    setNotFound(true);
                }
            } catch (err) {
                console.error('Failed to load portfolio:', err);
                setNotFound(true);
            }
        }
        loadPortfolio();
    }, [slug]);

    if (notFound) {
        return (
            <div style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: isDark ? '#0f172a' : '#f8fafc', color: isDark ? '#e2e8f0' : '#0f172a', padding: '2rem',
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔍</div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: "'Outfit', sans-serif" }}>
                    Portfolio Not Found
                </h1>
                <p style={{ color: isDark ? '#94a3b8' : '#64748b', marginBottom: '2rem' }}>
                    This portfolio doesn't exist or may have been removed.
                </p>
                <a href="#/" style={{
                    padding: '0.75rem 2rem', borderRadius: '12px', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: 600,
                }}>
                    Go to ResumeForge
                </a>
            </div>
        );
    }

    if (!data) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? '#0f172a' : '#f8fafc' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #10b981', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div>
            <PortfolioNavbar
                recruiterMode={recruiterMode}
                setRecruiterMode={setRecruiterMode}
                isPreview={false}
            />

            <PortfolioRenderer data={data} themeId={data.theme || 'bold-minimal'} recruiterMode={recruiterMode} />
        </div>
    );
}
