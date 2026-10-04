import ScrollReveal from '../shared/ScrollReveal';
import AnimatedCounter from '../shared/AnimatedCounter';
import TiltCard from '../shared/TiltCard';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 7: Retro Vaporwave
 * 80s retro aesthetic, sunset gradient, retro grid floor, chrome/gradient text.
 */
export default function RetroVaporwave({ data, recruiterMode }) {
    const theme = getTheme('retro-vaporwave');
    const c = theme.colors;
    const stats = extractStats(data);

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Retro grid floor */}
            <style>{`
                @keyframes retro-scroll {
                    0% { transform: perspective(400px) rotateX(60deg) translateY(0); }
                    100% { transform: perspective(400px) rotateX(60deg) translateY(50px); }
                }
                @keyframes glow-pulse {
                    0%, 100% { text-shadow: 0 0 20px rgba(255,110,199,0.3), 0 0 40px rgba(255,110,199,0.15); }
                    50% { text-shadow: 0 0 30px rgba(255,110,199,0.5), 0 0 60px rgba(255,110,199,0.25); }
                }
            `}</style>
            <div style={{ position: 'fixed', bottom: 0, left: '-50%', right: '-50%', height: '50vh', backgroundImage: `linear-gradient(${c.accentDark}20 1px, transparent 1px), linear-gradient(90deg, ${c.accentDark}20 1px, transparent 1px)`, backgroundSize: '50px 50px', transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'bottom', animation: 'retro-scroll 2s linear infinite', pointerEvents: 'none', zIndex: 0 }} />

            {/* Sunset gradient BG */}
            <div style={{ position: 'fixed', inset: 0, background: `linear-gradient(180deg, ${c.bgDark} 0%, #1a0030 40%, #3d0060 60%, #ff6ec730 80%, ${c.accentAlt}15 100%)`, pointerEvents: 'none', zIndex: 0 }} />

            {/* Hero */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <nav style={{ position: 'absolute', top: '2rem', display: 'flex', gap: '2.5rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="retro-nav-link" style={{ color: c.accentAlt, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>EXPERIENCE</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="retro-nav-link" style={{ color: c.accentAlt, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>PROJECTS</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="retro-nav-link" style={{ color: c.accentAlt, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>SKILLS</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="retro-nav-link" style={{ color: c.accentAlt, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>EDUCATION</SectionLink>}
                </nav>

                <ScrollReveal animation="fade-up">
                    <div style={{ display: 'inline-block', padding: '0.4rem 1.5rem', borderRadius: '999px', background: `linear-gradient(135deg, ${c.accentDark}20, ${c.accentAlt}20)`, border: `1px solid ${c.accentDark}30`, fontSize: '0.85rem', color: c.accentDark, marginBottom: '2rem', letterSpacing: '0.1em' }}>
                        ★ PORTFOLIO ★
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1, marginBottom: '1.5rem', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt}, #ff6ec7, ${c.accentDark})`, backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'glow-pulse 3s ease-in-out infinite' }}>
                        {data.bio?.name || 'Your Name'}
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 300, color: c.accentAlt, letterSpacing: '0.05em' }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1rem', color: c.mutedDark, maxWidth: '600px', marginTop: '1.5rem', lineHeight: 1.8 }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.5rem 1.5rem', borderRadius: '999px', fontSize: '0.85rem', background: `linear-gradient(135deg, ${c.accentDark}15, ${c.accentAlt}15)`, border: `1px solid ${c.accentDark}25`, color: c.accentAlt, transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.target.style.background = `linear-gradient(135deg, ${c.accentDark}30, ${c.accentAlt}30)`; e.target.style.transform = 'scale(1.05)'; }}
                                onMouseLeave={e => { e.target.style.background = `linear-gradient(135deg, ${c.accentDark}15, ${c.accentAlt}15)`; e.target.style.transform = 'scale(1)'; }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Stats */}
            {stats.length > 0 && (
                <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 2, borderTop: `1px solid ${c.accentDark}15` }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: theme.fonts.display, background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div style={{ fontSize: '0.75rem', color: c.mutedDark, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            ★ Experience ★
                        </h2>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '2rem', borderRadius: '16px', background: `linear-gradient(135deg, ${c.accentDark}08, ${c.accentAlt}08)`, border: `1px solid ${c.accentDark}15`, marginBottom: '1.25rem', transition: 'all 0.3s', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(8px)' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.accentDark}40`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 40px ${c.accentDark}15`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.accentDark}15`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${c.accentDark}, ${c.accentAlt}, transparent)` }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: c.textDark }}>{exp.role}</h3>
                                        <p style={{ color: c.accentDark, fontWeight: 600 }}>{exp.company}</p>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: c.mutedDark, padding: '0.3rem 0.8rem', borderRadius: '999px', border: `1px solid ${c.accentDark}20` }}>{exp.duration}</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ padding: '0.35rem 0', paddingLeft: '1.5rem', position: 'relative', color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7 }}>
                                            <span style={{ position: 'absolute', left: 0, top: '0.7rem', width: '6px', height: '6px', borderRadius: '50%', background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})` }} />
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
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, ${c.accentAlt}, ${c.accentDark})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            ★ Skills ★
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 80}>
                                <div style={{ padding: '1.75rem', borderRadius: '16px', background: `linear-gradient(135deg, ${c.accentDark}06, ${c.accentAlt}06)`, border: `1px solid ${c.accentDark}15`, backdropFilter: 'blur(8px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.accentDark, marginBottom: '1rem' }}>★ {group.category}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.85rem', background: `linear-gradient(135deg, ${c.accentDark}10, ${c.accentAlt}10)`, border: `1px solid ${c.accentDark}15`, color: c.textDark, transition: 'all 0.3s', cursor: 'default' }}
                                                onMouseEnter={e => { e.target.style.background = `linear-gradient(135deg, ${c.accentDark}25, ${c.accentAlt}25)`; e.target.style.transform = 'scale(1.08)'; }}
                                                onMouseLeave={e => { e.target.style.background = `linear-gradient(135deg, ${c.accentDark}10, ${c.accentAlt}10)`; e.target.style.transform = 'scale(1)'; }}>
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
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, ${c.accentDark}, #ff6ec7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            ★ Projects ★
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <TiltCard maxTilt={8} glare={true} style={{ borderRadius: '16px', height: '100%' }}>
                                    <div style={{ padding: '2rem', borderRadius: '16px', background: `linear-gradient(135deg, ${c.accentDark}08, ${c.accentAlt}08)`, border: `1px solid ${c.accentDark}15`, height: '100%', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${c.accentDark}, ${c.accentAlt}, #ff6ec7)` }} />
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{project.name}</h3>
                                        <p style={{ color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1rem' }}>{project.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {project.technologies?.map((tech, j) => (
                                                <span key={j} style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, color: c.accentDark, background: `${c.accentDark}12` }}>{tech}</span>
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
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center', background: `linear-gradient(135deg, ${c.accentAlt}, ${c.accentDark})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            ★ Education ★
                        </h2>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '1.75rem', borderRadius: '16px', background: `linear-gradient(135deg, ${c.accentDark}06, ${c.accentAlt}06)`, border: `1px solid ${c.accentDark}15`, marginBottom: '1rem', transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${c.accentDark}15`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <h3 style={{ fontWeight: 700 }}>{edu.institution}</h3>
                                <p style={{ background: `linear-gradient(135deg, ${c.accentDark}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.85rem', marginTop: '0.25rem' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .retro-nav-link:hover {
                    color: #ff6ec7 !important;
                    text-shadow: 0 0 10px #ff6ec7;
                    transform: translateY(-2px);
                }
            `}</style>

            <footer style={{ borderTop: `1px solid ${c.accentDark}15`, textAlign: 'center', padding: '2.5rem', color: c.mutedDark, fontSize: '0.8rem', position: 'relative', zIndex: 2 }}>
                ★ Built with ResumeForge ★
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
