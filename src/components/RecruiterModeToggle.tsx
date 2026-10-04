import { useTheme } from '../context/ThemeContext';

export default function RecruiterModeToggle({ enabled, onToggle }) {
    const { isDark } = useTheme();

    return (
        <button
            onClick={onToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
                background: enabled
                    ? 'rgba(16,185,129,0.15)'
                    : (isDark ? 'rgba(51,65,85,0.5)' : 'rgba(241,245,249,0.8)'),
                border: `1px solid ${enabled ? 'rgba(16,185,129,0.3)' : (isDark ? '#475569' : '#e2e8f0')}`,
                color: enabled ? '#10b981' : (isDark ? '#94a3b8' : '#64748b'),
            }}
            id="recruiter-mode-toggle">
            {/* Toggle track */}
            <div className="relative w-8 h-[18px] rounded-full transition-colors duration-200"
                style={{ background: enabled ? '#10b981' : (isDark ? '#475569' : '#cbd5e1') }}>
                <div className="absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200"
                    style={{ transform: enabled ? 'translateX(16px)' : 'translateX(2px)' }} />
            </div>
            <span className="hidden sm:inline">Recruiter Mode</span>
            <span className="sm:hidden">🎯</span>
        </button>
    );
}
