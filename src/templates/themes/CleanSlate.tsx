import ScrollReveal from '../shared/ScrollReveal';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Clean Slate Theme
 * Minimalist, highly professional theme focused on readability.
 */
export default function CleanSlate({ data }) {
    const theme = getTheme('clean-slate');
    const c = theme.colors;

    const stats = extractStats(data);

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', paddingBottom: '4rem' }}>

            {/* Header / Hero */}
            <header className="theme-header-padding" style={{ padding: '4rem 2rem 6rem', maxWidth: '1000px', margin: '0 auto' }}>
                <nav style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', fontSize: '0.9rem', fontWeight: 600, borderBottom: `1px solid ${c.border}`, paddingBottom: '1rem' }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" style={{ color: c.muted, textDecoration: 'none', transition: 'color 0.2s' }} className="hover-accent">Experience</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" style={{ color: c.muted, textDecoration: 'none', transition: 'color 0.2s' }} className="hover-accent">Projects</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" style={{ color: c.muted, textDecoration: 'none', transition: 'color 0.2s' }} className="hover-accent">Skills</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" style={{ color: c.muted, textDecoration: 'none', transition: 'color 0.2s' }} className="hover-accent">Education</SectionLink>}
                </nav>

                <ScrollReveal animation="fade-up">
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: c.text }}>
                        {data.bio?.name || 'Your Name'}
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100}>
                    <p style={{ fontSize: '1.25rem', color: c.accent, fontWeight: 600, marginBottom: '1.5rem' }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: '1rem', color: c.muted, maxWidth: '700px', lineHeight: 1.7, marginBottom: '2rem' }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: c.muted, fontWeight: 500 }}>
                        {data.bio?.email && <span>{data.bio.email}</span>}
                        {data.bio?.location && <span>{data.bio.location}</span>}
                        {data.bio?.phone && <span>{data.bio.phone}</span>}
                    </div>
                </ScrollReveal>
            </header>

            {/* Stats */}
            {stats.length > 0 && (
                <section className="theme-section-padding" style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="theme-grid-2col" style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`, gap: '2rem' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: c.text, lineHeight: 1 }}>{stat.value}{stat.suffix}</div>
                                    <div style={{ fontSize: '0.8rem', color: c.muted, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" className="theme-section-padding" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: c.text, borderBottom: `2px solid ${c.border}`, paddingBottom: '0.5rem' }}>Experience</h2>
                    </ScrollReveal>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {data.experience.map((exp, i) => (
                            <ScrollReveal key={i} animation="fade-up">
                                <div className="theme-grid-1col" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 3fr', gap: '2rem', alignItems: 'start' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: c.text }}>{exp.company}</h3>
                                        <p style={{ fontSize: '0.9rem', color: c.muted, marginTop: '0.25rem' }}>{exp.duration}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: c.accent, marginBottom: '1rem' }}>{exp.role}</h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {exp.highlights?.map((h, j) => (
                                                <li key={j} style={{ paddingLeft: '1.25rem', position: 'relative', marginBottom: '0.5rem', color: c.text, lineHeight: 1.6, fontSize: '0.95rem' }}>
                                                    <span style={{ position: 'absolute', left: 0, color: c.accent }}>•</span>
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

            {/* Projects */}
            {data.projects?.length > 0 && (
                <section id="projects" className="theme-section-padding" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: c.text, borderBottom: `2px solid ${c.border}`, paddingBottom: '0.5rem' }}>Projects</h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up">
                                <div style={{ padding: '1.5rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: c.text, marginBottom: '0.5rem' }}>{project.name}</h3>
                                    <p style={{ color: c.muted, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: `1px solid ${c.border}`, borderRadius: '4px', fontSize: '0.75rem', color: c.muted, fontWeight: 500 }}>
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

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section id="skills" className="theme-section-padding" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: c.text, borderBottom: `2px solid ${c.border}`, paddingBottom: '0.5rem' }}>Skills</h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="fade-up">
                                <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '1.5rem', height: '100%' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: c.text, marginBottom: '1rem' }}>
                                        {group.category}
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.35rem 0.75rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '4px', fontSize: '0.85rem', color: c.text }}>
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

            {/* Education */}
            {data.education?.length > 0 && (
                <section id="education" className="theme-section-padding" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: c.text, borderBottom: `2px solid ${c.border}`, paddingBottom: '0.5rem' }}>Education</h2>
                    </ScrollReveal>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {data.education.map((edu, i) => (
                            <ScrollReveal key={i} animation="fade-up">
                                <div className="theme-grid-1col" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 3fr', gap: '2rem', alignItems: 'start' }}>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', color: c.muted, fontWeight: 500 }}>{edu.year}</p>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: c.text }}>{edu.institution}</h3>
                                        <p style={{ fontSize: '1rem', color: c.text, marginTop: '0.25rem' }}>{edu.degree}</p>
                                        {edu.gpa && <p style={{ fontSize: '0.9rem', color: c.muted, marginTop: '0.25rem' }}>GPA: {edu.gpa}</p>}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            <footer style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center', color: c.muted, fontSize: '0.85rem' }}>
                <p>Built with ResumeForge</p>
                <div style={{ marginTop: '0.5rem' }}>
                    <a href="#/privacy" style={{ color: c.muted, textDecoration: 'underline' }}>Privacy Policy</a>
                </div>
            </footer>

            <style jsx>{`
                .hover-accent:hover {
                    color: ${c.accent} !important;
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
