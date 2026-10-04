import { useTheme } from '../context/ThemeContext';

const CATEGORY_COLORS = [
    { gradient: 'linear-gradient(135deg, #10b981, #059669)', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)' },
    { gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.15)' },
    { gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.15)' },
    { gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)' },
    { gradient: 'linear-gradient(135deg, #ec4899, #db2777)', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.15)' },
    { gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.15)' },
];

export default function SkillsGrid({ skills, recruiterMode }) {
    const { isDark } = useTheme();

    if (!skills?.length) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((group, i) => {
                const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                return (
                    <div key={i}
                        className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl group animate-fade-up"
                        style={{
                            animationDelay: `${i * 80}ms`,
                            background: isDark
                                ? 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(22,32,50,0.9))'
                                : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.95))',
                            border: `1px solid ${isDark ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,0.8)'}`,
                        }}>

                        {/* Top gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-[3px]"
                            style={{ background: color.gradient }} />

                        {/* Background glow on hover */}
                        <div className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(circle, ${color.bg} 0%, transparent 70%)`,
                                filter: 'blur(20px)',
                            }} />

                        {/* Category icon */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                            style={{ background: color.gradient }}>
                            <span className="text-white text-lg font-bold">
                                {group.category?.charAt(0) || '?'}
                            </span>
                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4"
                            style={{ fontFamily: 'var(--font-family-display)', color: isDark ? '#e2e8f0' : '#334155' }}>
                            {group.category}
                        </h3>
                        <div className="flex flex-wrap gap-2 relative">
                            {group.items?.map((skill, j) => (
                                <span key={j}
                                    className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:scale-[1.05] ${recruiterMode ? 'recruiter-highlight' : ''
                                        }`}
                                    style={!recruiterMode ? {
                                        background: isDark ? 'rgba(51,65,85,0.5)' : 'rgba(241,245,249,0.9)',
                                        color: isDark ? '#cbd5e1' : '#475569',
                                        border: `1px solid ${isDark ? 'rgba(71,85,105,0.4)' : 'rgba(226,232,240,0.8)'}`,
                                    } : undefined}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Skill count badge */}
                        <div className="absolute bottom-4 right-4 text-xs font-bold px-2 py-1 rounded-full"
                            style={{
                                background: isDark ? 'rgba(51,65,85,0.4)' : 'rgba(241,245,249,0.8)',
                                color: isDark ? '#64748b' : '#94a3b8',
                            }}>
                            {group.items?.length || 0}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
