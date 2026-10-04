import ScrollReveal from '../shared/ScrollReveal';
import AnimatedCounter from '../shared/AnimatedCounter';
import FloatingParticles from '../shared/FloatingParticles';
import TiltCard from '../shared/TiltCard';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 9: Aurora Boreal
 * Northern lights gradient backgrounds, floating particles, ethereal glow.
 */
export default function AuroraBoreal({ data, recruiterMode }) {
    const theme = getTheme('aurora-boreal');
    const c = theme.colors;
    const stats = extractStats(data);

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Aurora gradient layers */}
            <style>{`
                @keyframes aurora-shift {
                    0%, 100% { opacity: 0.6; transform: translateY(0) scaleX(1); }
                    50% { opacity: 1; transform: translateY(-20px) scaleX(1.1); }
                }
                @keyframes aurora-shift-2 {
                    0%, 100% { opacity: 0.4; transform: translateY(0) scaleX(1.1); }
                    50% { opacity: 0.8; transform: translateY(-30px) scaleX(0.9); }
                }
            `}</style>
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', right: '-10%', height: '70%', background: `linear-gradient(135deg, ${c.accentDark}15, ${c.accentAlt}10, #3b82f620, transparent)`, filter: 'blur(80px)', borderRadius: '50%', animation: 'aurora-shift 8s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '-10%', left: '20%', right: '-20%', height: '60%', background: `linear-gradient(225deg, #3b82f615, ${c.accentDark}10, ${c.accentAlt}08, transparent)`, filter: 'blur(60px)', borderRadius: '50%', animation: 'aurora-shift-2 10s ease-in-out infinite' }} />
                <FloatingParticles count={35} color="rgba(139,92,246,0.3)" maxSize={2.5} speed={0.2} />
            </div>

            {/* Hero */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <nav style={{ position: 'absolute', top: '2rem', display: 'flex', gap: '2.5rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="aurora-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EXPERIENCE</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="aurora-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>PROJECTS</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="aurora-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>SKILLS</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="aurora-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EDUCATION</SectionLink>}
                </nav>

                <ScrollReveal animation="fade-up">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: `${c.accentDark}15`, border: `1px solid ${c.accentDark}25`, fontSize: '0.85rem', color: c.accentDark, marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.accentDark, boxShadow: `0 0 8px ${c.accentDark}`, animation: 'pulse 2s infinite' }} />
                        Portfolio
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', background: `linear-gradient(135deg, ${c.accentDark}, #3b82f6, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {data.bio?.name || 'Your Name'}
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 400, color: c.accentDark, maxWidth: '600px' }}>{data.bio?.title}</p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1rem', color: c.mutedDark, maxWidth: '550px', marginTop: '1.5rem', lineHeight: 1.9 }}>{data.bio?.summary}</p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem', background: `${c.accentDark}10`, border: `1px solid ${c.accentDark}20`, backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.target.style.background = `${c.accentDark}25`; e.target.style.boxShadow = `0 0 20px ${c.accentDark}15`; }}
                                onMouseLeave={e => { e.target.style.background = `${c.accentDark}10`; e.target.style.boxShadow = 'none'; }}>{item}</span>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Stats */}
            {stats.length > 0 && (
                <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '1rem' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div style={{ padding: '2rem', borderRadius: '20px', background: `${c.accentDark}08`, border: `1px solid ${c.accentDark}15`, backdropFilter: 'blur(12px)', textAlign: 'center', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${c.accentDark}15`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: theme.fonts.display, background: `linear-gradient(135deg, ${c.accentDark}, #3b82f6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}><AnimatedCounter end={stat.value} suffix={stat.suffix} /></div>
                                    <div style={{ fontSize: '0.75rem', color: c.mutedDark, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, ${c.accentDark}, #3b82f6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Experience</h2>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '2rem', borderRadius: '16px', background: `${c.accentDark}06`, border: `1px solid ${c.accentDark}12`, backdropFilter: 'blur(8px)', marginBottom: '1.25rem', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.accentDark}30`; e.currentTarget.style.boxShadow = `0 8px 30px ${c.accentDark}10`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.accentDark}12`; e.currentTarget.style.boxShadow = 'none'; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${c.accentDark}, #3b82f6, ${c.accentAlt}, transparent)` }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{exp.role}</h3>
                                        <p style={{ color: c.accentDark, fontWeight: 600 }}>{exp.company}</p>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: c.mutedDark, padding: '0.3rem 0.8rem', borderRadius: '999px', border: `1px solid ${c.accentDark}15` }}>{exp.duration}</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ padding: '0.3rem 0', paddingLeft: '1.25rem', position: 'relative', color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7 }}>
                                            <span style={{ position: 'absolute', left: 0, top: '0.65rem', width: '6px', height: '6px', borderRadius: '50%', background: `linear-gradient(135deg, ${c.accentDark}, #3b82f6)` }} />{h}
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
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, #3b82f6, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 80}>
                                <TiltCard maxTilt={6} style={{ borderRadius: '16px', height: '100%' }}>
                                    <div style={{ padding: '1.75rem', borderRadius: '16px', background: `${c.accentDark}06`, border: `1px solid ${c.accentDark}12`, backdropFilter: 'blur(8px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.accentDark, marginBottom: '1rem' }}>{group.category}</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'start', flexGrow: 1 }}>
                                            {group.items?.map((skill, j) => (
                                                <span key={j} style={{ padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.85rem', background: `${c.accentDark}08`, border: `1px solid ${c.accentDark}15`, transition: 'all 0.2s', cursor: 'default' }}
                                                    onMouseEnter={e => { e.target.style.background = `${c.accentDark}20`; e.target.style.boxShadow = `0 0 10px ${c.accentDark}15`; }}
                                                    onMouseLeave={e => { e.target.style.background = `${c.accentDark}08`; e.target.style.boxShadow = 'none'; }}>{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects?.length > 0 && (
                <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <TiltCard maxTilt={8} style={{ borderRadius: '16px', height: '100%' }}>
                                    <div style={{ padding: '2rem', borderRadius: '16px', background: `${c.accentDark}06`, border: `1px solid ${c.accentDark}12`, backdropFilter: 'blur(8px)', height: '100%', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${c.accentDark}, #3b82f6, ${c.accentAlt}, transparent)` }} />
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{project.name}</h3>
                                        <p style={{ color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1rem' }}>{project.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {project.technologies?.map((tech, j) => (
                                                <span key={j} style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, color: c.accentDark, background: `${c.accentDark}10` }}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section id="education" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, #3b82f6, ${c.accentDark})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Education</h2>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '1.75rem', borderRadius: '16px', background: `${c.accentDark}06`, border: `1px solid ${c.accentDark}12`, marginBottom: '1rem', backdropFilter: 'blur(8px)', transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${c.accentDark}10`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                                <p style={{ color: c.accentDark, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.85rem', marginTop: '0.25rem' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <footer style={{ borderTop: `1px solid ${c.accentDark}12`, textAlign: 'center', padding: '2.5rem', color: c.mutedDark, fontSize: '0.8rem', position: 'relative', zIndex: 2 }}>
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
    if (totalSkills) stats.push({ value: totalSkills, suffix: '+', label: 'Skills' });
    if (data.education?.length) stats.push({ value: data.education.length, suffix: '', label: 'Degrees' });
    return stats;
}
