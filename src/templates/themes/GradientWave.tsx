import ScrollReveal from '../shared/ScrollReveal';
import TypewriterText from '../shared/TypewriterText';
import AnimatedCounter from '../shared/AnimatedCounter';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 2: Gradient Wave
 * Vibrant gradients, wave SVG dividers, centered hero, floating shapes, bento-grid.
 */
export default function GradientWave({ data, recruiterMode }) {
    const theme = getTheme('gradient-wave');
    const c = theme.colors;

    const stats = extractStats(data);

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh', overflow: 'hidden' }}>
            {/* Hero with gradient orbs */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem', position: 'relative' }}>
                <nav style={{ position: 'absolute', top: '2rem', display: 'flex', gap: '2rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="wave-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EXPERIENCE</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="wave-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>PROJECTS</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="wave-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>SKILLS</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="wave-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EDUCATION</SectionLink>}
                </nav>

                {/* Floating gradient orbs */}
                <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)', top: '10%', left: '-5%', filter: 'blur(40px)', animation: 'float 6s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)', bottom: '15%', right: '-5%', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite reverse' }} />
                <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)', top: '50%', left: '60%', filter: 'blur(30px)', animation: 'float 7s ease-in-out infinite' }} />

                <ScrollReveal animation="scale">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', fontSize: '0.875rem', color: c.accentDark, marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.accentDark, animation: 'pulse 2s infinite' }} /> Portfolio
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt}, #818cf8)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {data.bio?.name || 'Your Name'}
                    </h1>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: c.mutedDark, maxWidth: '600px', marginBottom: '1rem' }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1rem', color: c.mutedDark, opacity: 0.7, maxWidth: '550px', lineHeight: 1.8 }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>

                {/* Contact pills */}
                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.linkedin && 'LinkedIn', data.bio?.github && 'GitHub'].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.5rem 1.2rem', borderRadius: '999px', fontSize: '0.85rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', backdropFilter: 'blur(8px)' }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Wave divider */}
            <WaveDivider color1={c.accentDark} color2={c.accentAlt} />

            {/* Stats */}
            {stats.length > 0 && (
                <section style={{ padding: '4rem 2rem', background: 'rgba(124,58,237,0.04)' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div>
                                    <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: theme.fonts.display, background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: c.mutedDark, marginTop: '0.5rem' }}>{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Experience
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {data.experience.map((exp, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ padding: '2rem', borderRadius: '20px', background: c.cardDark, border: `1px solid ${c.borderDark}`, backdropFilter: 'blur(16px)', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.accentDark; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 32px rgba(124,58,237,0.15)`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.borderDark; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{exp.role}</h3>
                                            <p style={{ color: c.accentDark, fontWeight: 600 }}>{exp.company}</p>
                                        </div>
                                        <span style={{ fontSize: '0.85rem', color: c.mutedDark, padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(124,58,237,0.08)', alignSelf: 'flex-start' }}>{exp.duration}</span>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {exp.highlights?.map((h, j) => (
                                            <li key={j} style={{ padding: '0.4rem 0', color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7, paddingLeft: '1.5rem', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: 0, color: c.accentDark, fontSize: '0.75rem' }}>◆</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills — Bento grid */}
            {data.skills?.length > 0 && (
                <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Skills
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 80}>
                                <div style={{ padding: '1.75rem', borderRadius: '20px', background: c.cardDark, border: `1px solid ${c.borderDark}`, backdropFilter: 'blur(16px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: c.accentDark, marginBottom: '1rem' }}>{group.category}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.85rem', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.12)' }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects?.length > 0 && (
                <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Projects
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ padding: '2rem', borderRadius: '20px', background: c.cardDark, border: `1px solid ${c.borderDark}`, backdropFilter: 'blur(16px)', height: '100%', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.accentAlt; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.borderDark; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{project.name}</h3>
                                    <p style={{ color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1rem' }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ padding: '0.3rem 0.7rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, background: `linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))`, color: c.accentAlt }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section id="education" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Education
                        </h2>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '2rem', borderRadius: '20px', background: c.cardDark, border: `1px solid ${c.borderDark}`, backdropFilter: 'blur(16px)', marginBottom: '1.25rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{edu.institution}</h3>
                                <p style={{ color: c.accentDark, fontWeight: 500, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.875rem', marginTop: '0.5rem' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .wave-nav-link:hover {
                    color: ${c.accentDark} !important;
                    transform: translateY(-2px);
                }
            `}</style>

            <footer style={{ textAlign: 'center', padding: '3rem 2rem', color: c.mutedDark, fontSize: '0.8rem', opacity: 0.5 }}>
                Built with ResumeForge
            </footer>

            <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }`}</style>
        </div>
    );
}

function WaveDivider({ color1, color2 }) {
    return (
        <div style={{ marginTop: '-1px', lineHeight: 0 }}>
            <svg viewBox="0 0 1440 100" style={{ width: '100%', height: '60px' }}>
                <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,40 L1440,100 L0,100 Z" fill="url(#waveGrad)" opacity="0.1" />
                <defs>
                    <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={color1} />
                        <stop offset="100%" stopColor={color2} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

function extractStats(data) {
    const stats = [];
    if (data.experience?.length) stats.push({ value: data.experience.length, suffix: '+', label: 'Companies' });
    if (data.projects?.length) stats.push({ value: data.projects.length, suffix: '+', label: 'Projects' });
    const totalSkills = data.skills?.reduce((sum, g) => sum + (g.items?.length || 0), 0) || 0;
    if (totalSkills) stats.push({ value: totalSkills, suffix: '+', label: 'Skills' });
    if (data.education?.length) stats.push({ value: data.education.length, suffix: '', label: 'Degrees' });
    return stats;
}
