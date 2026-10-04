import { useState } from 'react';
import ScrollReveal from '../shared/ScrollReveal';

/* ═══════════════════════════════════════════════════════
   5 EXPERIENCE VARIANTS
   ═══════════════════════════════════════════════════════ */

/* ── 1. Timeline — vertical timeline with dots ───────── */
function ExpTimeline({ data, c, fonts }) {
    return (
        <section style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal><h2 style={{ fontFamily: fonts.display, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '3rem', letterSpacing: '-0.02em' }}>Experience</h2></ScrollReveal>
            <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
                <div style={{ position: 'absolute', left: '8px', top: 0, bottom: 0, width: '2px', background: `linear-gradient(to bottom, ${c.accent}, ${c.accent}20)` }} />
                {data.experience.map((exp, i) => (
                    <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                        <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-2.5rem', top: '6px', width: '18px', height: '18px', borderRadius: '50%', background: c.bg, border: `3px solid ${c.accent}`, boxShadow: `0 0 10px ${c.accent}30` }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{exp.role}</h3>
                                <span style={{ fontSize: '0.8rem', color: c.muted, padding: '0.2rem 0.75rem', borderRadius: '6px', background: `${c.accent}08`, border: `1px solid ${c.accent}15` }}>{exp.duration}</span>
                            </div>
                            <p style={{ color: c.accent, fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>{exp.company}</p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {exp.highlights?.map((h, j) => (
                                    <li key={j} style={{ paddingLeft: '1.25rem', position: 'relative', color: c.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.4rem' }}>
                                        <span style={{ position: 'absolute', left: 0, top: '0.6rem', width: '5px', height: '5px', borderRadius: '50%', background: c.accent }} />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}

/* ── 2. Grid — two-column split ──────────────────────── */
function ExpGrid({ data, c, fonts }) {
    return (
        <section style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal><h2 style={{ fontFamily: fonts.display, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.02em' }}>Experience</h2></ScrollReveal>
            {data.experience.map((exp, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                    <div style={{ borderTop: `1px solid ${c.border}`, padding: '2.5rem 0', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{exp.role}</h3>
                            <p style={{ color: c.accent, fontWeight: 600, marginTop: '0.25rem' }}>{exp.company}</p>
                            <p style={{ color: c.muted, fontSize: '0.85rem', marginTop: '0.5rem' }}>{exp.duration}</p>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {exp.highlights?.map((h, j) => (
                                <li key={j} style={{ marginBottom: '0.75rem', color: c.muted, lineHeight: 1.7, paddingLeft: '1.5rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: c.accent }}>→</span>{h}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ScrollReveal>
            ))}
        </section>
    );
}

/* ── 3. Cards — glass cards with accent lines ────────── */
function ExpCards({ data, c, fonts }) {
    return (
        <section style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal><h2 style={{ fontFamily: fonts.display, fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}><span style={{ borderBottom: `2px solid ${c.accent}`, paddingBottom: '0.5rem' }}>Experience</span></h2></ScrollReveal>
            {data.experience.map((exp, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                    <div style={{ padding: '2rem', borderRadius: '16px', background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(16px)', marginBottom: '1.25rem', transition: 'all 0.3s', position: 'relative', overflow: 'hidden', cursor: 'default' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${c.accent}12`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${c.accent}, ${c.accentAlt}, transparent)` }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{exp.role}</h3>
                                <p style={{ color: c.accent, fontWeight: 600 }}>{exp.company}</p>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: c.muted, padding: '0.3rem 0.8rem', borderRadius: '8px', border: `1px solid ${c.border}`, alignSelf: 'start' }}>{exp.duration}</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {exp.highlights?.map((h, j) => (
                                <li key={j} style={{ padding: '0.35rem 0', paddingLeft: '1.25rem', position: 'relative', color: c.muted, fontSize: '0.9rem', lineHeight: 1.7 }}>
                                    <span style={{ position: 'absolute', left: 0, width: '6px', height: '6px', borderRadius: '2px', top: '0.75rem', background: c.accent, boxShadow: `0 0 6px ${c.accent}` }} />{h}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ScrollReveal>
            ))}
        </section>
    );
}

/* ── 4. Accordion — expandable cards ─────────────────── */
function AccordionItem({ exp, c, fonts, defaultOpen }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={{ borderRadius: '14px', border: `1px solid ${open ? c.accent + '40' : c.border}`, marginBottom: '0.75rem', overflow: 'hidden', transition: 'all 0.3s', background: open ? `${c.accent}05` : c.card }}>
            <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', textAlign: 'left' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.role}</h3>
                    <p style={{ color: c.accent, fontSize: '0.9rem', fontWeight: 600, marginTop: '0.15rem' }}>{exp.company} · {exp.duration}</p>
                </div>
                <span style={{ fontSize: '1.2rem', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: c.muted }}>▼</span>
            </button>
            {open && (
                <div style={{ padding: '0 1.5rem 1.25rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {exp.highlights?.map((h, j) => (
                            <li key={j} style={{ padding: '0.3rem 0', paddingLeft: '1rem', position: 'relative', color: c.muted, fontSize: '0.9rem', lineHeight: 1.7 }}>
                                <span style={{ position: 'absolute', left: 0, color: c.accent }}>•</span>{h}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function ExpAccordion({ data, c, fonts }) {
    return (
        <section style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal><h2 style={{ fontFamily: fonts.display, fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem' }}>Experience</h2></ScrollReveal>
            {data.experience.map((exp, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                    <AccordionItem exp={exp} c={c} fonts={fonts} defaultOpen={i === 0} />
                </ScrollReveal>
            ))}
        </section>
    );
}

/* ── 5. Minimal — clean lines ────────────────────────── */
function ExpMinimal({ data, c, fonts }) {
    return (
        <section style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal><h2 style={{ fontFamily: fonts.display, fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.muted, marginBottom: '3rem' }}>Work Experience</h2></ScrollReveal>
            {data.experience.map((exp, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{exp.role}</h3>
                            <span style={{ fontSize: '0.85rem', color: c.muted, fontWeight: 500 }}>{exp.duration}</span>
                        </div>
                        <p style={{ color: c.accent, fontWeight: 600, fontSize: '1rem', marginBottom: '1rem' }}>{exp.company}</p>
                        {exp.highlights?.map((h, j) => (
                            <p key={j} style={{ color: c.muted, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '0.25rem' }}>
                                — {h}
                            </p>
                        ))}
                    </div>
                </ScrollReveal>
            ))}
        </section>
    );
}

const EXP_MAP = { timeline: ExpTimeline, grid: ExpGrid, cards: ExpCards, accordion: ExpAccordion, minimal: ExpMinimal };
export default function ExperienceSection({ variant, data, c, fonts }) {
    if (!data.experience?.length) return null;
    const Comp = EXP_MAP[variant] || ExpTimeline;
    return <Comp data={data} c={c} fonts={fonts} />;
}
