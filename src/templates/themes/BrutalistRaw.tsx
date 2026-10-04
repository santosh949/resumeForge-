import ScrollReveal from '../shared/ScrollReveal';
import AnimatedCounter from '../shared/AnimatedCounter';
import MagneticButton from '../shared/MagneticButton';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 10: Brutalist Raw
 * Raw brutalist design — thick borders, exposed grid, overlapping elements, stark contrast.
 */
export default function BrutalistRaw({ data, recruiterMode }) {
    const theme = getTheme('brutalist-raw');
    const c = theme.colors;
    const stats = extractStats(data);
    const accent = c.accentDark;

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh' }}>
            {/* Hero — raw, massive, offset */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
                <nav style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '1.5rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="brutal-nav-link" style={{ color: c.textDark, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', border: `2px solid ${c.textDark}`, padding: '0.2rem 0.5rem' }}>EXP</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="brutal-nav-link" style={{ color: c.textDark, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', border: `2px solid ${c.textDark}`, padding: '0.2rem 0.5rem' }}>PRO</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="brutal-nav-link" style={{ color: c.textDark, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', border: `2px solid ${c.textDark}`, padding: '0.2rem 0.5rem' }}>SKL</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="brutal-nav-link" style={{ color: c.textDark, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', border: `2px solid ${c.textDark}`, padding: '0.2rem 0.5rem' }}>EDU</SectionLink>}
                </nav>

                <ScrollReveal animation="fade">
                    <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: accent, color: c.bgDark, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>
                        Portfolio
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: '2rem', borderBottom: `6px solid ${accent}`, paddingBottom: '1rem', display: 'inline-block' }}>
                        {data.bio?.name || 'YOUR NAME'}
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: accent }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1.1rem', color: c.mutedDark, maxWidth: '650px', marginTop: '2rem', lineHeight: 1.7, borderLeft: `4px solid ${accent}`, paddingLeft: '1.5rem' }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '3rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.6rem 1.25rem', border: `3px solid ${c.textDark}`, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', transition: 'all 0.15s', cursor: 'default' }}
                                onMouseEnter={e => { e.target.style.background = c.textDark; e.target.style.color = c.bgDark; e.target.style.transform = 'translate(-3px, -3px)'; e.target.style.boxShadow = `3px 3px 0 ${accent}`; }}
                                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = c.textDark; e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Stats — bold blocks */}
            {stats.length > 0 && (
                <section style={{ borderTop: `4px solid ${c.textDark}`, borderBottom: `4px solid ${c.textDark}`, padding: '0' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', borderRight: i < stats.length - 1 ? `3px solid ${c.textDark}` : 'none', transition: 'all 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = c.bgDark; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textDark; }}>
                                    <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: theme.fonts.display, lineHeight: 1 }}><AnimatedCounter end={stat.value} suffix={stat.suffix} /></div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience — stacked blocks */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '3rem', borderBottom: `4px solid ${accent}`, paddingBottom: '0.5rem', display: 'inline-block' }}>Experience</h2>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ border: `3px solid ${c.textDark}`, padding: '2rem', marginBottom: '1rem', transition: 'all 0.15s', position: 'relative' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-4px, -4px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${accent}`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase' }}>{exp.role}</h3>
                                        <p style={{ color: accent, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem' }}>{exp.company}</p>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.8rem', border: `2px solid ${c.textDark}`, textTransform: 'uppercase' }}>{exp.duration}</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ padding: '0.35rem 0', paddingLeft: '1.5rem', position: 'relative', color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7 }}>
                                            <span style={{ position: 'absolute', left: 0, top: '0.55rem', width: '8px', height: '8px', background: accent }} />{h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            {/* Skills — raw grid */}
            {data.skills?.length > 0 && (
                <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '3rem', borderBottom: `4px solid ${accent}`, paddingBottom: '0.5rem', display: 'inline-block' }}>Skills</h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                <div style={{ border: `3px solid ${c.textDark}`, padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', background: c.textDark, color: c.bgDark, display: 'inline-block', padding: '0.25rem 0.75rem', alignSelf: 'start' }}>{group.category}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.4rem 0.8rem', border: `2px solid ${c.textDark}`, fontSize: '0.85rem', fontWeight: 700, transition: 'all 0.15s', cursor: 'default' }}
                                                onMouseEnter={e => { e.target.style.background = accent; e.target.style.color = c.bgDark; e.target.style.borderColor = accent; }}
                                                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = c.textDark; e.target.style.borderColor = c.textDark; }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects — offset shadow cards */}
            {data.projects?.length > 0 && (
                <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '3rem', borderBottom: `4px solid ${accent}`, paddingBottom: '0.5rem', display: 'inline-block' }}>Projects</h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ border: `3px solid ${c.textDark}`, padding: '2rem', height: '100%', transition: 'all 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-4px, -4px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${accent}`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem' }}>{project.name}</h3>
                                    <p style={{ color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: accent, color: c.bgDark }}>{tech}</span>
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
                <section id="education" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '3rem', borderBottom: `4px solid ${accent}`, paddingBottom: '0.5rem', display: 'inline-block' }}>Education</h2>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ borderTop: `3px solid ${c.textDark}`, padding: '2rem 0' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase' }}>{edu.institution}</h3>
                                <p style={{ color: accent, fontWeight: 800, textTransform: 'uppercase', marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 700 }}>{edu.year}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .brutal-nav-link:hover {
                    background: ${accent} !important;
                    color: ${c.bgDark} !important;
                    border-color: ${accent} !important;
                    transform: translate(-2px, -2px);
                    box-shadow: 2px 2px 0 ${c.textDark};
                }
            `}</style>

            <footer style={{ borderTop: `4px solid ${c.textDark}`, textAlign: 'center', padding: '3rem', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
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
