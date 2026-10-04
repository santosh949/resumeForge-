import ScrollReveal from '../shared/ScrollReveal';
import TypewriterText from '../shared/TypewriterText';
import AnimatedCounter from '../shared/AnimatedCounter';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 5: Neon Glass
 * Dark background, neon accent borders (cyan/magenta), glassmorphism cards, futuristic.
 */
export default function NeonGlass({ data, recruiterMode }) {
    const theme = getTheme('neon-glass');
    const c = theme.colors;
    const stats = extractStats(data);

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', position: 'relative' }}>
            {/* Grid background */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Hero — neon glow */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
                <nav style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '2rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="neon-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EXPERIENCE</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="neon-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>PROJECTS</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="neon-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>SKILLS</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="neon-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EDUCATION</SectionLink>}
                </nav>

                {/* Glow orbs */}
                <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)', top: '20%', right: '-10%', filter: 'blur(60px)' }} />
                <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,70,239,0.12), transparent 70%)', bottom: '20%', left: '-5%', filter: 'blur(60px)' }} />

                <ScrollReveal animation="fade">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '8px', background: `${c.accent}10`, border: `1px solid ${c.accent}30`, fontSize: '0.875rem', color: c.accent, marginBottom: '2rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c.accent, boxShadow: `0 0 10px ${c.accent}`, animation: 'pulse 2s infinite' }} />
                        STATUS: ONLINE
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem', position: 'relative' }}>
                        <span style={{ position: 'relative' }}>
                            {data.bio?.name || 'Your Name'}
                            <span style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${c.accent}, ${c.accentAlt})`, boxShadow: `0 0 12px ${c.accent}60`, borderRadius: '99px' }} />
                        </span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: '1.3rem', color: c.accent, fontWeight: 600, marginBottom: '1.5rem', textShadow: `0 0 20px ${c.accent}30` }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1rem', color: c.muted, maxWidth: '600px', lineHeight: 1.8 }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2.5rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.github && 'GitHub', data.bio?.linkedin && 'LinkedIn'].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem', background: 'rgba(6,182,212,0.06)', border: `1px solid ${c.border}`, backdropFilter: 'blur(8px)', transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.target.style.borderColor = c.accent; e.target.style.boxShadow = `0 0 15px ${c.accent}20`; }}
                                onMouseLeave={e => { e.target.style.borderColor = c.border; e.target.style.boxShadow = 'none'; }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Stats strip */}
            {stats.length > 0 && (
                <section style={{ borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: '3rem 2rem', background: 'rgba(6,182,212,0.02)' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: theme.fonts.display, color: c.accent, textShadow: `0 0 20px ${c.accent}30` }}>
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div style={{ fontSize: '0.8rem', color: c.muted, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>
                            <span style={{ borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem', boxShadow: `0 2px 0 ${c.accent}` }}>Experience</span>
                        </h2>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '2rem', borderRadius: '12px', background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(16px)', marginBottom: '1.25rem', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.boxShadow = `0 0 20px ${c.accent}15, inset 0 0 20px ${c.accent}05`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = 'none'; }}>
                                {/* Top neon accent line */}
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${c.accent}, ${c.accentAlt}, transparent)` }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{exp.role}</h3>
                                        <p style={{ color: c.accent, fontWeight: 600 }}>{exp.company}</p>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: c.muted, padding: '0.3rem 0.8rem', borderRadius: '6px', border: `1px solid ${c.border}` }}>{exp.duration}</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ padding: '0.35rem 0', paddingLeft: '1.25rem', position: 'relative', color: c.muted, fontSize: '0.925rem', lineHeight: 1.7 }}>
                                            <span style={{ position: 'absolute', left: 0, width: '6px', height: '6px', borderRadius: '2px', top: '0.75rem', background: c.accent, boxShadow: `0 0 6px ${c.accent}` }} />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>
                            <span style={{ borderBottom: `2px solid ${c.accentAlt}`, paddingBottom: '0.5rem' }}>Skills</span>
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 80}>
                                <div style={{ padding: '1.75rem', borderRadius: '12px', background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(16px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.accentAlt, marginBottom: '1rem' }}>{group.category}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', background: `${c.accent}10`, border: `1px solid ${c.accent}20`, transition: 'all 0.2s', cursor: 'default' }}
                                                onMouseEnter={e => { e.target.style.boxShadow = `0 0 10px ${c.accent}25`; e.target.style.borderColor = c.accent; }}
                                                onMouseLeave={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = `${c.accent}20`; }}>
                                                {skill}
                                            </span>
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
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>
                            <span style={{ borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem' }}>Projects</span>
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ padding: '2rem', borderRadius: '12px', background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(16px)', height: '100%', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.accentAlt; e.currentTarget.style.boxShadow = `0 0 20px ${c.accentAlt}15`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${c.accentAlt}, ${c.accent}, transparent)` }} />
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{project.name}</h3>
                                    <p style={{ color: c.muted, fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1rem' }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: c.accentAlt, background: `${c.accentAlt}10`, border: `1px solid ${c.accentAlt}20` }}>{tech}</span>
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
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>
                            <span style={{ borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem' }}>Education</span>
                        </h2>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '1.5rem', borderRadius: '12px', background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(16px)', marginBottom: '1rem' }}>
                                <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                                <p style={{ color: c.accent, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.muted, fontSize: '0.85rem', marginTop: '0.25rem' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .neon-nav-link:hover {
                    color: ${c.accent} !important;
                    text-shadow: 0 0 10px ${c.accent}80;
                }
            `}</style>

            <footer style={{ borderTop: `1px solid ${c.border}`, textAlign: 'center', padding: '2.5rem', color: c.muted, fontSize: '0.8rem' }}>
                Built with ResumeForge
            </footer>
        </div>
    );
}

function extractStats(data) {
    const stats = [];
    if (data.experience?.length) stats.push({ value: data.experience.length, suffix: '+', label: 'Companies' });
    if (data.projects?.length) stats.push({ value: data.projects.length, suffix: '+', label: 'Projects' });
    const totalSkills = data.skills?.reduce((sum, g) => sum + (g.items?.length || 0), 0) || 0;
    if (totalSkills) stats.push({ value: totalSkills, suffix: '+', label: 'Technologies' });
    return stats;
}
