import ScrollReveal from '../shared/ScrollReveal';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Arctic Mesh Theme
 * Clean white minimalist with stark contrast and an icy blue mesh gradient accent.
 * Premium features: mesh gradients, brutalist typography scale, sticky positioning.
 */
export default function ArcticMesh({ data }) {
    const theme = getTheme('arctic-mesh');
    const c = theme.colors;

    // Convert skills to a flat list for a ticker/marquee effect
    const allSkills = data.skills?.reduce((acc, curr) => [...acc, ...(curr.items || [])], []) || [];

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', overflowX: 'hidden' }}>

            {/* Top Mesh Gradient Bar */}
            <div style={{ height: '8px', width: '100%', background: `linear-gradient(90deg, ${c.accent} 0%, ${c.accentAlt} 100%)` }} />

            {/* Premium Arctic Navigation */}
            <nav style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.experience?.length > 0 && <SectionLink targetId="experience" className="arctic-nav-link">Exp.</SectionLink>}
                {data.projects?.length > 0 && <SectionLink targetId="projects" className="arctic-nav-link">Work.</SectionLink>}
                {data.skills?.length > 0 && <SectionLink targetId="skills" className="arctic-nav-link">Skills.</SectionLink>}
                {data.education?.length > 0 && <SectionLink targetId="education" className="arctic-nav-link">Edu.</SectionLink>}
            </nav>

            <div style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>

                {/* Hero */}
                <header style={{ padding: '4rem 0 8rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <ScrollReveal animation="fade-right">
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `linear-gradient(135deg, ${c.accent}, ${c.accentAlt})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: theme.fonts.display }}>
                            {(data.bio?.name || 'A').charAt(0).toUpperCase()}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={100}>
                        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, textTransform: 'uppercase', color: c.text, maxWidth: '1000px' }}>
                            {data.bio?.name || 'Your Name'}
                        </h1>
                    </ScrollReveal>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem' }}>
                        <ScrollReveal animation="fade-up" delay={200}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', color: c.accent, fontWeight: 600, marginBottom: '1rem', fontFamily: theme.fonts.display }}>
                                    {data.bio?.title}
                                </h2>
                                <p style={{ fontSize: '1.1rem', color: c.muted, lineHeight: 1.7, fontWeight: 400 }}>
                                    {data.bio?.summary}
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-left" delay={300}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: `2px solid ${c.border}`, paddingLeft: '2rem' }}>
                                <div style={{ fontSize: '0.85rem', color: c.muted, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Contact</div>
                                {data.bio?.email && <a href={`mailto:${data.bio.email}`} className="hover-link" style={{ fontSize: '1.1rem', color: c.text, textDecoration: 'none', fontWeight: 500 }}>{data.bio.email}</a>}
                                {data.bio?.location && <div style={{ fontSize: '1.1rem', color: c.text, fontWeight: 500 }}>{data.bio.location}</div>}
                            </div>
                        </ScrollReveal>
                    </div>
                </header>

                <hr style={{ border: 'none', height: '1px', background: c.border, margin: '0 0 6rem 0' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '4rem' }} className="responsive-grid">

                    {/* Left Sticky Column */}
                    <div>
                        <div style={{ position: 'sticky', top: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <ScrollReveal>
                                <div id="skills">
                                    <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.2rem', fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Expertise</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {allSkills.slice(0, 15).map((skill, i) => (
                                            <span key={i} style={{ padding: '0.3rem 0.6rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '4px', fontSize: '0.85rem', color: c.muted, fontWeight: 500 }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {data.education?.length > 0 && (
                                <ScrollReveal>
                                    <div id="education">
                                        <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.2rem', fontWeight: 700, color: c.text, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Education</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {data.education.map((edu, i) => (
                                                <div key={i}>
                                                    <div style={{ fontSize: '0.8rem', color: c.accent, fontWeight: 600, marginBottom: '0.2rem' }}>{edu.year}</div>
                                                    <div style={{ fontSize: '1rem', color: c.text, fontWeight: 600 }}>{edu.degree}</div>
                                                    <div style={{ fontSize: '0.9rem', color: c.muted }}>{edu.institution}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            )}
                        </div>
                    </div>

                    {/* Right Content Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>

                        {/* Projects / Work */}
                        {data.projects?.length > 0 && (
                            <section id="projects">
                                <ScrollReveal>
                                    <h2 style={{ fontFamily: theme.fonts.display, fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em', color: c.text, marginBottom: '3rem' }}>Selected Works.</h2>
                                </ScrollReveal>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                                    {data.projects.map((project, i) => (
                                        <ScrollReveal key={i} animation="fade-up">
                                            <div className="project-card group" style={{ position: 'relative', padding: '3rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '12px', overflow: 'hidden' }}>

                                                {/* Decorative Mesh background on hover */}
                                                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 100% 100%, ${c.card} 0%, transparent 60%)`, opacity: 0, transition: 'opacity 0.4s ease', zIndex: 0 }} className="group-hover:opacity-100" />

                                                <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '2rem' }} className="responsive-inner-grid">
                                                    <div>
                                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: c.text, marginBottom: '1rem', fontFamily: theme.fonts.display }}>{project.name}</h3>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                            {project.technologies?.slice(0, 4).map((tech, j) => (
                                                                <span key={j} style={{ fontSize: '0.8rem', color: c.accent, fontWeight: 600, background: `${c.accent}15`, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p style={{ color: c.muted, fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 400 }}>{project.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience?.length > 0 && (
                            <section id="experience">
                                <ScrollReveal>
                                    <h2 style={{ fontFamily: theme.fonts.display, fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em', color: c.text, marginBottom: '3rem' }}>Experience.</h2>
                                </ScrollReveal>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {data.experience.map((exp, i) => (
                                        <ScrollReveal key={i} animation="fade-up">
                                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) 3fr', gap: '2rem', padding: '3rem 0', borderTop: `1px solid ${c.border}` }} className="responsive-inner-grid">
                                                <div>
                                                    <div style={{ fontSize: '1rem', color: c.accent, fontWeight: 600, marginBottom: '0.5rem' }}>{exp.duration}</div>
                                                    <div style={{ fontSize: '1.1rem', color: c.muted, fontWeight: 500 }}>{exp.company}</div>
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: c.text, marginBottom: '1.5rem', fontFamily: theme.fonts.display }}>{exp.role}</h3>
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                        {exp.highlights?.map((h, j) => (
                                                            <li key={j} style={{ paddingLeft: '1.5rem', position: 'relative', color: c.text, lineHeight: 1.7, fontSize: '1.05rem', fontWeight: 400 }}>
                                                                <span style={{ position: 'absolute', left: 0, top: '10px', width: '6px', height: '2px', background: c.accent }} />
                                                                {h}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                <footer style={{ marginTop: '8rem', borderTop: `1px solid ${c.border}`, padding: '4rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: theme.fonts.display, letterSpacing: '-0.05em' }}>
                        {(data.bio?.name || 'PORTFOLIO').toUpperCase()}
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500, color: c.muted }}>
                        <span>Powered by ResumeForge</span>
                        <a href="#/privacy" style={{ color: c.text, textDecoration: 'none' }} className="hover-link">Privacy</a>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                .hover-link {
                    background-image: linear-gradient(currentColor, currentColor);
                    background-position: 0% 100%;
                    background-repeat: no-repeat;
                    background-size: 0% 2px;
                    transition: background-size 0.3s;
                }
                .hover-link:hover {
                    background-size: 100% 2px;
                }
                .project-card {
                    transition: transform 0.3s ease, border-color 0.3s ease;
                }
                .project-card:hover {
                    border-color: ${c.accent};
                    transform: translateY(-4px);
                }
                .group:hover .group-hover\\:opacity-100 { opacity: 1 !important; }
                
                @media (max-width: 900px) {
                    .responsive-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .responsive-grid > div:first-child > div {
                        position: relative !important;
                        top: 0 !important;
                    }
                }
                    .responsive-inner-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
                .arctic-nav-link {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: ${c.bg};
                    border: 1px solid ${c.border};
                    color: ${c.text};
                    text-decoration: none;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    transition: all 0.2s ease;
                }
                .arctic-nav-link:hover {
                    background: ${c.accent};
                    color: white;
                    border-color: ${c.accent};
                    transform: translateX(-4px);
                }
            `}</style>
        </div>
    );
}
