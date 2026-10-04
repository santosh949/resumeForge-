import ScrollReveal from '../shared/ScrollReveal';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Obsidian Glass Theme
 * Dark mode default, deep slate tones tailored for glassmorphism styling.
 * Premium features: backdrop blur, glowing borders, sleek aesthetic.
 */
export default function ObsidianGlass({ data }) {
    const theme = getTheme('obsidian-glass');
    const c = theme.colors;
    const stats = extractStats(data);

    return (
        <div style={{ background: `linear-gradient(135deg, ${c.bg} 0%, #080f26 100%)`, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', paddingBottom: '4rem', overflowX: 'hidden' }}>

            {/* Ambient Lighting */}
            <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, rgba(0,0,0,0) 60%)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(0,0,0,0) 60%)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

            {/* Premium Dark Glass Navigation */}
            <nav style={{ position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '0.4rem', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(16px)', padding: '0.4rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
                {data.experience?.length > 0 && <SectionLink targetId="experience" className="obsidian-nav-link">Experience</SectionLink>}
                {data.projects?.length > 0 && <SectionLink targetId="projects" className="obsidian-nav-link">Projects</SectionLink>}
                {data.skills?.length > 0 && <SectionLink targetId="skills" className="obsidian-nav-link">Skills</SectionLink>}
                {data.education?.length > 0 && <SectionLink targetId="education" className="obsidian-nav-link">Education</SectionLink>}
            </nav>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header / Hero */}
                <header style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 0' }}>
                    <ScrollReveal animation="fade-up">
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.border}`, borderRadius: '100px', fontSize: '0.85rem', color: c.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
                            Portfolio
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={100}>
                        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.5rem', background: `linear-gradient(to right, ${c.text}, ${c.muted})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {data.bio?.name || 'Your Name'}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={200}>
                        <p style={{ fontSize: '1.5rem', color: c.accentAlt, fontWeight: 300, marginBottom: '2.5rem', maxWidth: '800px' }}>
                            {data.bio?.title}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={300}>
                        <p style={{ fontSize: '1.1rem', color: c.muted, maxWidth: '600px', lineHeight: 1.8, marginBottom: '3rem', fontWeight: 300 }}>
                            {data.bio?.summary}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={400}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: c.accent }}>
                            {data.bio?.email && <a href={`mailto:${data.bio.email}`} className="glass-link">{data.bio.email}</a>}
                            {data.bio?.location && <span className="glass-link">{data.bio.location}</span>}
                            {data.bio?.phone && <span className="glass-link">{data.bio.phone}</span>}
                        </div>
                    </ScrollReveal>
                </header>

                {/* Stats */}
                {stats.length > 0 && (
                    <section style={{ marginBottom: '8rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, gap: '1px', background: c.border, borderRadius: '24px', overflow: 'hidden' }}>
                            {stats.map((stat, i) => (
                                <ScrollReveal key={i} animation="fade-in" delay={i * 150}>
                                    <div style={{ background: c.card, backdropFilter: 'blur(20px)', padding: '3rem 2rem', textAlign: 'center', height: '100%' }}>
                                        <div style={{ fontSize: '3.5rem', fontWeight: 600, color: c.text, lineHeight: 1, fontFamily: theme.fonts.display, marginBottom: '0.5rem' }}>{stat.value}{stat.suffix}</div>
                                        <div style={{ fontSize: '0.85rem', color: c.accentAlt, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>{stat.label}</div>
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
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 600, marginBottom: '3rem', color: c.text, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                Selected Works <span style={{ flexGrow: 1, height: '1px', background: `linear-gradient(to right, ${c.border}, transparent)` }} />
                            </h2>
                        </ScrollReveal>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {data.projects.map((project, i) => (
                                <ScrollReveal key={i} animation="fade-up">
                                    <div className="glass-card group" style={{ padding: '3rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                                        {/* Hover Gradient Effect */}
                                        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)`, opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:opacity-100 hidden sm:block pointer-events-none" />

                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: 500, color: c.text, marginBottom: '1rem', fontFamily: theme.fonts.display }}>{project.name}</h3>
                                            <p style={{ color: c.muted, fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px', fontWeight: 300 }}>{project.description}</p>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                                {project.technologies?.map((tech, j) => (
                                                    <span key={j} style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '100px', fontSize: '0.85rem', color: c.accent, fontWeight: 400 }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience & Education Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', marginBottom: '8rem' }}>

                    {/* Experience */}
                    {data.experience?.length > 0 && (
                        <section id="experience">
                            <ScrollReveal>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2rem', fontWeight: 600, marginBottom: '2.5rem', color: c.text }}>Experience</h2>
                            </ScrollReveal>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {data.experience.map((exp, i) => (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                        <div style={{ paddingLeft: '1.5rem', borderLeft: `1px solid ${c.border}`, position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '-5px', top: '8px', width: '9px', height: '9px', borderRadius: '50%', background: c.accentAlt, boxShadow: `0 0 10px ${c.accentAlt}` }} />
                                            <span style={{ fontSize: '0.85rem', color: c.accent, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{exp.duration}</span>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: c.text, marginBottom: '0.25rem' }}>{exp.role}</h3>
                                            <h4 style={{ fontSize: '1rem', color: c.muted, marginBottom: '1rem' }}>{exp.company}</h4>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section id="education">
                            <ScrollReveal>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2rem', fontWeight: 600, marginBottom: '2.5rem', color: c.text }}>Education</h2>
                            </ScrollReveal>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {data.education.map((edu, i) => (
                                    <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                        <div style={{ paddingLeft: '1.5rem', borderLeft: `1px solid ${c.border}`, position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '-5px', top: '8px', width: '9px', height: '9px', borderRadius: '50%', background: c.muted, border: `2px solid ${c.bg}` }} />
                                            <span style={{ fontSize: '0.85rem', color: c.muted, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{edu.year}</span>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: c.text, marginBottom: '0.25rem' }}>{edu.degree}</h3>
                                            <h4 style={{ fontSize: '1rem', color: c.accentAlt, marginBottom: '0.5rem' }}>{edu.institution}</h4>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <section id="skills" style={{ marginBottom: '8rem' }}>
                        <ScrollReveal>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 600, marginBottom: '3rem', color: c.text, textAlign: 'center' }}>Skills & Expertise</h2>
                        </ScrollReveal>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {data.skills.map((group, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                                    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '2rem', height: '100%', backdropFilter: 'blur(10px)' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 500, color: c.accent, marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                            {group.category}
                                        </h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {group.items?.map((skill, j) => (
                                                <span key={j} style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.05)`, borderRadius: '6px', fontSize: '0.9rem', color: c.muted, transition: 'color 0.2s, background 0.2s' }} className="hover:text-white hover:bg-white/10">
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

                <footer style={{ borderTop: `1px solid ${c.border}`, padding: '4rem 0', textAlign: 'center', color: c.muted, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ letterSpacing: '0.05em' }}>BUILT WITH RESUMEFORGE</p>
                    <a href="#/privacy" style={{ color: c.muted, textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Privacy Policy</a>
                </footer>
            </div>

            <style jsx>{`
                .glass-link {
                    padding: 0.6rem 1.2rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 100px;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                .glass-link:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.2);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .glass-card {
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .glass-card:hover {
                    border-color: rgba(255,255,255,0.2) !important;
                }
                .hover\\:text-white:hover { color: #fff !important; }
                .hover\\:bg-white\\/10:hover { background: rgba(255,255,255,0.1) !important; }
                .group:hover .group-hover\\:opacity-100 { opacity: 1 !important; }
                .hidden\\.sm\\:block { display: none !important; }
                @media (min-width: 640px) {
                    .hidden\\.sm\\:block { display: block !important; }
                }
                .obsidian-nav-link {
                    padding: 0.5rem 1.25rem;
                    border-radius: 100px;
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                .obsidian-nav-link:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                    text-shadow: 0 0 10px rgba(255,255,255,0.5);
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
