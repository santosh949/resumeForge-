import ScrollReveal from '../shared/ScrollReveal';
import TypewriterText from '../shared/TypewriterText';
import AnimatedCounter from '../shared/AnimatedCounter';
import SkillBars from '../shared/SkillBars';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 1: Bold Minimal
 * Massive B&W typography, left-aligned, tons of whitespace, one accent color.
 */
export default function BoldMinimal({ data, recruiterMode }) {
    const theme = getTheme('bold-minimal');
    const c = theme.colors;

    const stats = extractStats(data);
    const topSkills = data.skills?.flatMap(g => g.items?.map((s, i) => ({ name: s, level: 95 - i * 8 })) || []).slice(0, 6) || [];

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh' }}>
            {/* Hero — massive text */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
                <nav style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', gap: '2rem' }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="hover-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EXPERIENCE</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="hover-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>PROJECTS</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="hover-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>SKILLS</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="hover-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em' }}>EDUCATION</SectionLink>}
                </nav>

                <ScrollReveal animation="fade">
                    <p style={{ color: c.accentAlt, fontSize: '1rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        Portfolio
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
                        <TypewriterText text={data.bio?.name || 'Your Name'} speed={80} cursorColor={c.accentAlt} />
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, color: c.mutedDark, maxWidth: '700px', lineHeight: 1.5 }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1.1rem', color: c.mutedDark, maxWidth: '600px', marginTop: '1.5rem', lineHeight: 1.8, opacity: 0.7 }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>

                {/* Contact row */}
                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.5rem 1.2rem', border: `1px solid ${c.borderDark}`, borderRadius: '999px', fontSize: '0.875rem', color: c.mutedDark }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Scroll indicator */}
                <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: '1px', height: '60px', background: `linear-gradient(to bottom, ${c.mutedDark}, transparent)`, animation: 'pulse 2s infinite' }} />
                </div>
            </section>

            {/* Stats bar */}
            {stats.length > 0 && (
                <ScrollReveal>
                    <section style={{ borderTop: `1px solid ${c.borderDark}`, borderBottom: `1px solid ${c.borderDark}`, padding: '3rem 2rem' }}>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: theme.fonts.display, color: c.accentAlt }}>
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: c.mutedDark, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.02em' }}>
                            Experience
                        </h2>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ borderTop: `1px solid ${c.borderDark}`, padding: '2.5rem 0', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{exp.role}</h3>
                                    <p style={{ color: c.accentAlt, fontWeight: 600, marginTop: '0.25rem' }}>{exp.company}</p>
                                    <p style={{ color: c.mutedDark, fontSize: '0.875rem', marginTop: '0.5rem' }}>{exp.duration}</p>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ marginBottom: '0.75rem', color: c.mutedDark, lineHeight: 1.7, paddingLeft: '1.5rem', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0, color: c.accentAlt }}>→</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            {/* Skills with animated bars */}
            {data.skills?.length > 0 && (
                <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.02em' }}>
                            Skills
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.mutedDark, marginBottom: '1.5rem' }}>
                                        {group.category}
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.5rem 1rem', border: `1px solid ${c.borderDark}`, borderRadius: '4px', fontSize: '0.875rem', transition: 'all 0.2s', cursor: 'default' }}
                                                onMouseEnter={e => { e.target.style.background = c.accentAlt; e.target.style.borderColor = c.accentAlt; e.target.style.color = '#fff'; }}
                                                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = c.borderDark; e.target.style.color = 'inherit'; }}>
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
                <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.02em' }}>
                            Projects
                        </h2>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div style={{ padding: '2rem', border: `1px solid ${c.borderDark}`, borderRadius: '12px', transition: 'all 0.3s', cursor: 'default', height: '100%' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.accentAlt; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.borderDark; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{project.name}</h3>
                                    <p style={{ color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ fontSize: '0.75rem', fontWeight: 600, color: c.accentAlt }}>{tech}{j < project.technologies.length - 1 ? ' ·' : ''}</span>
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
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.02em' }}>
                            Education
                        </h2>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ borderTop: `1px solid ${c.borderDark}`, padding: '2rem 0' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{edu.institution}</h3>
                                <p style={{ color: c.accentAlt, fontWeight: 500, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.875rem', marginTop: '0.5rem' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .hover-link:hover {
                    color: ${c.accentAlt} !important;
                }
            `}</style>

            {/* Footer */}
            <footer style={{ borderTop: `1px solid ${c.borderDark}`, padding: '3rem 2rem', textAlign: 'center', color: c.mutedDark, fontSize: '0.8rem' }}>
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
