import { useTheme } from '../context/ThemeContext';

export default function HeroSection({ bio, recruiterMode, userPhoto }) {
    const { isDark } = useTheme();

    if (!bio) return null;

    const contactLinks = [
        bio.email && { icon: '✉️', value: bio.email, href: `mailto:${bio.email}` },
        bio.phone && { icon: '📱', value: bio.phone, href: `tel:${bio.phone}` },
        bio.location && { icon: '📍', value: bio.location },
        bio.linkedin && { icon: '🔗', value: 'LinkedIn', href: bio.linkedin },
        bio.github && { icon: '💻', value: 'GitHub', href: bio.github },
        bio.website && { icon: '🌐', value: 'Website', href: bio.website },
    ].filter(Boolean);

    return (
        <div className="animate-fade-up relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(30,41,59,0.9) 40%, rgba(15,23,42,0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(255,255,255,0.95) 40%, rgba(248,250,252,1) 100%)',
                border: `1px solid ${isDark ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)'}`,
            }}>

            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-10"
                style={{
                    background: 'radial-gradient(circle, rgba(52,211,153,0.4) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                }} />
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }} />

            <div className="relative flex flex-col md:flex-row items-start gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0 relative group">
                    <div className="absolute inset-[-4px] rounded-3xl animate-gradient opacity-80"
                        style={{
                            background: 'linear-gradient(135deg, #10b981, #34d399, #6ee7b7, #10b981)',
                            backgroundSize: '300% 300%',
                            filter: 'blur(8px)',
                        }} />
                    <div className="relative w-28 h-28 rounded-3xl overflow-hidden shadow-2xl ring-4"
                        style={{
                            ringColor: isDark ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.9)',
                        }}>
                        {userPhoto ? (
                            <img src={userPhoto} alt={bio.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold"
                                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                {bio.name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{
                            background: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)',
                            color: '#10b981',
                            border: '1px solid rgba(16,185,129,0.2)',
                        }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Available for opportunities
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight"
                        style={{ fontFamily: 'var(--font-family-display)' }}>
                        {bio.name || 'Your Name'}
                    </h1>
                    {bio.title && (
                        <p className="text-xl font-semibold mb-4 text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #10b981, #34d399)',
                            }}>
                            {bio.title}
                        </p>
                    )}
                    {bio.summary && (
                        <p className="text-base leading-relaxed mb-6 max-w-2xl"
                            style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                            {recruiterMode ? highlightKeywords(bio.summary) : bio.summary}
                        </p>
                    )}

                    {/* Contact links */}
                    {contactLinks.length > 0 && (
                        <div className="flex flex-wrap gap-2.5">
                            {contactLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href || '#'}
                                    target={link.href?.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-md"
                                    style={{
                                        background: isDark
                                            ? 'rgba(30,41,59,0.8)'
                                            : 'rgba(255,255,255,0.8)',
                                        border: `1px solid ${isDark ? 'rgba(51,65,85,0.6)' : 'rgba(226,232,240,0.8)'}`,
                                        color: isDark ? '#cbd5e1' : '#475569',
                                        backdropFilter: 'blur(8px)',
                                    }}>
                                    <span>{link.icon}</span>
                                    <span className="font-medium">{link.value}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function highlightKeywords(text) {
    const regex = /(\$[\d,.]+[KMBkmb]?|\d+[%+]|\d+x|\d+\+?\s*(years?|months?|clients?|projects?|users?|customers?|team members?|people|employees))/gi;
    const parts = text.split(regex);
    return parts.map((part, i) => {
        if (regex.test(part)) {
            return <span key={i} className="recruiter-highlight">{part}</span>;
        }
        regex.lastIndex = 0;
        if (regex.test(part)) {
            return <span key={i} className="recruiter-highlight">{part}</span>;
        }
        regex.lastIndex = 0;
        return part;
    });
}
