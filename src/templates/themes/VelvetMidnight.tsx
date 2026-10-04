import ScrollReveal from '../shared/ScrollReveal';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Velvet Midnight Theme
 * Deep, luxurious purple/blue tailored for night mode and subtle neon interactions.
 * Premium features: glowing borders on hover, rich dark backgrounds, elegant serif elements.
 */
export default function VelvetMidnight({ data }) {
    const theme = getTheme('velvet-midnight');
    const c = theme.colors;

    const stats = extractStats(data);

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', overflowX: 'hidden' }}>

            {/* Ambient Base Glow */}
            <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(circle at 50% 0%, rgba(217,70,239,0.08) 0%, rgba(15,5,24,0) 70%)`, pointerEvents: 'none', zIndex: 0 }} />

            {/* Premium Velvet Navigation */}
            <nav style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '0.5rem', background: 'rgba(15, 5, 24, 0.8)', backdropFilter: 'blur(20px)', padding: '0.6rem', borderRadius: '100px', border: `1px solid ${c.border}`, boxShadow: `0 0 30px rgba(217,70,239,0.2)` }}>
                {data.experience?.length > 0 && <SectionLink targetId="experience" className="velvet-nav-link">Exp</SectionLink>}
                {data.projects?.length > 0 && <SectionLink targetId="projects" className="velvet-nav-link">Work</SectionLink>}
                {data.skills?.length > 0 && <SectionLink targetId="skills" className="velvet-nav-link">Skills</SectionLink>}
                {data.education?.length > 0 && <SectionLink targetId="education" className="velvet-nav-link">Edu</SectionLink>}
            </nav>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Hero */}
                <header style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '4rem' }}>
                    <ScrollReveal animation="fade-up">
                        <div style={{ width: '80px', height: '8px', background: `linear-gradient(90deg, ${c.accentAlt}, ${c.accent})`, borderRadius: '4px', marginBottom: '2.5rem' }} />
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={150}>
                        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff', textShadow: `0 0 40px rgba(217,70,239,0.3)` }}>
                            {data.bio?.name || 'Your Name'}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={300}>
                        <p style={{ fontSize: '1.4rem', color: c.accentAlt, fontWeight: 400, marginBottom: '3rem', fontFamily: theme.fonts.display, letterSpacing: '0.05em' }}>
                            {data.bio?.title}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={450}>
                        <p style={{ fontSize: '1.1rem', color: c.muted, maxWidth: '700px', lineHeight: 1.8, marginBottom: '4rem', fontWeight: 300 }}>
                            {data.bio?.summary}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={600}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
                            {data.bio?.email && <a href={`mailto:${data.bio.email}`} className="glow-btn">{data.bio.email}</a>}
                            {data.bio?.location && <span className="glow-btn">{data.bio.location}</span>}
                            {data.bio?.phone && <span className="glow-btn">{data.bio.phone}</span>}
                        </div>
                    </ScrollReveal>
                </header>

                {/* Stats */}
                {stats.length > 0 && (
                    <section style={{ marginBottom: '8rem', padding: '0 1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, gap: '2rem' }}>
                            {stats.map((stat, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                    <div style={{ padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.05)`, borderRadius: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="hover-glow-card">
                                        <div style={{ fontSize: '4rem', fontWeight: 600, color: '#fff', lineHeight: 1, fontFamily: theme.fonts.display, marginBottom: '1rem', textShadow: `0 0 20px ${c.accent}` }}>{stat.value}{stat.suffix}</div>
                                        <div style={{ fontSize: '0.85rem', color: c.accentAlt, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>{stat.label}</div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects?.length > 0 && (
                    <section id="projects" style={{ marginBottom: '8rem' }}>
                        <ScrollReveal>
                            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '3rem', fontWeight: 600, color: '#fff' }}>Selected Works</h2>
                                <div style={{ width: '40px', height: '4px', background: c.accentAlt, margin: '1.5rem auto 0', borderRadius: '2px' }} />
                            </div>
                        </ScrollReveal>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
                            {data.projects.map((project, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i % 2 === 0 ? 0 : 150}>
                                    <div className="hover-glow-card" style={{ padding: '3rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: `linear-gradient(90deg, ${c.accentAlt}, ${c.accent})`, opacity: 0, transition: 'opacity 0.3s' }} className="card-top-glow" />

                                        <h3 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#fff', marginBottom: '1rem', fontFamily: theme.fonts.display }}>{project.name}</h3>
                                        <p style={{ color: c.muted, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', flexGrow: 1, fontWeight: 300 }}>{project.description}</p>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                            {project.technologies?.map((tech, j) => (
                                                <span key={j} style={{ padding: '0.4rem 0.8rem', background: 'rgba(217,70,239,0.1)', border: `1px solid rgba(217,70,239,0.2)`, borderRadius: '100px', fontSize: '0.8rem', color: '#fff', fontWeight: 400 }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Vertical Split for Experience & Skills */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '6rem', marginBottom: '8rem' }}>

                    {/* Experience */}
                    {data.experience?.length > 0 && (
                        <section id="experience">
                            <ScrollReveal>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.2rem', fontWeight: 600, color: '#fff', marginBottom: '3rem' }}>Experience</h2>
                            </ScrollReveal>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {data.experience.map((exp, i) => (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                        <div className="hover-glow-text">
                                            <div style={{ fontSize: '0.9rem', color: c.accent, fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{exp.duration}</div>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>{exp.role}</h3>
                                            <h4 style={{ fontSize: '1.1rem', color: c.accentAlt, marginBottom: '1rem', fontFamily: theme.fonts.display }}>{exp.company}</h4>
                                            {exp.highlights?.length > 0 && (
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                    {exp.highlights.map((h, j) => (
                                                        <li key={j} style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: c.muted, lineHeight: 1.6, fontSize: '0.95rem' }}>
                                                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '6px', height: '6px', borderRadius: '50%', background: c.accent }} />
                                                            {h}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                        {/* Education */}
                        {data.education?.length > 0 && (
                            <section id="education">
                                <ScrollReveal>
                                    <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.2rem', fontWeight: 600, color: '#fff', marginBottom: '3rem' }}>Education</h2>
                                </ScrollReveal>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                    {data.education.map((edu, i) => (
                                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                            <div className="hover-glow-text">
                                                <div style={{ fontSize: '0.9rem', color: c.muted, fontWeight: 600, marginBottom: '0.5rem' }}>{edu.year}</div>
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                                                <h4 style={{ fontSize: '1.1rem', color: c.accentAlt, fontFamily: theme.fonts.display }}>{edu.institution}</h4>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills?.length > 0 && (
                            <section id="skills">
                                <ScrollReveal>
                                    <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.2rem', fontWeight: 600, color: '#fff', marginBottom: '3rem' }}>Skills</h2>
                                </ScrollReveal>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                    {data.skills.map((group, i) => (
                                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                            <div>
                                                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: c.accent, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    {group.category}
                                                </h3>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                                    {group.items?.map((skill, j) => (
                                                        <span key={j} style={{ padding: '0.5rem 1rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '12px', fontSize: '0.9rem', color: '#fff', transition: 'all 0.3s ease' }} className="hover-skill">
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
                    </div>
                </div>

                <footer style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, padding: '4rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '4px', background: `linear-gradient(90deg, ${c.accentAlt}, ${c.accent})`, borderRadius: '2px' }} />
                    <p style={{ letterSpacing: '0.05em', color: c.muted, fontSize: '0.85rem' }}>BUILT WITH RESUMEFORGE</p>
                    <a href="#/privacy" style={{ color: c.accentAlt, textDecoration: 'none', fontSize: '0.9rem' }} className="hover-glow-text">Privacy Policy</a>
                </footer>
            </div>

            <style jsx>{`
                .glow-btn {
                    padding: 0.8rem 1.8rem;
                    background: ${c.card};
                    border: 1px solid ${c.border};
                    border-radius: 100px;
                    text-decoration: none;
                    color: #fff;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 0 rgba(217,70,239,0);
                }
                .glow-btn:hover {
                    border-color: ${c.accent};
                    background: rgba(217,70,239,0.1);
                    box-shadow: 0 0 20px rgba(217,70,239,0.3);
                    transform: translateY(-2px);
                }
                .hover-glow-card {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .hover-glow-card:hover {
                    border-color: ${c.accentAlt};
                    box-shadow: 0 10px 40px rgba(192,132,252,0.15);
                    transform: translateY(-5px);
                }
                .hover-glow-card:hover .card-top-glow {
                    opacity: 1 !important;
                }
                .hover-glow-text {
                    transition: transform 0.3s ease;
                }
                .hover-glow-text:hover {
                    transform: translateX(10px);
                }
                .hover-skill:hover {
                    background: rgba(217,70,239,0.15) !important;
                    border-color: ${c.accent} !important;
                    box-shadow: 0 0 15px rgba(217,70,239,0.2);
                    transform: translateY(-2px);
                }
                .velvet-nav-link {
                    padding: 0.6rem 1.4rem;
                    border-radius: 100px;
                    color: ${c.muted};
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .velvet-nav-link:hover {
                    color: #fff;
                    background: rgba(217,70,239,0.2);
                    text-shadow: 0 0 10px ${c.accent};
                }
            `}</style>
        </div>
    );
}

function extractStats(data) {
    const stats = [];
    if (data.experience?.length) stats.push({ value: data.experience.length, suffix: '+', label: 'Roles' });
    if (data.projects?.length) stats.push({ value: data.projects.length, suffix: '+', label: 'Projects' });
    const totalSkills = data.skills?.reduce((sum, g) => sum + (g.items?.length || 0), 0) || 0;
    if (totalSkills) stats.push({ value: totalSkills, suffix: '+', label: 'Skills' });
    return stats;
}
