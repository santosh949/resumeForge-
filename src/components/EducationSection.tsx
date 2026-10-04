import { useTheme } from '../context/ThemeContext';

export default function EducationSection({ education, recruiterMode }) {
    const { isDark } = useTheme();

    if (!education?.length) return null;

    return (
        <div className="space-y-5">
            {education.map((edu, i) => (
                <div key={i}
                    className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group animate-fade-up"
                    style={{
                        animationDelay: `${i * 100}ms`,
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(22,32,50,0.9))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.95))',
                        border: `1px solid ${isDark ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,0.8)'}`,
                        boxShadow: isDark
                            ? '0 4px 24px rgba(0,0,0,0.15)'
                            : '0 4px 24px rgba(0,0,0,0.04)',
                    }}>

                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: 'linear-gradient(90deg, #8b5cf6, #a78bfa, transparent)' }} />

                    {/* Hover glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                        }} />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 relative">
                        <div className="flex items-start gap-4">
                            {/* Education icon */}
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-family-display)' }}>
                                    {edu.institution}
                                </h3>
                                <p className="font-semibold text-transparent bg-clip-text"
                                    style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }}>
                                    {edu.degree}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {edu.year && (
                                <span className="text-xs font-medium px-3 py-1.5 rounded-full"
                                    style={{
                                        background: isDark ? 'rgba(51,65,85,0.5)' : 'rgba(241,245,249,0.8)',
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                                    }}>
                                    {edu.year}
                                </span>
                            )}
                            {edu.gpa && (
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${recruiterMode ? 'recruiter-highlight' : ''}`}
                                    style={!recruiterMode ? {
                                        background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)',
                                        color: '#8b5cf6',
                                        border: '1px solid rgba(139,92,246,0.2)',
                                    } : undefined}>
                                    GPA: {edu.gpa}
                                </span>
                            )}
                        </div>
                    </div>

                    {edu.highlights?.length > 0 && (
                        <ul className="mt-4 space-y-2 relative">
                            {edu.highlights.map((h, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-sm"
                                    style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
                                    <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                                        style={{
                                            background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                                            boxShadow: '0 0 6px rgba(139,92,246,0.3)',
                                        }} />
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
