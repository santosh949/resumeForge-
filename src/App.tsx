import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import LoadingPage from './pages/LoadingPage';
import ContentEditorPage from './pages/ContentEditorPage';
import PortfolioPage from './pages/PortfolioPage';
import PublishedPortfolio from './pages/PublishedPortfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DashboardPage from './pages/DashboardPage';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/edit-content" element={<ContentEditorPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/p/:slug" element={<PublishedPortfolio />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </HashRouter>
    );
}
