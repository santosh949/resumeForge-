import ScrollReveal from '../shared/ScrollReveal';
import SectionLink from '../shared/SectionLink';
import { getTheme } from '../themes';

/**
 * Cherry Blossom Theme
 * Minimalist elegant with soft pink accents and serif typography.
 * Premium features: floating gradient orbs, glassmorphism cards.
 */
export default function CherryBlossom({ data }) {
    const theme = getTheme('cherry-blossom');
    const c = theme.colors;

    const stats = extractStats(data);

    return (
        <div style={{ background: c.bg, color: c.text, fontFamily: theme.fonts.body, minHeight: '100vh', paddingBottom: '4rem', position: 'relative', overflowX: 'hidden' }}>

            {/* Animated Ambient Background Objects */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, animation: 'float 20s ease-in-out infinite alternate' }} />
            <div style={{ position: 'absolute', top: '40%', right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(251,207,232,0.2) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, animation: 'float 15s ease-in-out infinite alternate-reverse' }} />

            {/* Premium Floating Navigation */}
            <nav style={{ position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', padding: '0.5rem', borderRadius: '100px', border: `1px solid ${c.border}`, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                {data.experience?.length > 0 && <SectionLink targetId="experience" className="nav-link">Experience</SectionLink>}
                {data.projects?.length > 0 && <SectionLink targetId="projects" className="nav-link">Projects</SectionLink>}
                {data.skills?.length > 0 && <SectionLink targetId="skills" className="nav-link">Skills</SectionLink>}
                {data.education?.length > 0 && <SectionLink targetId="education" className="nav-link">Education</SectionLink>}
            </nav>

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header / Hero */}
                <header className="theme-header-padding" style={{ padding: '10rem 2rem 6rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <ScrollReveal animation="fade-up">
                        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: c.text, lineHeight: 1.1 }}>
                            {data.bio?.name || 'Your Name'}
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={150}>
                        <p style={{ fontSize: '1.25rem', color: c.accent, fontWeight: 500, marginBottom: '2rem', fontStyle: 'italic', fontFamily: theme.fonts.display }}>
                            {data.bio?.title}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={300}>
                        <p style={{ fontSize: '1.1rem', color: c.muted, maxWidth: '650px', margin: '0 auto 3rem', lineHeight: 1.8, fontWeight: 300 }}>
                            {data.bio?.summary}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={450}>
                        <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '1rem 2rem', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', borderRadius: '100px', border: `1px solid ${c.border}`, fontSize: '0.9rem', color: c.muted, fontWeight: 500, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                            {data.bio?.email && <span>{data.bio.email}</span>}
                            {data.bio?.location && <span>{data.bio.location}</span>}
                            {data.bio?.phone && <span>{data.bio.phone}</span>}
                        </div>
                    </ScrollReveal>
                </header>

                {/* Stats */}
                {stats.length > 0 && (
                    <section style={{ padding: '0 2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`, gap: '2rem', padding: '3rem', background: c.card, borderRadius: '24px', border: `1px solid ${c.border}`, textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                            {stats.map((stat, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                                    <div>
                                        <div style={{ fontSize: '3rem', fontWeight: 300, color: c.accent, lineHeight: 1, fontFamily: theme.fonts.display }}>{stat.value}{stat.suffix}</div>
                                        <div style={{ fontSize: '0.8rem', color: c.muted, marginTop: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{stat.label}</div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section id="experience" className="theme-section-padding" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                        <ScrollReveal>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 500, marginBottom: '4rem', color: c.text, textAlign: 'center' }}>Experience</h2>
                        </ScrollReveal>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative' }}>
                            {/* Vertical Line */}
                            <div style={{ position: 'absolute', left: '24px', top: '10px', bottom: '10px', width: '2px', background: `linear-gradient(to bottom, ${c.accent} 0%, rgba(244,114,182,0.1) 100%)`, zIndex: 0 }} className="hidden sm:block" />

                            {data.experience.map((exp, i) => (
                                <ScrollReveal key={i} animation="fade-up">
                                    <div style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
                                        <div style={{ width: '50px', flexShrink: 0, display: 'flex', justifyContent: 'center' }} className="hidden sm:flex">
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: c.accent, border: `4px solid ${c.bg}`, marginTop: '8px' }} />
                                        </div>
                                        <div style={{ flexGrow: 1, background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(5px)', borderRadius: '16px', padding: '2rem', border: `1px solid ${c.border}`, transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} className="hover:-translate-y-1 hover:shadow-xl">
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: c.text }}>{exp.role}</h3>
                                                <span style={{ fontSize: '0.9rem', color: c.accent, fontWeight: 500, padding: '0.25rem 0.75rem', background: 'rgba(244,114,182,0.1)', borderRadius: '20px' }}>{exp.duration}</span>
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 500, color: c.muted, marginBottom: '1.5rem', fontFamily: theme.fonts.display }}>{exp.company}</h4>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {exp.highlights?.map((h, j) => (
                                                    <li key={j} style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.75rem', color: c.text, lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 300 }}>
                                                        <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', borderRadius: '50%', background: c.border }} />
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
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 500, marginBottom: '4rem', color: c.text, textAlign: 'center' }}>Selected Works</h2>
                        </ScrollReveal>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                            {data.projects.map((project, i) => (
                                <ScrollReveal key={i} animation="fade-up" delay={i % 2 === 0 ? 0 : 150}>
                                    <div style={{ padding: '2.5rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '24px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} className="hover:shadow-2xl hover:-translate-y-2 group">
                                        <div style={{ width: '40px', height: '4px', background: c.accent, marginBottom: '1.5rem', borderRadius: '2px', transition: 'width 0.3s ease' }} className="group-hover:width-60px" />
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: c.text, marginBottom: '1rem', fontFamily: theme.fonts.display }}>{project.name}</h3>
                                        <p style={{ color: c.muted, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', flexGrow: 1, fontWeight: 300 }}>{project.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                            {project.technologies?.map((tech, j) => (
                                                <span key={j} style={{ padding: '0.35rem 0.8rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '8px', fontSize: '0.8rem', color: c.muted, fontWeight: 500 }}>
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
                    <section id="skills" className="theme-section-padding" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                        <ScrollReveal>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 500, marginBottom: '4rem', color: c.text, textAlign: 'center' }}>Expertise</h2>
                        </ScrollReveal>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {data.skills.map((group, i) => (
                                <ScrollReveal key={i} animation="fade-up">
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) 3fr', gap: '2rem', alignItems: 'start' }} className="sm-grid-1col">
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: c.text, fontFamily: theme.fonts.display }}>
                                            {group.category}
                                            <div style={{ width: '30px', height: '2px', background: c.accent, marginTop: '1rem' }} />
                                        </h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                            {group.items?.map((skill, j) => (
                                                <span key={j} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(5px)', border: `1px solid ${c.border}`, borderRadius: '100px', fontSize: '0.9rem', color: c.text, fontWeight: 500, transition: 'all 0.3s ease' }} className="hover:border-pink-300 hover:shadow-md">
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
                    <section id="education" className="theme-section-padding" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
                        <ScrollReveal>
                            <h2 style={{ fontFamily: theme.fonts.display, fontSize: '2.5rem', fontWeight: 500, marginBottom: '4rem', color: c.text, textAlign: 'center' }}>Education</h2>
                        </ScrollReveal>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {data.education.map((edu, i) => (
                                <ScrollReveal key={i} animation="fade-up">
                                    <div style={{ padding: '2rem', background: c.card, border: `1px solid ${c.border}`, borderRadius: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }} className="hover:shadow-lg transition-shadow">
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: c.text, marginBottom: '0.5rem' }}>{edu.institution}</h3>
                                            <p style={{ fontSize: '1rem', color: c.muted }}>{edu.degree}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ display: 'inline-block', padding: '0.4rem 1rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '20px', fontSize: '0.9rem', color: c.accent, fontWeight: 500, marginBottom: '0.5rem' }}>{edu.year}</span>
                                            {edu.gpa && <p style={{ fontSize: '0.9rem', color: c.muted, fontWeight: 500 }}>GPA: {edu.gpa}</p>}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                <footer style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center', color: c.muted, fontSize: '0.85rem' }}>
                    <p style={{ letterSpacing: '0.05em' }}>BUILT WITH RESUMEFORGE</p>
                    <div style={{ marginTop: '1rem' }}>
                        <a href="#/privacy" style={{ color: c.accent, textDecoration: 'none' }}>Privacy Policy</a>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(5%, 10%) scale(1.1); }
                }
                @media (max-width: 640px) {
                    .sm-grid-1col { grid-template-columns: 1fr !important; }
                    .hidden\\.sm\\:block { display: none !important; }
                    .hidden\\.sm\\:flex { display: none !important; }
                }
                .nav-link {
                    padding: 0.5rem 1.25rem;
                    border-radius: 100px;
                    color: ${c.muted};
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                .nav-link:hover {
                    background: #fff;
                    color: ${c.accent};
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .hover\\:-translate-y-1:hover { transform: translateY(-0.25rem); }
                .hover\\:-translate-y-2:hover { transform: translateY(-0.5rem); }
                .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
                .hover\\:shadow-2xl:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }
                .hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
                .hover\\:border-pink-300:hover { border-color: #f9a8d4 !important; }
                .group:hover .group-hover\\:width-60px { width: 60px !important; }
                .transition-shadow { transition: box-shadow 0.3s ease; }
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
