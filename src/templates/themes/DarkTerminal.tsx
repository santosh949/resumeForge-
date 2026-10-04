import ScrollReveal from '../shared/ScrollReveal';
import TypewriterText from '../shared/TypewriterText';
import AnimatedCounter from '../shared/AnimatedCounter';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 3: Dark Terminal
 * Hacker aesthetic, monospace font, green/amber glow, terminal-style cards, code blocks.
 */
export default function DarkTerminal({ data, recruiterMode }) {
    const theme = getTheme('dark-terminal');
    const c = theme.colors;

    const stats = extractStats(data);

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh' }}>
            {/* Scanline overlay */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)', opacity: 0.5 }} />

            {/* Hero — terminal style */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                <nav style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '1.5rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="term-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[EXP]</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="term-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[PROJECTS]</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="term-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[SKILLS]</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="term-nav-link" style={{ color: c.muted, textDecoration: 'none', fontSize: '0.8rem', fontFamily: theme.fonts.display }}>[EDU]</SectionLink>}
                </nav>

                <ScrollReveal animation="fade">
                    <div style={{ color: c.muted, fontSize: '0.9rem', marginBottom: '1rem' }}>
                        <span style={{ color: c.accent }}>guest@portfolio</span>:<span style={{ color: c.accentAlt }}>~</span>$ cat about.txt
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: c.accent, marginBottom: '1rem', textShadow: `0 0 20px ${c.accent}40` }}>
                        <TypewriterText text={`> ${data.bio?.name || 'Your Name'}`} speed={60} cursorColor={c.accent} />
                    </h1>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: '1.2rem', color: c.accentAlt, marginBottom: '1rem' }}>
                        // {data.bio?.title}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '1.5rem', marginTop: '1rem' }}>
                        <div style={{ color: c.muted, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                            <span style={{ color: c.accent }}>/**</span>
                        </div>
                        <p style={{ color: c.muted, lineHeight: 1.8, paddingLeft: '1rem', borderLeft: `2px solid ${c.border}` }}>
                            {data.bio?.summary}
                        </p>
                        <div style={{ color: c.muted, fontSize: '0.8rem', marginTop: '0.75rem' }}>
                            <span style={{ color: c.accent }}>*/</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Contact as key-value pairs */}
                <ScrollReveal animation="fade-up" delay={400}>
                    <div style={{ marginTop: '2rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '1.25rem', fontFamily: theme.fonts.display, fontSize: '0.875rem' }}>
                        {[
                            data.bio?.email && ['email', data.bio.email],
                            data.bio?.phone && ['phone', data.bio.phone],
                            data.bio?.location && ['location', data.bio.location],
                            data.bio?.github && ['github', data.bio.github],
                            data.bio?.linkedin && ['linkedin', data.bio.linkedin],
                        ].filter(Boolean).map(([key, val], i) => (
                            <div key={i} style={{ marginBottom: '0.3rem' }}>
                                <span style={{ color: c.accentAlt }}>{key}</span>
                                <span style={{ color: c.muted }}>: </span>
                                <span style={{ color: c.accent }}>"{val}"</span>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Stats */}
            {stats.length > 0 && (
                <section style={{ borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: '3rem 2rem' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="scale" delay={i * 100}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: c.accent, textShadow: `0 0 15px ${c.accent}30` }}>
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div style={{ fontSize: '0.8rem', color: c.muted, fontFamily: theme.fonts.display }}>{`// ${stat.label}`}</div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <div style={{ color: c.muted, fontSize: '0.9rem', marginBottom: '2rem' }}>
                            <span style={{ color: c.accent }}>$</span> ls ./experience/
                        </div>
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-left" delay={i * 100}>
                            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', borderLeft: `3px solid ${c.accent}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <div>
                                        <span style={{ color: c.accent, fontWeight: 700 }}>{exp.role}</span>
                                        <span style={{ color: c.muted }}> @ </span>
                                        <span style={{ color: c.accentAlt }}>{exp.company}</span>
                                    </div>
                                    <span style={{ color: c.muted, fontSize: '0.85rem', fontFamily: theme.fonts.display }}>
                                        {exp.duration}
                                    </span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ color: c.muted, fontSize: '0.9rem', lineHeight: 1.8, fontFamily: theme.fonts.display }}>
                                            <span style={{ color: c.accent }}>  ├─ </span>{h}
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
                <section id="skills" style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <div style={{ color: c.muted, fontSize: '0.9rem', marginBottom: '2rem' }}>
                            <span style={{ color: c.accent }}>$</span> cat skills.json
                        </div>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ color: c.accentAlt, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                        {'{'} {group.category} {'}'}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', background: `${c.accent}15`, color: c.accent, border: `1px solid ${c.accent}25`, fontFamily: theme.fonts.display }}>
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
                <section id="projects" style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <div style={{ color: c.muted, fontSize: '0.9rem', marginBottom: '2rem' }}>
                            <span style={{ color: c.accent }}>$</span> ls ./projects/
                        </div>
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                        {data.projects.map((project, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '1.5rem', height: '100%', transition: 'border-color 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; }}>
                                    <h3 style={{ color: c.accent, fontWeight: 700, marginBottom: '0.75rem' }}>
                                        {'> '}{project.name}
                                    </h3>
                                    <p style={{ color: c.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>{project.description}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {project.technologies?.map((tech, j) => (
                                            <span key={j} style={{ fontSize: '0.75rem', color: c.accentAlt, fontFamily: theme.fonts.display }}>[{tech}]</span>
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
                <section id="education" style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <div style={{ color: c.muted, fontSize: '0.9rem', marginBottom: '2rem' }}>
                            <span style={{ color: c.accent }}>$</span> cat education.log
                        </div>
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem', borderLeft: `3px solid ${c.accentAlt}` }}>
                                <span style={{ color: c.text, fontWeight: 700 }}>{edu.institution}</span>
                                <p style={{ color: c.accentAlt, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.muted, fontSize: '0.85rem', marginTop: '0.25rem' }}>{edu.year}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <style jsx>{`
                .term-nav-link:hover {
                    color: ${c.accent} !important;
                    text-shadow: 0 0 10px ${c.accent};
                }
            `}</style>

            <footer style={{ borderTop: `1px solid ${c.border}`, padding: '2rem', textAlign: 'center', color: c.muted, fontSize: '0.8rem', fontFamily: theme.fonts.display }}>
                {'// Built with ResumeForge'}
            </footer>
        </div>
    );
}

function extractStats(data) {
    const stats = [];
    if (data.experience?.length) stats.push({ value: data.experience.length, suffix: '+', label: 'roles' });
    if (data.projects?.length) stats.push({ value: data.projects.length, suffix: '+', label: 'repos' });
    const totalSkills = data.skills?.reduce((sum, g) => sum + (g.items?.length || 0), 0) || 0;
    if (totalSkills) stats.push({ value: totalSkills, suffix: '+', label: 'technologies' });
    return stats;
}
