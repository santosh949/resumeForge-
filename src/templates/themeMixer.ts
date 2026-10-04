/**
 * Theme Mixer Engine
 * 
 * Generates unique portfolio themes by combining:
 * - Color palette (20 options)
 * - Font pairing (11 options)
 * - Background style (7 options)
 * - Section variants (8 per section)
 * - Section ordering
 * 
 * Total combinations: 20 × 11 × 7 × 8^6 × partial ordering = 40,000,000+ unique looks
 */

/* ── Seeded Random (deterministic from seed string) ───── */
function seededRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    let state = Math.abs(hash) || 1;
    return () => {
        state = (state * 1664525 + 1013904223) & 0x7fffffff;
        return state / 0x7fffffff;
    };
}

function pick(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
}

/* ── 15 Color Palettes ────────────────────────────────── */
const PALETTES = [
    {
        name: 'Emerald Night',
        bg: '#fafafa', bgDark: '#020617',
        text: '#0f172a', textDark: '#e2e8f0',
        muted: '#64748b', mutedDark: '#94a3b8',
        accent: '#10b981', accentDark: '#34d399', accentAlt: '#3b82f6',
        card: '#ffffff', cardDark: 'rgba(30,41,59,0.6)',
        border: '#e2e8f0', borderDark: '#1e293b',
    },
    {
        name: 'Violet Storm',
        bg: '#faf5ff', bgDark: '#0f0720',
        text: '#1e1b4b', textDark: '#e0e7ff',
        muted: '#6366f1', mutedDark: '#a5b4fc',
        accent: '#8b5cf6', accentDark: '#a78bfa', accentAlt: '#ec4899',
        card: 'rgba(255,255,255,0.7)', cardDark: 'rgba(30,20,60,0.6)',
        border: 'rgba(139,92,246,0.15)', borderDark: 'rgba(139,92,246,0.2)',
    },
    {
        name: 'Cyber Cyan',
        bg: '#0a0a1a', bgDark: '#0a0a1a',
        text: '#e2e8f0', textDark: '#e2e8f0',
        muted: '#64748b', mutedDark: '#64748b',
        accent: '#06b6d4', accentDark: '#06b6d4', accentAlt: '#d946ef',
        card: 'rgba(15,23,42,0.6)', cardDark: 'rgba(15,23,42,0.6)',
        border: 'rgba(6,182,212,0.2)', borderDark: 'rgba(6,182,212,0.2)',
    },
    {
        name: 'Sunset Warm',
        bg: '#fefcf3', bgDark: '#1a1a2e',
        text: '#2d2d2d', textDark: '#e8e8e8',
        muted: '#8d8d8d', mutedDark: '#a8a8b8',
        accent: '#e8915a', accentDark: '#f0a070', accentAlt: '#7eb8a0',
        card: '#fffdf7', cardDark: '#222240',
        border: '#ece8de', borderDark: '#2a2a4a',
    },
    {
        name: 'Midnight Blue',
        bg: '#f0f4ff', bgDark: '#0a0f1e',
        text: '#1e293b', textDark: '#e0e7ff',
        muted: '#6b7fa3', mutedDark: '#8b9ec4',
        accent: '#3b82f6', accentDark: '#60a5fa', accentAlt: '#6366f1',
        card: '#ffffff', cardDark: 'rgba(20,30,55,0.7)',
        border: '#dbeafe', borderDark: '#1e3a5f',
    },
    {
        name: 'Neon Rose',
        bg: '#0d0d0d', bgDark: '#0d0d0d',
        text: '#f5f5f5', textDark: '#f5f5f5',
        muted: '#888', mutedDark: '#999',
        accent: '#f43f5e', accentDark: '#fb7185', accentAlt: '#fb923c',
        card: 'rgba(25,25,25,0.8)', cardDark: 'rgba(25,25,25,0.8)',
        border: 'rgba(244,63,94,0.15)', borderDark: 'rgba(244,63,94,0.15)',
    },
    {
        name: 'Forest Deep',
        bg: '#f0fdf4', bgDark: '#022c22',
        text: '#14532d', textDark: '#dcfce7',
        muted: '#4ade80', mutedDark: '#86efac',
        accent: '#059669', accentDark: '#34d399', accentAlt: '#0d9488',
        card: '#ffffff', cardDark: 'rgba(5,50,35,0.6)',
        border: '#bbf7d0', borderDark: '#064e3b',
    },
    {
        name: 'Arctic Frost',
        bg: '#f8fafc', bgDark: '#0c1222',
        text: '#0f172a', textDark: '#e2e8f0',
        muted: '#7094c8', mutedDark: '#94b8e0',
        accent: '#38bdf8', accentDark: '#7dd3fc', accentAlt: '#818cf8',
        card: 'rgba(255,255,255,0.8)', cardDark: 'rgba(15,25,50,0.6)',
        border: '#bae6fd', borderDark: '#1e3a5f',
    },
    {
        name: 'Amber Glow',
        bg: '#fffbeb', bgDark: '#1a1000',
        text: '#451a03', textDark: '#fef3c7',
        muted: '#b45309', mutedDark: '#fbbf24',
        accent: '#f59e0b', accentDark: '#fbbf24', accentAlt: '#ef4444',
        card: '#ffffff', cardDark: 'rgba(40,30,10,0.7)',
        border: '#fde68a', borderDark: '#422006',
    },
    {
        name: 'Slate Pro',
        bg: '#fafafa', bgDark: '#0a0a0a',
        text: '#0a0a0a', textDark: '#fafafa',
        muted: '#737373', mutedDark: '#a3a3a3',
        accent: '#404040', accentDark: '#d4d4d4', accentAlt: '#525252',
        card: '#ffffff', cardDark: '#141414',
        border: '#e5e5e5', borderDark: '#262626',
    },
    {
        name: 'Electric Lime',
        bg: '#0a0a0a', bgDark: '#0a0a0a',
        text: '#f4f4f5', textDark: '#f4f4f5',
        muted: '#a1a1aa', mutedDark: '#a1a1aa',
        accent: '#a3e635', accentDark: '#a3e635', accentAlt: '#22d3ee',
        card: 'rgba(20,20,20,0.8)', cardDark: 'rgba(20,20,20,0.8)',
        border: 'rgba(163,230,53,0.15)', borderDark: 'rgba(163,230,53,0.15)',
    },
    {
        name: 'Coral Reef',
        bg: '#fff5f5', bgDark: '#1a0a10',
        text: '#1a1a2e', textDark: '#fce7f3',
        muted: '#e879a0', mutedDark: '#f9a8d4',
        accent: '#ec4899', accentDark: '#f472b6', accentAlt: '#8b5cf6',
        card: 'rgba(255,255,255,0.8)', cardDark: 'rgba(40,15,30,0.7)',
        border: '#fce7f3', borderDark: '#3b0a2a',
    },
    {
        name: 'Ocean Depth',
        bg: '#0f172a', bgDark: '#0f172a',
        text: '#e0f2fe', textDark: '#e0f2fe',
        muted: '#7dd3fc', mutedDark: '#7dd3fc',
        accent: '#0284c7', accentDark: '#38bdf8', accentAlt: '#2dd4bf',
        card: 'rgba(15,25,50,0.6)', cardDark: 'rgba(15,25,50,0.6)',
        border: 'rgba(56,189,248,0.15)', borderDark: 'rgba(56,189,248,0.15)',
    },
    {
        name: 'Lavender Dreams',
        bg: '#faf5ff', bgDark: '#1a0a2e',
        text: '#3b0764', textDark: '#f3e8ff',
        muted: '#a78bfa', mutedDark: '#c4b5fd',
        accent: '#a855f7', accentDark: '#c084fc', accentAlt: '#e879f9',
        card: 'rgba(255,255,255,0.7)', cardDark: 'rgba(30,10,50,0.6)',
        border: '#e9d5ff', borderDark: '#3b0764',
    },
    {
        name: 'Carbon Fiber',
        bg: '#111111', bgDark: '#111111',
        text: '#e4e4e7', textDark: '#e4e4e7',
        muted: '#71717a', mutedDark: '#a1a1aa',
        accent: '#fafafa', accentDark: '#fafafa', accentAlt: '#a1a1aa',
        card: 'rgba(24,24,27,0.9)', cardDark: 'rgba(24,24,27,0.9)',
        border: '#27272a', borderDark: '#27272a',
    },
    {
        name: 'Matrix Green',
        bg: '#000000', bgDark: '#000000',
        text: '#00ff41', textDark: '#c9d1d9',
        muted: '#4a9e4a', mutedDark: '#8b949e',
        accent: '#00ff41', accentDark: '#00ff41', accentAlt: '#00ccaa',
        card: 'rgba(0,20,0,0.6)', cardDark: 'rgba(0,20,0,0.6)',
        border: 'rgba(0,255,65,0.12)', borderDark: 'rgba(0,255,65,0.12)',
    },
    {
        name: 'Vaporwave Sunset',
        bg: '#1a0030', bgDark: '#0d0015',
        text: '#e0d0ff', textDark: '#e0d0ff',
        muted: '#9580c0', mutedDark: '#a090d0',
        accent: '#ff6ec7', accentDark: '#ff6ec7', accentAlt: '#00e5ff',
        card: 'rgba(30,0,60,0.6)', cardDark: 'rgba(30,0,60,0.6)',
        border: 'rgba(255,110,199,0.15)', borderDark: 'rgba(255,110,199,0.15)',
    },
    {
        name: 'Golden Editorial',
        bg: '#faf8f4', bgDark: '#121210',
        text: '#2c2c2c', textDark: '#e8e4dc',
        muted: '#8a8478', mutedDark: '#9a9488',
        accent: '#c9a84c', accentDark: '#c9a84c', accentAlt: '#8b7a3c',
        card: '#fffef9', cardDark: '#1a1a18',
        border: '#e8e2d6', borderDark: '#2a2a28',
    },
    {
        name: 'Aurora Night',
        bg: '#050d1a', bgDark: '#050d1a',
        text: '#e0eaff', textDark: '#e0eaff',
        muted: '#6b82b0', mutedDark: '#8ba0d0',
        accent: '#00d4aa', accentDark: '#00d4aa', accentAlt: '#8b5cf6',
        card: 'rgba(10,20,40,0.6)', cardDark: 'rgba(10,20,40,0.6)',
        border: 'rgba(0,212,170,0.12)', borderDark: 'rgba(0,212,170,0.12)',
    },
    {
        name: 'Brutalist Mono',
        bg: '#ffffff', bgDark: '#0a0a0a',
        text: '#000000', textDark: '#f0f0f0',
        muted: '#555555', mutedDark: '#999999',
        accent: '#ff3333', accentDark: '#ff3333', accentAlt: '#0000ff',
        card: '#f5f5f5', cardDark: '#141414',
        border: '#000000', borderDark: '#333333',
    },
];

/* ── 11 Font Pairings ─────────────────────────────────── */
const FONT_PAIRINGS = [
    { display: "'Outfit', sans-serif", body: "'Inter', sans-serif" },
    { display: "'Space Grotesk', sans-serif", body: "'Inter', sans-serif" },
    { display: "'JetBrains Mono', monospace", body: "'JetBrains Mono', monospace" },
    { display: "'Playfair Display', serif", body: "'Inter', sans-serif" },
    { display: "'Sora', sans-serif", body: "'Inter', sans-serif" },
    { display: "'DM Sans', sans-serif", body: "'DM Sans', sans-serif" },
    { display: "'Bricolage Grotesque', sans-serif", body: "'Inter', sans-serif" },
    { display: "'Plus Jakarta Sans', sans-serif", body: "'Plus Jakarta Sans', sans-serif" },
    { display: "'Cormorant Garamond', serif", body: "'Inter', sans-serif" },
    { display: "'Space Mono', monospace", body: "'Space Mono', monospace" },
    { display: "'DM Serif Display', serif", body: "'DM Sans', sans-serif" },
];

/* ── 7 Background Styles ──────────────────────────────── */
const BG_STYLES = ['solid', 'gradient', 'mesh', 'grid', 'dots', 'aurora', 'retro-grid'];

/* ── Section Variant IDs ──────────────────────────────── */
const HERO_VARIANTS = ['typewriter', 'centered', 'terminal', 'split', 'glitch', 'particles', 'parallax', 'aurora'];
const STATS_VARIANTS = ['strip', 'bento', 'glow', 'minimal', 'gradient', 'ring', 'animated-bar', 'wave'];
const EXP_VARIANTS = ['timeline', 'grid', 'cards', 'accordion', 'minimal', 'magazine', 'floating', 'stacked'];
const SKILLS_VARIANTS = ['pills', 'bars', 'orbs', 'grid', 'cloud', 'radar', 'hexgrid', 'marquee'];
const PROJ_VARIANTS = ['cards', 'showcase', 'glass', 'list', 'bento', 'carousel', 'masonry', 'spotlight'];
const EDU_VARIANTS = ['timeline', 'cards', 'minimal', 'badges', 'sideline', 'diploma', 'steps', 'mosaic'];

/* ── Name Generator ───────────────────────────────────── */
const NAME_ADJ = ['Cosmic', 'Cyber', 'Neon', 'Velvet', 'Crystal', 'Solar', 'Lunar', 'Chromatic', 'Infinite', 'Prism', 'Aurora', 'Zenith', 'Ethereal', 'Nova', 'Quantum'];
const NAME_NOUN = ['Drift', 'Pulse', 'Flux', 'Storm', 'Wave', 'Core', 'Edge', 'Spark', 'Shift', 'Bloom', 'Rise', 'Glow', 'Haze', 'Forge', 'Arc'];

/* ── Main Generator ───────────────────────────────────── */
export function generateMixedTheme(seed) {
    const rng = seededRandom(seed);

    const palette = pick(PALETTES, rng);
    const fonts = pick(FONT_PAIRINGS, rng);
    const bgStyle = pick(BG_STYLES, rng);

    // Use dark mode colors for dark-only palettes
    const isDarkPalette = palette.bg === palette.bgDark;

    return {
        seed,
        name: `${pick(NAME_ADJ, rng)} ${pick(NAME_NOUN, rng)}`,
        palette,
        fonts,
        bgStyle,
        isDarkPalette,
        sections: {
            hero: pick(HERO_VARIANTS, rng),
            stats: pick(STATS_VARIANTS, rng),
            experience: pick(EXP_VARIANTS, rng),
            skills: pick(SKILLS_VARIANTS, rng),
            projects: pick(PROJ_VARIANTS, rng),
            education: pick(EDU_VARIANTS, rng),
        },
    };
}

/* ── Get colors for current mode ──────────────────────── */
export function getColors(palette, isDarkPalette) {
    if (isDarkPalette) {
        return {
            bg: palette.bgDark,
            text: palette.textDark,
            muted: palette.mutedDark,
            accent: palette.accentDark || palette.accent,
            accentAlt: palette.accentAlt,
            card: palette.cardDark,
            border: palette.borderDark,
        };
    }
    return {
        bg: palette.bgDark,
        text: palette.textDark,
        muted: palette.mutedDark,
        accent: palette.accentDark || palette.accent,
        accentAlt: palette.accentAlt,
        card: palette.cardDark,
        border: palette.borderDark,
    };
}

/* ── Generate a unique seed ───────────────────────────── */
export function generateSeed() {
    return `mix-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/* ── Background renderer style ────────────────────────── */
export function getBgStyles(bgStyle, c) {
    const base = { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 };
    switch (bgStyle) {
        case 'gradient':
            return { ...base, background: `linear-gradient(135deg, ${c.bg} 0%, ${c.accent}08 50%, ${c.bg} 100%)` };
        case 'mesh':
            return { ...base, background: `radial-gradient(at 20% 30%, ${c.accent}10 0%, transparent 50%), radial-gradient(at 80% 70%, ${c.accentAlt}08 0%, transparent 50%), ${c.bg}` };
        case 'grid':
            return { ...base, backgroundImage: `linear-gradient(${c.accent}06 1px, transparent 1px), linear-gradient(90deg, ${c.accent}06 1px, transparent 1px)`, backgroundSize: '60px 60px', backgroundColor: c.bg };
        case 'dots':
            return { ...base, backgroundImage: `radial-gradient(${c.accent}15 1px, transparent 1px)`, backgroundSize: '30px 30px', backgroundColor: c.bg };
        case 'aurora':
            return { ...base, background: `linear-gradient(180deg, ${c.bg} 0%, ${c.accent}08 30%, ${c.accentAlt}06 60%, ${c.bg} 100%)` };
        case 'retro-grid':
            return { ...base, backgroundImage: `linear-gradient(${c.accent}08 1px, transparent 1px), linear-gradient(90deg, ${c.accent}08 1px, transparent 1px)`, backgroundSize: '50px 50px', backgroundColor: c.bg };
        default:
            return { ...base, background: c.bg };
    }
}

/* ── Extract stats from resume data ───────────────────── */
export function extractStats(data) {
    const stats = [];
    if (data.experience?.length) stats.push({ value: data.experience.length, suffix: '+', label: 'Companies' });
    if (data.projects?.length) stats.push({ value: data.projects.length, suffix: '+', label: 'Projects' });
    const totalSkills = data.skills?.reduce((sum, g) => sum + (g.items?.length || 0), 0) || 0;
    if (totalSkills) stats.push({ value: totalSkills, suffix: '+', label: 'Skills' });
    if (data.education?.length) stats.push({ value: data.education.length, suffix: '', label: 'Degrees' });
    return stats;
}
