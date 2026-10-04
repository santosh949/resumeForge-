import ScrollReveal from '../shared/ScrollReveal';
import TypewriterText from '../shared/TypewriterText';
import AnimatedCounter from '../shared/AnimatedCounter';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Theme 4: Soft Pastel
 * Elegant serif typography, cream backgrounds, magazine-style layout, warm pastels.
 */
export default function SoftPastel({ data, recruiterMode }) {
    const theme = getTheme('soft-pastel');
    const c = theme.colors;
    const stats = extractStats(data);

    return (
        <div style={{ background: c.bgDark, color: c.textDark, fontFamily: theme.fonts.body, minHeight: '100vh' }}>
            {/* Hero — elegant centered */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem', position: 'relative' }}>
                <nav style={{ position: 'absolute', top: '2rem', display: 'flex', gap: '2.5rem', zIndex: 10 }}>
                    {data.experience?.length > 0 && <SectionLink targetId="experience" className="pastel-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em' }}>EXP</SectionLink>}
                    {data.projects?.length > 0 && <SectionLink targetId="projects" className="pastel-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em' }}>WORK</SectionLink>}
                    {data.skills?.length > 0 && <SectionLink targetId="skills" className="pastel-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em' }}>SKILLS</SectionLink>}
                    {data.education?.length > 0 && <SectionLink targetId="education" className="pastel-nav-link" style={{ color: c.mutedDark, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em' }}>EDU</SectionLink>}
                </nav>
                {/* Soft bg gradient */}
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 20%, rgba(232,145,90,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(126,184,160,0.06) 0%, transparent 60%)` }} />

                <ScrollReveal animation="fade">
                    <div style={{ width: '80px', height: '3px', background: `linear-gradient(90deg, ${c.accentDark}, ${c.accentAlt})`, margin: '0 auto 2rem', borderRadius: '99px' }} />
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                    <p style={{ fontSize: '1rem', color: c.accentDark, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem', position: 'relative' }}>
                        Portfolio
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                    <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', fontStyle: 'italic', position: 'relative' }}>
                        {data.bio?.name || 'Your Name'}
                    </h1>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                    <p style={{ fontSize: '1.2rem', color: c.accentDark, marginBottom: '1.5rem', fontWeight: 500, position: 'relative' }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={400}>
                    <p style={{ fontSize: '1rem', color: c.mutedDark, maxWidth: '550px', lineHeight: 1.9, position: 'relative' }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={500}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', position: 'relative' }}>
                        {[data.bio?.email, data.bio?.location].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.6rem 1.5rem', borderRadius: '999px', fontSize: '0.85rem', border: `1px solid ${c.borderDark}`, color: c.mutedDark }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade" delay={600}>
                    <div style={{ width: '80px', height: '3px', background: `linear-gradient(90deg, ${c.accentDark}, ${c.accentAlt})`, margin: '3rem auto 0', borderRadius: '99px' }} />
                </ScrollReveal>
            </section>

            {/* Stats */}
            {stats.length > 0 && (
                <section style={{ padding: '4rem 2rem', background: 'rgba(232,145,90,0.04)' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                <div style={{ fontFamily: theme.fonts.display, fontSize: '3rem', fontWeight: 700, color: c.accentDark, fontStyle: 'italic' }}>
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div style={{ fontSize: '0.85rem', color: c.mutedDark, marginTop: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', fontStyle: 'italic' }}>
                            Experience
                        </h2>
                        <div style={{ width: '40px', height: '2px', background: c.accentDark, margin: '-2rem auto 3rem', borderRadius: '99px' }} />
                    </ScrollReveal>
                    {data.experience.map((exp, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '2rem', borderRadius: '16px', background: c.cardDark, border: `1px solid ${c.borderDark}`, marginBottom: '1.25rem', transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.2rem', fontWeight: 700, fontStyle: 'italic' }}>{exp.role}</h3>
                                        <p style={{ color: c.accentDark, fontWeight: 500 }}>{exp.company}</p>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: c.mutedDark }}>{exp.duration}</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {exp.highlights?.map((h, j) => (
                                        <li key={j} style={{ padding: '0.3rem 0', paddingLeft: '1.5rem', position: 'relative', color: c.mutedDark, fontSize: '0.925rem', lineHeight: 1.7 }}>
                                            <span style={{ position: 'absolute', left: 0, color: c.accentDark, fontSize: '1.2rem', lineHeight: 1 }}>·</span>
                                            {h}
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
                <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', fontStyle: 'italic' }}>
                            Expertise
                        </h2>
                        <div style={{ width: '40px', height: '2px', background: c.accentAlt, margin: '-2rem auto 3rem', borderRadius: '99px' }} />
                    </ScrollReveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {data.skills.map((group, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                                <div style={{ padding: '1.5rem', borderRadius: '16px', background: c.cardDark, border: `1px solid ${c.borderDark}`, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontFamily: theme.fonts.display, fontSize: '0.9rem', fontWeight: 700, fontStyle: 'italic', color: c.accentDark, marginBottom: '1rem' }}>
                                        {group.category}
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem', alignContent: 'start', flexGrow: 1 }}>
                                        {group.items?.map((skill, j) => (
                                            <span key={j} style={{ padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.82rem', background: 'rgba(232,145,90,0.08)', border: `1px solid ${c.borderDark}` }}>
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
                <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', fontStyle: 'italic' }}>
                            Selected Work
                        </h2>
                        <div style={{ width: '40px', height: '2px', background: c.accentDark, margin: '-2rem auto 3rem', borderRadius: '99px' }} />
                    </ScrollReveal>
                    {data.projects.map((project, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ padding: '2rem', borderRadius: '16px', background: c.cardDark, border: `1px solid ${c.borderDark}`, marginBottom: '1.25rem' }}>
                                <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.3rem', fontWeight: 700, fontStyle: 'italic', marginBottom: '0.75rem' }}>{project.name}</h3>
                                <p style={{ color: c.mutedDark, lineHeight: 1.8, marginBottom: '1rem' }}>{project.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {project.technologies?.map((tech, j) => (
                                        <span key={j} style={{ padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', background: 'rgba(126,184,160,0.1)', border: `1px solid rgba(126,184,160,0.15)`, color: c.accentAlt }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section id="education" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', fontStyle: 'italic' }}>
                            Education
                        </h2>
                        <div style={{ width: '40px', height: '2px', background: c.accentAlt, margin: '-2rem auto 3rem', borderRadius: '99px' }} />
                    </ScrollReveal>
                    {data.education.map((edu, i) => (
                        <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                            <div style={{ textAlign: 'center', padding: '2rem', marginBottom: '1rem' }}>
                                <h3 style={{ fontFamily: theme.fonts.display, fontSize: '1.3rem', fontWeight: 700, fontStyle: 'italic' }}>{edu.institution}</h3>
                                <p style={{ color: c.accentDark, marginTop: '0.25rem' }}>{edu.degree}</p>
                                <p style={{ color: c.mutedDark, fontSize: '0.85rem', marginTop: '0.25rem' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </section>
            )}

            <footer style={{ textAlign: 'center', padding: '3rem 2rem', color: c.mutedDark, fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.5 }}>
                Crafted with ResumeForge
            </footer>
            <style jsx>{`
                .pastel-nav-link:hover {
                    color: ${c.accentDark} !important;
                    font-style: italic;
                }
            `}</style>
        </div>
    );
}

function extractStats(data) {
    const stats = [];
    if (data.experience?.length) stats.push({ value: data.experience.length, suffix: '+', label: 'Experiences' });
    if (data.projects?.length) stats.push({ value: data.projects.length, suffix: '+', label: 'Projects' });
    const totalSkills = data.skills?.reduce((sum, g) => sum + (g.items?.length || 0), 0) || 0;
    if (totalSkills) stats.push({ value: totalSkills, suffix: '+', label: 'Skills' });
    return stats;
}
