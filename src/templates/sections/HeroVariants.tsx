import ScrollReveal from '../shared/ScrollReveal';
import TypewriterText from '../shared/TypewriterText';

/* ═══════════════════════════════════════════════════════
   5 HERO VARIANTS
   ═══════════════════════════════════════════════════════ */

/* ── 1. Typewriter — massive text, left-aligned ──────── */
function HeroTypewriter({ data, c, fonts }) {
    return (
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal animation="fade">
                <p style={{ color: c.accentAlt, fontSize: '1rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                    Portfolio
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
                <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
                    <TypewriterText text={data.bio?.name || 'Your Name'} speed={80} cursorColor={c.accentAlt} />
                </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
                <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, color: c.muted, maxWidth: '700px', lineHeight: 1.5 }}>
                    {data.bio?.title}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
                <p style={{ fontSize: '1.05rem', color: c.muted, maxWidth: '600px', marginTop: '1.5rem', lineHeight: 1.8, opacity: 0.7 }}>
                    {data.bio?.summary}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2.5rem' }}>
                    {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                        <span key={i} style={{ padding: '0.5rem 1.2rem', border: `1px solid ${c.border}`, borderRadius: '999px', fontSize: '0.85rem', color: c.muted, transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.target.style.borderColor = c.accent; e.target.style.color = c.accent; }}
                            onMouseLeave={e => { e.target.style.borderColor = c.border; e.target.style.color = c.muted; }}>
                            {item}
                        </span>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}

/* ── 2. Centered — gradient shapes, centered text ────── */
function HeroCentered({ data, c, fonts }) {
    return (
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', position: 'relative' }}>
            {/* Decorative shapes */}
            <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${c.accent}15, transparent 70%)`, top: '10%', right: '15%', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${c.accentAlt}12, transparent 70%)`, bottom: '20%', left: '10%', filter: 'blur(50px)' }} />

            <ScrollReveal animation="fade">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: `${c.accent}10`, border: `1px solid ${c.accent}20`, fontSize: '0.85rem', color: c.accent, marginBottom: '2rem' }}>
                    ✦ Available for opportunities
                </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
                <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', background: `linear-gradient(135deg, ${c.text || c.textDark}, ${c.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {data.bio?.name || 'Your Name'}
                </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
                <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: c.accent, fontWeight: 600, marginBottom: '1rem' }}>
                    {data.bio?.title}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
                <p style={{ fontSize: '1.05rem', color: c.muted, maxWidth: '550px', lineHeight: 1.8 }}>
                    {data.bio?.summary}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
                    {[data.bio?.email, data.bio?.location].filter(Boolean).map((item, i) => (
                        <span key={i} style={{ padding: '0.5rem 1.2rem', borderRadius: '12px', fontSize: '0.85rem', background: `${c.accent}08`, border: `1px solid ${c.accent}15`, color: c.muted }}>
                            {item}
                        </span>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}

/* ── 3. Terminal — command prompt style ───────────────── */
function HeroTerminal({ data, c, fonts }) {
    return (
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal animation="fade">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', background: `${c.accent}10`, border: `1px solid ${c.accent}30`, fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", color: c.accent, marginBottom: '2rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c.accent, boxShadow: `0 0 8px ${c.accent}`, animation: 'pulse 2s infinite' }} />
                    SYSTEM ONLINE
                </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: c.muted, marginBottom: '0.5rem' }}>
                    {'>'} identify --user
                </div>
                <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
                    <span style={{ borderBottom: `3px solid ${c.accent}`, paddingBottom: '4px' }}>
                        {data.bio?.name || 'Your Name'}
                    </span>
                </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: c.muted, marginBottom: '0.5rem' }}>
                    {'>'} describe --role
                </div>
                <p style={{ fontSize: '1.3rem', color: c.accent, fontWeight: 600, marginBottom: '1.5rem', textShadow: `0 0 20px ${c.accent}30` }}>
                    {data.bio?.title}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
                <p style={{ fontSize: '1rem', color: c.muted, maxWidth: '600px', lineHeight: 1.8, borderLeft: `2px solid ${c.accent}30`, paddingLeft: '1rem' }}>
                    {data.bio?.summary}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
                    {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                        <span key={i} style={{ padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", background: `${c.accent}08`, border: `1px solid ${c.border}`, color: c.muted }}>
                            {item}
                        </span>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}

/* ── 4. Split — two-column with animated divider ─────── */
function HeroSplit({ data, c, fonts }) {
    return (
        <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', gap: '4rem', alignItems: 'center' }}>
            <div>
                <ScrollReveal animation="fade-up">
                    <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        {data.bio?.name || 'Your Name'}
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100}>
                    <p style={{ fontSize: '1.2rem', color: c.accent, fontWeight: 600, marginBottom: '1rem' }}>
                        {data.bio?.title}
                    </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={200}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                        {[data.bio?.email, data.bio?.location, data.bio?.phone].filter(Boolean).map((item, i) => (
                            <span key={i} style={{ padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.85rem', background: `${c.accent}08`, border: `1px solid ${c.border}`, color: c.muted }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
            <div style={{ borderLeft: `2px solid ${c.accent}30`, paddingLeft: '3rem' }}>
                <ScrollReveal animation="fade-up" delay={200}>
                    <p style={{ fontSize: '1.1rem', color: c.muted, lineHeight: 1.9 }}>
                        {data.bio?.summary}
                    </p>
                </ScrollReveal>
                {data.skills?.length > 0 && (
                    <ScrollReveal animation="fade-up" delay={300}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '2rem' }}>
                            {data.skills.flatMap(g => g.items || []).slice(0, 8).map((skill, i) => (
                                <span key={i} style={{ padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: c.accent, background: `${c.accent}10` }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </section>
    );
}

/* ── 5. Glitch — glitch text effect with neon ────────── */
function HeroGlitch({ data, c, fonts }) {
    const name = data.bio?.name || 'Your Name';
    return (
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Animated accent bars */}
            <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${c.accent}40, transparent)`, animation: 'pulse 3s infinite' }} />
            <div style={{ position: 'absolute', top: '80%', left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${c.accentAlt}30, transparent)`, animation: 'pulse 4s infinite 1s' }} />

            <ScrollReveal animation="fade">
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: c.accent, marginBottom: '2rem', textTransform: 'uppercase' }}>
                    {'// '} PORTFOLIO INITIALIZED
                </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
                <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1rem', position: 'relative' }}>
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        {name}
                        {/* Glitch shadow layers */}
                        <span style={{ position: 'absolute', top: '2px', left: '2px', color: c.accent, opacity: 0.3, clipPath: 'inset(0 0 60% 0)' }} aria-hidden="true">{name}</span>
                        <span style={{ position: 'absolute', top: '-2px', left: '-2px', color: c.accentAlt, opacity: 0.3, clipPath: 'inset(60% 0 0 0)' }} aria-hidden="true">{name}</span>
                    </span>
                </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
                <p style={{ fontSize: '1.3rem', fontWeight: 600, color: c.accent, marginBottom: '1rem', textShadow: `0 0 15px ${c.accent}40` }}>
                    {data.bio?.title}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
                <p style={{ fontSize: '1rem', color: c.muted, maxWidth: '500px', lineHeight: 1.8 }}>
                    {data.bio?.summary}
                </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
                    {[data.bio?.email, data.bio?.location].filter(Boolean).map((item, i) => (
                        <span key={i} style={{ padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", background: `${c.accent}08`, border: `1px solid ${c.border}`, color: c.muted }}>
                            {item}
                        </span>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}

/* ── Export map ────────────────────────────────────────── */
const HERO_MAP = { typewriter: HeroTypewriter, centered: HeroCentered, terminal: HeroTerminal, split: HeroSplit, glitch: HeroGlitch };
export default function HeroSection({ variant, data, c, fonts }) {
    const Comp = HERO_MAP[variant] || HeroTypewriter;
    return <Comp data={data} c={c} fonts={fonts} />;
}
