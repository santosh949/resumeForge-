import ScrollReveal from '../shared/ScrollReveal';
import AnimatedCounter from '../shared/AnimatedCounter';

/* ═══════════════════════════════════════════════════════
   5 STATS VARIANTS
   ═══════════════════════════════════════════════════════ */

/* ── 1. Strip — horizontal strip ─────────────────────── */
function StatsStrip({ stats, c, fonts }) {
    return (
        <ScrollReveal>
            <section style={{ borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: '3rem 2rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: fonts.display, color: c.accent }}>
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div style={{ fontSize: '0.8rem', color: c.muted, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </ScrollReveal>
    );
}

/* ── 2. Bento — bento-style boxes ────────────────────── */
function StatsBento({ stats, c, fonts }) {
    return (
        <section style={{ padding: '4rem 2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '1rem' }}>
                {stats.map((stat, i) => (
                    <ScrollReveal key={i} animation="scale" delay={i * 100}>
                        <div style={{ padding: '2rem 1.5rem', borderRadius: '16px', background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(12px)', textAlign: 'center', transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: fonts.display, color: c.accent }}><AnimatedCounter end={stat.value} suffix={stat.suffix} /></div>
                            <div style={{ fontSize: '0.75rem', color: c.muted, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}

/* ── 3. Glow — neon glow numbers ─────────────────────── */
function StatsGlow({ stats, c, fonts }) {
    return (
        <section style={{ padding: '4rem 2rem', background: `${c.accent}03` }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
                {stats.map((stat, i) => (
                    <ScrollReveal key={i} animation="scale" delay={i * 100}>
                        <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: fonts.display, color: c.accent, textShadow: `0 0 30px ${c.accent}40, 0 0 60px ${c.accent}15` }}>
                            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </div>
                        <div style={{ fontSize: '0.8rem', color: c.muted, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}

/* ── 4. Minimal — inline text style ──────────────────── */
function StatsMinimal({ stats, c, fonts }) {
    return (
        <ScrollReveal>
            <section style={{ padding: '3rem 2rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 900, fontFamily: fonts.display, color: c.accent }}>
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </span>
                            <span style={{ fontSize: '0.9rem', color: c.muted, fontWeight: 500 }}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </ScrollReveal>
    );
}

/* ── 5. Gradient — gradient background cards ─────────── */
function StatsGradient({ stats, c, fonts }) {
    return (
        <section style={{ padding: '4rem 2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '1rem' }}>
                {stats.map((stat, i) => (
                    <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                        <div style={{ padding: '2rem', borderRadius: '16px', background: `linear-gradient(135deg, ${c.accent}12, ${c.accentAlt}08)`, border: `1px solid ${c.accent}20`, textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: fonts.display, background: `linear-gradient(135deg, ${c.accent}, ${c.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: c.muted, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}

const STATS_MAP = { strip: StatsStrip, bento: StatsBento, glow: StatsGlow, minimal: StatsMinimal, gradient: StatsGradient };
export default function StatsSection({ variant, stats, c, fonts }) {
    if (!stats.length) return null;
    const Comp = STATS_MAP[variant] || StatsStrip;
    return <Comp stats={stats} c={c} fonts={fonts} />;
}
