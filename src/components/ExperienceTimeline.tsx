import { useTheme } from '../context/ThemeContext';

export default function ExperienceTimeline({ experiences, recruiterMode }) {
    const { isDark } = useTheme();

    if (!experiences?.length) return null;

    return (
        <div className="relative">
            {/* Timeline line with gradient */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px]"
                style={{
                    background: `linear-gradient(180deg, #10b981 0%, ${isDark ? '#1e293b' : '#e2e8f0'} 100%)`,
                }} />

            <div className="space-y-6">
                {experiences.map((exp, i) => (
                    <div key={i} className="relative pl-16 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                        {/* Timeline dot with glow */}
                        <div className="absolute left-[15px] top-8 z-10">
                            <div className="w-[14px] h-[14px] rounded-full border-[3px] shadow-lg"
                                style={{
                                    borderColor: '#10b981',
                                    background: isDark ? '#0f172a' : '#f8fafc',
                                    boxShadow: '0 0 12px rgba(16,185,129,0.4)',
                                }} />
                        </div>

                        {/* Card */}
                        <div className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group"
                            style={{
                                background: isDark
                                    ? 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(22,32,50,0.9))'
                                    : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.95))',
                                border: `1px solid ${isDark ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,0.8)'}`,
                                boxShadow: isDark
                                    ? '0 4px 24px rgba(0,0,0,0.2)'
                                    : '0 4px 24px rgba(0,0,0,0.04)',
                            }}>

                            {/* Accent bar at top */}
                            <div className="absolute top-0 left-0 right-0 h-[2px]"
                                style={{ background: 'linear-gradient(90deg, #10b981, #34d399, transparent)' }} />

                            {/* Hover glow effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
                                }} />

                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 relative">
                                <div>
                                    <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-family-display)' }}>
                                        {exp.role}
                                    </h3>
                                    <p className="font-semibold text-transparent bg-clip-text"
                                        style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                        {exp.company}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                                    style={{
                                        background: isDark ? 'rgba(51,65,85,0.5)' : 'rgba(241,245,249,0.8)',
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                                    }}>
                                    {exp.duration && <span>{exp.duration}</span>}
                                    {exp.location && (
                                        <>
                                            <span>·</span>
                                            <span>{exp.location}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Highlights */}
                            {exp.highlights?.length > 0 && (
                                <ul className="space-y-2.5 mt-4">
                                    {exp.highlights.map((h, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm leading-relaxed"
                                            style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                                            <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                                                style={{
                                                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                                                    boxShadow: '0 0 6px rgba(16,185,129,0.3)',
                                                }} />
                                            <span>{recruiterMode ? highlightMetrics(h) : h}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Keywords (recruiter mode) */}
                            {recruiterMode && exp.keywords?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-5 pt-4"
                                    style={{ borderTop: `1px solid ${isDark ? 'rgba(51,65,85,0.4)' : 'rgba(241,245,249,0.8)'}` }}>
                                    {exp.keywords.map((kw, j) => (
                                        <span key={j} className="recruiter-highlight text-xs px-3 py-1.5 rounded-lg font-semibold"
                                            style={{
                                                background: 'rgba(16,185,129,0.12)',
                                                border: '1px solid rgba(16,185,129,0.2)',
                                            }}>
                                            ✨ {kw}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function highlightMetrics(text) {
    const parts = text.split(/(\$[\d,.]+[KMBkmb]?|\d+[%+]|\d+x)/g);
    return parts.map((part, i) =>
        /^\$[\d,.]+[KMBkmb]?$|^\d+[%+]$|^\d+x$/.test(part)
            ? <span key={i} className="recruiter-highlight">{part}</span>
            : part
    );
}
