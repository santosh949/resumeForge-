import ScrollReveal from '../shared/ScrollReveal';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Monochrome Light Theme
 * A strict black, white, and gray theme with flat design.
 */
export default function MonochromeLight({ data }) {
    const theme = getTheme('monochrome-light');
    const c = theme.colors;
    const stats = extractStats(data);

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', borderTop: `8px solid ${c.text}` }}>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>

                {/* Hero */}
                <header style={{ paddingBottom: '3rem', marginBottom: '3rem', borderBottom: `2px solid ${c.border}`, position: 'relative' }}>
                    <nav style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                        {data.experience?.length > 0 && <SectionLink targetId="experience" className="mono-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>EXP</SectionLink>}
                        {data.projects?.length > 0 && <SectionLink targetId="projects" className="mono-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>PRO</SectionLink>}
                        {data.skills?.length > 0 && <SectionLink targetId="skills" className="mono-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>SKL</SectionLink>}
                        {data.education?.length > 0 && <SectionLink targetId="education" className="mono-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>EDU</SectionLink>}
                    </nav>

                    <ScrollReveal animation="fade-up">
                        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                            {data.bio?.name || 'Your Name'}
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={50}>
                        <p style={{ fontSize: '1.2rem', color: c.muted, fontWeight: 500, marginBottom: '2rem', fontFamily: theme.fonts.display }}>
                            {data.bio?.title}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={100}>
                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: c.text, maxWidth: '650px', marginBottom: '2rem' }}>
                            {data.bio?.summary}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={150}>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', color: c.muted, fontWeight: 600 }}>
                            {data.bio?.email && <li><span style={{ color: c.text }}>Email:</span> {data.bio.email}</li>}
                            {data.bio?.location && <li><span style={{ color: c.text }}>Location:</span> {data.bio.location}</li>}
                            {data.bio?.phone && <li><span style={{ color: c.text }}>Phone:</span> {data.bio.phone}</li>}
                        </ul>
                    </ScrollReveal>
                </header>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem' }}>

                    {/* Experience */}
                    {data.experience?.length > 0 && (
                        <section id="experience">
                            <ScrollReveal>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Experience</h2>
                            </ScrollReveal>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                {data.experience.map((exp, i) => (
                                    <ScrollReveal key={i} animation="fade-up">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <div className="theme-flex-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.role}</h3>
                                                <span style={{ fontSize: '0.85rem', color: c.muted, fontWeight: 500 }}>{exp.duration}</span>
                                            </div>
                                            <p style={{ fontSize: '1rem', color: c.muted, fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company}</p>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {exp.highlights?.map((h, j) => (
                                                    <li key={j} style={{ paddingLeft: '1rem', position: 'relative', marginBottom: '0.4rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                        <span style={{ position: 'absolute', left: 0, color: c.text }}>–</span> {h}
                                                    </li>
                                                ))}
                                            </ul>
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
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Skills</h2>
                            </ScrollReveal>
                            <div className="theme-grid-1col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {data.skills.map((group, i) => (
                                    <ScrollReveal key={i} animation="fade-up">
                                        <div style={{ border: `1px solid ${c.border}`, padding: '1.5rem', height: '100%', background: c.card }}>
                                            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: c.text }}>{group.category}</h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {group.items?.map((skill, j) => (
                                                    <span key={j} style={{ padding: '0.25rem 0.5rem', background: c.border, fontSize: '0.8rem', color: c.text, fontWeight: 500 }}>{skill}</span>
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
                        <section id="projects">
                            <ScrollReveal>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Projects</h2>
                            </ScrollReveal>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {data.projects.map((project, i) => (
                                    <ScrollReveal key={i} animation="fade-up">
                                        <div style={{ padding: '1.5rem', border: `1px solid ${c.border}`, height: '100%', display: 'flex', flexDirection: 'column', background: c.card }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{project.name}</h3>
                                            <p style={{ fontSize: '0.95rem', color: c.muted, lineHeight: 1.5, marginBottom: '1rem', flexGrow: 1 }}>{project.description}</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {project.technologies?.map((tech, j) => (
                                                    <span key={j} style={{ fontSize: '0.75rem', fontWeight: 600, color: c.text, textTransform: 'uppercase' }}>
                                                        {tech}{j < project.technologies.length - 1 ? ',' : ''}
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
                        <section id="education">
                            <ScrollReveal>
                                <h2 style={{ fontFamily: theme.fonts.display, fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Education</h2>
                            </ScrollReveal>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {data.education.map((edu, i) => (
                                    <ScrollReveal key={i} animation="fade-up">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div className="theme-flex-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{edu.institution}</h3>
                                                <span style={{ fontSize: '0.85rem', color: c.muted, fontWeight: 500 }}>{edu.year}</span>
                                            </div>
                                            <p style={{ fontSize: '1rem', color: c.text }}>{edu.degree}</p>
                                            {edu.gpa && <p style={{ fontSize: '0.9rem', color: c.muted }}>GPA: {edu.gpa}</p>}
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                <footer style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: c.muted, fontWeight: 500 }}>
                    <span>Built with ResumeForge</span>
                    <a href="#/privacy" style={{ color: c.text, textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
                </footer>

            </div>
        </div>
    );
}

function extractStats(data) {
    const stats = [];
    if (data.experience?.length) stats.push({ value: data.experience.length, suffix: '+', label: 'Roles' });
    if (data.projects?.length) stats.push({ value: data.projects.length, suffix: '+', label: 'Projects' });
    return stats;
}
