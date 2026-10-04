import { useTheme } from '../context/ThemeContext';

export default function ProjectsSection({ projects, recruiterMode }) {
    const { isDark } = useTheme();

    if (!projects?.length) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
                <div key={i}
                    className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-3px] group animate-fade-up"
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
                        style={{ background: 'linear-gradient(90deg, #10b981, #34d399, transparent)' }} />

                    {/* Hover glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                        }} />

                    <div className="flex items-start justify-between mb-3 relative">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-family-display)' }}>
                                {project.name}
                            </h3>
                        </div>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                                style={{
                                    background: isDark ? 'rgba(51,65,85,0.5)' : 'rgba(241,245,249,0.8)',
                                    border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
                                    color: isDark ? '#94a3b8' : '#64748b',
                                }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        )}
                    </div>

                    {project.description && (
                        <p className="text-sm mb-4 leading-relaxed relative"
                            style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                            {project.description}
                        </p>
                    )}

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 relative">
                            {project.technologies.map((tech, j) => (
                                <span key={j} className="text-xs px-2.5 py-1.5 rounded-lg font-semibold"
                                    style={{
                                        background: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)',
                                        color: '#10b981',
                                        border: '1px solid rgba(16,185,129,0.2)',
                                    }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Highlights */}
                    {project.highlights?.length > 0 && (
                        <ul className="space-y-2 relative">
                            {project.highlights.map((h, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-sm"
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
                </div>
            ))}
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
