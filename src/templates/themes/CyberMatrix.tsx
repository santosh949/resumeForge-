import ScrollReveal from '../shared/ScrollReveal';
import GlitchText from '../shared/GlitchText';
import AnimatedCounter from '../shared/AnimatedCounter';
import FloatingParticles from '../shared/FloatingParticles';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 6: Cyber Matrix
 * Matrix code rain, neon green on black, glitch text effects, terminal-style headers.
 */
export default function CyberMatrix({ data, recruiterMode }) {
    const theme = getTheme('cyber-matrix');
    const c = theme.colors;
    const stats = extractStats(data);

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Matrix background */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <FloatingParticles count={60} color="rgba(0,255,65,0.4)" maxSize={2} speed={0.8} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${c.accentDark}03 1px, transparent 1px), linear-gradient(90deg, ${c.accentDark}03 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            </div>

            {/* Scanning line effect */}
            <style>{`
                @keyframes matrix-scan {
                    0% { top: -5%; }
                    100% { top: 105%; }
                }
            `}</style>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${c.accentDark}60, transparent)`, animation: 'matrix-scan 4s linear infinite', zIndex: 1, pointerEvents: 'none' }} />

            {/* Hero */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                <nav style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '2rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="cyber-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[EXP]</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="cyber-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[PRO]</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="cyber-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[SKL]</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="cyber-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[EDU]</SectionLink>}
                </nav>

                <ScrollReveal animation="fade">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '4px', background: `${c.accentDark}10`, border: `1px solid ${c.accentDark}30`, fontSize: '0.85rem', fontFamily: theme.fonts.display, color: c.accentDark, marginBottom: '2rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.accentDark, boxShadow: `0 0 10px ${c.accentDark}`, animation: 'pulse 1.5s infinite' }} />
                        {'>'} SYSTEM.ONLINE
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', color: c.accentDark, textShadow: `0 0 40px ${c.accentDark}30, 0 0 80px ${c.accentDark}10` }}>
                        <GlitchText text={data.bio?.name || 'Your Name'} color1={c.accentDark} color2="#00ccaa" intensity="medium" />
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: '1.3rem', color: c.accentDark, fontFamily: theme.fonts.display, opacity: 0.8 }}>
                        {'> '}{data.bio?.title}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1rem', color: c.mutedDark, maxWidth: '600px', marginTop: '1.5rem', lineHeight: 1.8, fontFamily: theme.fonts.body }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2.5rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.5rem 1.2rem', border: `1px solid ${c.accentDark}30`, borderRadius: '4px', fontSize: '0.85rem', color: c.accentDark, fontFamily: theme.fonts.display, background: `${c.accentDark}08`, transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.target.style.background = `${c.accentDark}20`; e.target.style.boxShadow = `0 0 15px ${c.accentDark}20`; }}
                                onMouseLeave={e => { e.target.style.background = `${c.accentDark}08`; e.target.style.boxShadow = 'none'; }}>
                                {'>'} {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Stats */}
            {stats.length > 0 && (
                <section style={{ borderTop: `1px solid ${c.accentDark}20`, borderBottom: `1px solid ${c.accentDark}20`, padding: '3rem 2rem', position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: theme.fonts.display, color: c.accentDark, textShadow: `0 0 30px ${c.accentDark}40` }}>
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div style={{ fontSize: '0.75rem', color: c.mutedDark, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: theme.fonts.display }}>{'// '}{stat.label}</div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: c.accentDark }}>
                            {'>'} EXPERIENCE<span style={{ animation: 'pulse 1s infinite' }}>_</span>
                        </h2>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '2rem', borderRadius: '4px', background: `${c.accentDark}05`, border: `1px solid ${c.accentDark}15`, marginBottom: '1.25rem', position: 'relative', transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.accentDark}40`; e.currentTarget.style.boxShadow = `0 0 20px ${c.accentDark}10, inset 0 1px 0 ${c.accentDark}20`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.accentDark}15`; e.currentTarget.style.boxShadow = 'none'; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: c.accentDark, boxShadow: `0 0 10px ${c.accentDark}50` }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: c.textDark }}>{exp.role}</h3>
                                        <p style={{ color: c.accentDark, fontWeight: 600, fontFamily: theme.fonts.display }}>{exp.company}</p>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: c.mutedDark, fontFamily: theme.fonts.display }}>[{exp.duration}]</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ padding: '0.3rem 0', paddingLeft: '1.5rem', position: 'relative', color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7 }}>
                                            <span style={{ position: 'absolute', left: 0, color: c.accentDark, fontFamily: theme.fonts.display }}>{'>'}</span>
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
                <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: c.accentDark }}>
                            {'>'} SKILLS<span style={{ animation: 'pulse 1s infinite' }}>_</span>
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                <div style={{ padding: '1.75rem', borderRadius: '4px', background: `${c.accentDark}05`, border: `1px solid ${c.accentDark}15`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: c.accentDark, marginBottom: '1rem', fontFamily: theme.fonts.display }}>{'// '}{group.category}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.4rem 0.8rem', borderRadius: '2px', fontSize: '0.85rem', background: `${c.accentDark}08`, border: `1px solid ${c.accentDark}20`, color: c.textDark, fontFamily: theme.fonts.display, transition: 'all 0.2s', cursor: 'default' }}
                                                onMouseEnter={e => { e.target.style.background = `${c.accentDark}20`; e.target.style.color = c.accentDark; e.target.style.boxShadow = `0 0 8px ${c.accentDark}20`; }}
                                                onMouseLeave={e => { e.target.style.background = `${c.accentDark}08`; e.target.style.color = c.textDark; e.target.style.boxShadow = 'none'; }}>
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
                <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: c.accentDark }}>
                            {'>'} PROJECTS<span style={{ animation: 'pulse 1s infinite' }}>_</span>
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div style={{ padding: '2rem', borderRadius: '4px', background: `${c.accentDark}05`, border: `1px solid ${c.accentDark}15`, height: '100%', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.accentDark}50`; e.currentTarget.style.boxShadow = `0 0 25px ${c.accentDark}15`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.accentDark}15`; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${c.accentDark}, transparent)` }} />
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: c.textDark, fontFamily: theme.fonts.display }}>{project.name}</h3>
                                    <p style={{ color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1rem' }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ padding: '0.25rem 0.6rem', borderRadius: '2px', fontSize: '0.7rem', fontWeight: 600, color: c.accentDark, background: `${c.accentDark}10`, fontFamily: theme.fonts.display }}>{tech}</span>
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
                <section id="education" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: c.accentDark }}>
                            {'>'} EDUCATION<span style={{ animation: 'pulse 1s infinite' }}>_</span>
                        </h2>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '1.5rem', borderRadius: '4px', background: `${c.accentDark}05`, border: `1px solid ${c.accentDark}15`, marginBottom: '1rem', borderLeft: `3px solid ${c.accentDark}`, transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 15px ${c.accentDark}10`; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
                                <h3 style={{ fontWeight: 700, fontFamily: theme.fonts.display }}>{edu.institution}</h3>
                                <p style={{ color: c.accentDark, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.85rem', marginTop: '0.25rem', fontFamily: theme.fonts.display }}>
                                    [{edu.year}]{edu.gpa ? ` // GPA: ${edu.gpa}` : ''}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .cyber-nav-link:hover {
                    color: ${c.accentDark} !important;
                    text-shadow: 0 0 8px ${c.accentDark};
                }
            `}</style>

            <footer style={{ borderTop: `1px solid ${c.accentDark}15`, textAlign: 'center', padding: '2.5rem', color: c.mutedDark, fontSize: '0.8rem', fontFamily: theme.fonts.display, position: 'relative', zIndex: 2 }}>
                {'>'} Built with ResumeForge_
            </footer>
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
