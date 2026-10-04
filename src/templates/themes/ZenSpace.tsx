import ScrollReveal from '../shared/ScrollReveal';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Zen Space Theme
 * Monochrome brutalist-lite. Massive typography, very sparse layout.
 * Premium features: high contrast block reveals, inverted hover states.
 */
export default function ZenSpace({ data }) {
    const theme = getTheme('zen-space');
    const c = theme.colors;

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', overflowX: 'hidden' }}>

            {/* Premium Brutalist Navigation */}
            <nav style={{ position: 'fixed', top: '1.5rem', right: '2rem', zIndex: 100, display: 'flex', flexDirection: 'column', border: `3px solid ${c.text}`, background: c.bg, boxShadow: `6px 6px 0 ${c.text}` }}>
                {data.experience?.length > 0 && <SectionLink targetId="experience" className="zen-nav-link">EXP</SectionLink>}
                {data.projects?.length > 0 && <SectionLink targetId="projects" className="zen-nav-link">WORK</SectionLink>}
                {data.skills?.length > 0 && <SectionLink targetId="skills" className="zen-nav-link">SKILL</SectionLink>}
                {data.education?.length > 0 && <SectionLink targetId="education" className="zen-nav-link">EDU</SectionLink>}
            </nav>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '8rem', maxWidth: '1400px', margin: '0 auto' }}>

                {/* Minimal Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', paddingTop: '4rem' }}>
                    <ScrollReveal>
                        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(4rem, 12vw, 10rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.85, textTransform: 'uppercase', color: c.text, margin: 0 }}>
                            {data.bio?.name?.split(' ')[0] || 'YOUR'}
                            <br />
                            {data.bio?.name?.split(' ').slice(1).join(' ') || 'NAME'}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: c.accentAlt, fontFamily: theme.fonts.display }}>{data.bio?.title}</h2>
                            <p style={{ fontSize: '1.1rem', color: c.muted, lineHeight: 1.6 }}>{data.bio?.summary}</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                                {data.bio?.email && <a href={`mailto:${data.bio.email}`} className="hover-invert" style={{ display: 'inline-block', padding: '0.5rem 1rem', border: `2px solid ${c.text}`, color: c.text, textDecoration: 'none', fontWeight: 600, width: 'fit-content' }}>{data.bio.email}</a>}
                                {data.bio?.location && <span style={{ fontWeight: 600, color: c.text, padding: '0.5rem 0' }}>{data.bio.location}</span>}
                            </div>
                        </div>
                    </ScrollReveal>
                </header>

                <div style={{ width: '100%', height: '4px', background: c.text }} />

                {/* Selected Work */}
                {data.projects?.length > 0 && (
                    <section id="projects">
                        <ScrollReveal>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4rem', color: c.text }}>Selected Work /</h2>
                        </ScrollReveal>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border }}>
                            {data.projects.map((project, i) => (
                                <ScrollReveal key={i} animation="fade-up">
                                    <div className="project-row" style={{ background: c.bg, padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '4rem', alignItems: 'center', transition: 'all 0.4s ease' }}>
                                        <div>
                                            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: c.text, fontFamily: theme.fonts.display, marginBottom: '1rem', lineHeight: 1.1 }}>{project.name}</h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {project.technologies?.slice(0, 3).map((tech, j) => (
                                                    <span key={j} style={{ fontSize: '0.85rem', fontWeight: 600, color: c.accentAlt, textTransform: 'uppercase' }}>
                                                        {tech}{j < Math.min(project.technologies.length, 3) - 1 ? ' • ' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '1.25rem', color: c.muted, lineHeight: 1.6, maxWidth: '800px' }}>
                                            {project.description}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience & Education */}
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '6rem' }}>

                    {data.experience?.length > 0 && (
                        <div id="experience">
                            <ScrollReveal>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3rem', color: c.text }}>Experience /</h2>
                            </ScrollReveal>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {data.experience.map((exp, i) => (
                                    <ScrollReveal key={i} animation="fade-up">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: c.text }}>{exp.role}</h3>
                                                <span style={{ fontSize: '1rem', fontWeight: 600, color: c.accentAlt }}>{exp.duration}</span>
                                            </div>
                                            <h4 style={{ fontSize: '1.2rem', color: c.muted, fontWeight: 500 }}>{exp.company}</h4>
                                            {exp.highlights?.length > 0 && (
                                                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                                    {exp.highlights.map((h, j) => (
                                                        <li key={j} style={{ position: 'relative', paddingLeft: '1.5rem', marginBottom: '0.5rem', color: c.muted, lineHeight: 1.6 }}>
                                                            <span style={{ position: 'absolute', left: 0, top: '0', fontWeight: 800, color: c.text }}>+</span>
                                                            {h}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        {data.education?.length > 0 && (
                            <div style={{ marginBottom: '6rem' }} id="education">
                                <ScrollReveal>
                                    <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3rem', color: c.text }}>Education /</h2>
                                </ScrollReveal>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    {data.education.map((edu, i) => (
                                        <ScrollReveal key={i} animation="fade-up">
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: c.text }}>{edu.degree}</h3>
                                                    <span style={{ fontSize: '1rem', fontWeight: 600, background: c.accentAlt, color: c.bg, padding: '0.2rem 0.5rem' }}>{edu.year}</span>
                                                </div>
                                                <h4 style={{ fontSize: '1.2rem', color: c.muted, fontWeight: 500 }}>{edu.institution}</h4>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.skills?.length > 0 && (
                            <div id="skills">
                                <ScrollReveal>
                                    <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3rem', color: c.text }}>Skills /</h2>
                                </ScrollReveal>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {data.skills.map((group, i) => (
                                        <ScrollReveal key={i} animation="fade-up">
                                            <div>
                                                <h3 style={{ fontSize: '1rem', color: c.accentAlt, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '1rem' }}>{group.category}</h3>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    {group.items?.map((skill, j) => (
                                                        <span key={j} style={{ padding: '0.5rem 1rem', border: `1px solid ${c.border}`, fontSize: '1rem', color: c.text, fontWeight: 600, borderRadius: '0' }}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </section>

                <footer style={{ marginTop: '4rem', padding: '4rem 0', borderTop: `4px solid ${c.text}`, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: theme.fonts.display, color: c.text, textTransform: 'uppercase' }}>
                        ResumeForge.
                    </div>
                    <a href="#/privacy" className="hover-invert" style={{ display: 'inline-block', padding: '0.5rem 1rem', border: `2px solid ${c.text}`, color: c.text, textDecoration: 'none', fontWeight: 600 }}>Privacy</a>
                </footer>
            </div>

            <style jsx>{`
                .hover-invert {
                    transition: all 0.2s ease;
                }
                .hover-invert:hover {
                    background: ${c.text} !important;
                    color: ${c.bg} !important;
                }
                .project-row:hover {
                    background: ${c.text} !important;
                }
                .project-row:hover h3, .project-row:hover p, .project-row:hover span {
                    color: ${c.bg} !important;
                }
                @media (max-width: 900px) {
                    .project-row {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                        padding: 3rem 1.5rem !important;
                    }
                }
                .zen-nav-link {
                    padding: 0.75rem 1.5rem;
                    color: ${c.text};
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 800;
                    border-bottom: 2px solid ${c.text};
                    transition: all 0.2s ease;
                }
                .zen-nav-link:last-child {
                    border-bottom: none;
                }
                .zen-nav-link:hover {
                    background: ${c.text};
                    color: ${c.bg};
                }
            `}</style>
        </div>
    );
}
