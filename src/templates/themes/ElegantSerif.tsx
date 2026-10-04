import ScrollReveal from '../shared/ScrollReveal';
import AnimatedCounter from '../shared/AnimatedCounter';
import ParallaxSection from '../shared/ParallaxSection';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 8: Elegant Serif
 * Luxury editorial/magazine style with serif fonts, gold accents, parallax.
 */
export default function ElegantSerif({ data, recruiterMode }) {
    const theme = getTheme('elegant-serif');
    const c = theme.colors;
    const stats = extractStats(data);
    const gold = c.accentDark;

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh' }}>
            <div style={{ position: 'fixed', inset: 0, backgroundImage: `radial-gradient(${gold}04 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none', zIndex: 0 }} />

            {/* Hero */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <nav style={{ position: 'absolute', top: '2rem', display: 'flex', gap: '3rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="serif-nav-link" style={{ color: gold, textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.2em' }}>EXPERIENCE</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="serif-nav-link" style={{ color: gold, textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.2em' }}>PROJECTS</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="serif-nav-link" style={{ color: gold, textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.2em' }}>SKILLS</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="serif-nav-link" style={{ color: gold, textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.2em' }}>EDUCATION</SectionLink>}
                </nav>

                <ParallaxSection speed={0.15}>
                    <ScrollReveal animation="fade">
                        <div style={{ width: '60px', height: '1px', background: gold, margin: '0 auto 2rem' }} />
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={100}>
                        <p style={{ fontSize: '1rem', color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Portfolio</p>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={200}>
                        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            {data.bio?.name || 'Your Name'}
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={300}>
                        <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontFamily: theme.fonts.display, fontStyle: 'italic', color: c.mutedDark, maxWidth: '600px', margin: '0 auto' }}>{data.bio?.title}</p>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={400}>
                        <div style={{ width: '40px', height: '1px', background: gold, margin: '2rem auto' }} />
                        <p style={{ fontSize: '1rem', color: c.mutedDark, maxWidth: '550px', margin: '0 auto', lineHeight: 2 }}>{data.bio?.summary}</p>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={500}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
                            {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                                <span key={i} style={{ fontSize: '0.9rem', color: c.mutedDark, letterSpacing: '0.05em', borderBottom: `1px solid ${gold}30`, paddingBottom: '0.25rem', transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.target.style.borderColor = gold; e.target.style.color = c.textDark; }}
                                    onMouseLeave={e => { e.target.style.borderColor = `${gold}30`; e.target.style.color = c.mutedDark; }}>{item}</span>
                            ))}
                        </div>
                    </ScrollReveal>
                </ParallaxSection>
            </section>

            {/* Stats */}
            {stats.length > 0 && (
                <section style={{ padding: '4rem 2rem', borderTop: `1px solid ${c.borderDark}`, borderBottom: `1px solid ${c.borderDark}`, position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 300, fontFamily: theme.fonts.display, color: gold }}><AnimatedCounter end={stat.value} suffix={stat.suffix} /></div>
                                    <div style={{ fontSize: '0.7rem', color: c.mutedDark, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.25em' }}>{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <p style={{ fontSize: '0.75rem', color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Career</p>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 400, fontStyle: 'italic' }}>Experience</h2>
                            <div style={{ width: '40px', height: '1px', background: gold, margin: '1.5rem auto 0' }} />
                        </div>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ borderTop: `1px solid ${c.borderDark}`, padding: '2.5rem 0', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '3rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: c.mutedDark }}>{exp.duration}</p>
                                    <p style={{ color: gold, fontWeight: 500, marginTop: '0.5rem', fontStyle: 'italic' }}>{exp.company}</p>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.4rem', fontWeight: 400, marginBottom: '1rem' }}>{exp.role}</h3>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {exp.highlights?.map((h, j) => (
                                            <li key={j} style={{ marginBottom: '0.75rem', color: c.mutedDark, lineHeight: 1.8, paddingLeft: '1.5rem', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: 0, top: '0.6rem', width: '6px', height: '1px', background: gold }} />{h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <p style={{ fontSize: '0.75rem', color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Expertise</p>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 400, fontStyle: 'italic' }}>Skills</h2>
                            <div style={{ width: '40px', height: '1px', background: gold, margin: '1.5rem auto 0' }} />
                        </div>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: gold, marginBottom: '1.25rem' }}>{group.category}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', border: `1px solid ${c.borderDark}`, color: c.mutedDark, transition: 'all 0.3s', cursor: 'default' }}
                                                onMouseEnter={e => { e.target.style.borderColor = gold; e.target.style.color = gold; }}
                                                onMouseLeave={e => { e.target.style.borderColor = c.borderDark; e.target.style.color = c.mutedDark; }}>{skill}</span>
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
                <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <p style={{ fontSize: '0.75rem', color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Selected</p>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 400, fontStyle: 'italic' }}>Projects</h2>
                            <div style={{ width: '40px', height: '1px', background: gold, margin: '1.5rem auto 0' }} />
                        </div>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ padding: '2rem', border: `1px solid ${c.borderDark}`, borderRadius: '4px', height: '100%', transition: 'all 0.4s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.borderDark; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                    <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.75rem' }}>{project.name}</h3>
                                    <p style={{ color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ fontSize: '0.75rem', fontWeight: 500, color: gold, fontStyle: 'italic' }}>{tech}{j < project.technologies.length - 1 ? ' ·' : ''}</span>
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
                <section id="education" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <p style={{ fontSize: '0.75rem', color: gold, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Academic</p>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 400, fontStyle: 'italic' }}>Education</h2>
                            <div style={{ width: '40px', height: '1px', background: gold, margin: '1.5rem auto 0' }} />
                        </div>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ borderTop: `1px solid ${c.borderDark}`, padding: '2rem 0' }}>
                                <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.3rem', fontWeight: 400 }}>{edu.institution}</h3>
                                <p style={{ color: gold, fontStyle: 'italic', marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.85rem', marginTop: '0.5rem' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .serif-nav-link:hover {
                    color: ${c.textDark} !important;
                    font-style: italic;
                }
            `}</style>

            <footer style={{ borderTop: `1px solid ${c.borderDark}`, textAlign: 'center', padding: '3rem', position: 'relative', zIndex: 1 }}>
                <div style={{ width: '30px', height: '1px', background: gold, margin: '0 auto 1.5rem' }} />
                <p style={{ color: c.mutedDark, fontSize: '0.8rem', letterSpacing: '0.1em' }}>Built with ResumeForge</p>
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
