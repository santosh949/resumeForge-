/**
 * 5 unique portfolio themes with distinct visual identities.
 * Each theme has colors, fonts, layout preferences, and animation styles.
 */

export const THEMES = [
    {
        id: 'bold-minimal',
        name: 'Bold Minimal',
        category: 'Minimalist',
        fonts: {
            display: "'Outfit', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#fafafa',
            bgDark: '#0a0a0a',
            text: '#0a0a0a',
            textDark: '#fafafa',
            muted: '#737373',
            mutedDark: '#a3a3a3',
            accent: '#0a0a0a',
            accentDark: '#fafafa',
            accentAlt: '#3b82f6',
            card: '#ffffff',
            cardDark: '#141414',
            border: '#e5e5e5',
            borderDark: '#262626',
        },
    },
    {
        id: 'gradient-wave',
        name: 'Gradient Wave',
        category: 'Creative',
        fonts: {
            display: "'Outfit', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#faf5ff',
            bgDark: '#0f0720',
            text: '#1e1b4b',
            textDark: '#e0e7ff',
            muted: '#6366f1',
            mutedDark: '#a5b4fc',
            accent: '#7c3aed',
            accentDark: '#a78bfa',
            accentAlt: '#ec4899',
            card: 'rgba(255,255,255,0.7)',
            cardDark: 'rgba(30,20,60,0.6)',
            border: 'rgba(139,92,246,0.15)',
            borderDark: 'rgba(139,92,246,0.2)',
        },
    },
    {
        id: 'dark-terminal',
        name: 'Dark Terminal',
        category: 'Dark & Sci-Fi',
        fonts: {
            display: "'JetBrains Mono', monospace",
            body: "'JetBrains Mono', monospace",
        },
        colors: {
            bg: '#0d1117',
            bgDark: '#0d1117',
            text: '#c9d1d9',
            textDark: '#c9d1d9',
            muted: '#8b949e',
            mutedDark: '#8b949e',
            accent: '#39d353',
            accentDark: '#39d353',
            accentAlt: '#58a6ff',
            card: '#161b22',
            cardDark: '#161b22',
            border: '#30363d',
            borderDark: '#30363d',
        },
    },
    {
        id: 'soft-pastel',
        name: 'Soft Pastel',
        category: 'Elegant',
        fonts: {
            display: "'Playfair Display', serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#fefcf3',
            bgDark: '#1a1a2e',
            text: '#2d2d2d',
            textDark: '#e8e8e8',
            muted: '#8d8d8d',
            mutedDark: '#a8a8b8',
            accent: '#e8915a',
            accentDark: '#f0a070',
            accentAlt: '#7eb8a0',
            card: '#fffdf7',
            cardDark: '#222240',
            border: '#ece8de',
            borderDark: '#2a2a4a',
        },
    },
    {
        id: 'neon-glass',
        name: 'Neon Glass',
        category: 'Dark & Sci-Fi',
        fonts: {
            display: "'Space Grotesk', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#0a0a1a',
            bgDark: '#0a0a1a',
            text: '#e2e8f0',
            textDark: '#e2e8f0',
            muted: '#64748b',
            mutedDark: '#64748b',
            accent: '#06b6d4',
            accentDark: '#06b6d4',
            accentAlt: '#d946ef',
            card: 'rgba(15,23,42,0.6)',
            cardDark: 'rgba(15,23,42,0.6)',
            border: 'rgba(6,182,212,0.2)',
            borderDark: 'rgba(6,182,212,0.2)',
        },
    },
    {
        id: 'cyber-matrix',
        name: 'Cyber Matrix',
        category: 'Dark & Sci-Fi',
        fonts: {
            display: "'JetBrains Mono', monospace",
            body: "'Space Mono', monospace",
        },
        colors: {
            bg: '#000000',
            bgDark: '#000000',
            text: '#00ff41',
            textDark: '#c9d1d9',
            muted: '#4a9e4a',
            mutedDark: '#8b949e',
            accent: '#00ff41',
            accentDark: '#00ff41',
            accentAlt: '#00ccaa',
            card: 'rgba(0,20,0,0.6)',
            cardDark: 'rgba(0,20,0,0.6)',
            border: 'rgba(0,255,65,0.12)',
            borderDark: 'rgba(0,255,65,0.12)',
        },
    },
    {
        id: 'retro-vaporwave',
        name: 'Retro Vaporwave',
        category: 'Creative',
        fonts: {
            display: "'Outfit', sans-serif",
            body: "'DM Sans', sans-serif",
        },
        colors: {
            bg: '#1a0030',
            bgDark: '#0d0015',
            text: '#e0d0ff',
            textDark: '#e0d0ff',
            muted: '#9580c0',
            mutedDark: '#a090d0',
            accent: '#ff6ec7',
            accentDark: '#ff6ec7',
            accentAlt: '#00e5ff',
            card: 'rgba(30,0,60,0.6)',
            cardDark: 'rgba(30,0,60,0.6)',
            border: 'rgba(255,110,199,0.15)',
            borderDark: 'rgba(255,110,199,0.15)',
        },
    },
    {
        id: 'elegant-serif',
        name: 'Elegant Serif',
        category: 'Elegant',
        fonts: {
            display: "'Cormorant Garamond', serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#faf8f4',
            bgDark: '#121210',
            text: '#2c2c2c',
            textDark: '#e8e4dc',
            muted: '#8a8478',
            mutedDark: '#9a9488',
            accent: '#c9a84c',
            accentDark: '#c9a84c',
            accentAlt: '#8b7a3c',
            card: '#fffef9',
            cardDark: '#1a1a18',
            border: '#e8e2d6',
            borderDark: '#2a2a28',
        },
    },
    {
        id: 'aurora-boreal',
        name: 'Aurora Boreal',
        category: 'Creative',
        fonts: {
            display: "'Sora', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#050d1a',
            bgDark: '#050d1a',
            text: '#e0eaff',
            textDark: '#e0eaff',
            muted: '#6b82b0',
            mutedDark: '#8ba0d0',
            accent: '#00d4aa',
            accentDark: '#00d4aa',
            accentAlt: '#8b5cf6',
            card: 'rgba(10,20,40,0.6)',
            cardDark: 'rgba(10,20,40,0.6)',
            border: 'rgba(0,212,170,0.12)',
            borderDark: 'rgba(0,212,170,0.12)',
        },
    },
    {
        id: 'brutalist-raw',
        name: 'Brutalist Raw',
        category: 'Minimalist',
        fonts: {
            display: "'Space Grotesk', sans-serif",
            body: "'Space Mono', monospace",
        },
        colors: {
            bg: '#ffffff',
            bgDark: '#0a0a0a',
            text: '#000000',
            textDark: '#f0f0f0',
            muted: '#555555',
            mutedDark: '#999999',
            accent: '#ff3333',
            accentDark: '#ff3333',
            accentAlt: '#0000ff',
            card: '#f5f5f5',
            cardDark: '#141414',
            border: '#000000',
            borderDark: '#333333',
        },
    },
    {
        id: 'clean-slate',
        name: 'Clean Slate',
        category: 'Minimalist',
        fonts: {
            display: "'Inter', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#ffffff',
            bgDark: '#ffffff',
            text: '#111827',
            textDark: '#111827',
            muted: '#6b7280',
            mutedDark: '#6b7280',
            accent: '#2563eb',
            accentDark: '#2563eb',
            accentAlt: '#1d4ed8',
            card: '#f9fafb',
            cardDark: '#f9fafb',
            border: '#e5e7eb',
            borderDark: '#e5e7eb',
        },
    },
    {
        id: 'monochrome-light',
        name: 'Monochrome Light',
        category: 'Minimalist',
        fonts: {
            display: "'Space Grotesk', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#f8f9fa',
            bgDark: '#f8f9fa',
            text: '#000000',
            textDark: '#000000',
            muted: '#495057',
            mutedDark: '#495057',
            accent: '#212529',
            accentDark: '#212529',
            accentAlt: '#343a40',
            card: '#ffffff',
            cardDark: '#ffffff',
            border: '#dee2e6',
            borderDark: '#dee2e6',
        },
    },
    {
        id: 'cherry-blossom',
        name: 'Cherry Blossom',
        category: 'Elegant',
        fonts: {
            display: "'Playfair Display', serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#fff5f8',
            bgDark: '#1a0d14',
            text: '#4a3b4c',
            textDark: '#fce7f3',
            muted: '#9e89a0',
            mutedDark: '#b8a4b9',
            accent: '#f472b6',
            accentDark: '#f472b6',
            accentAlt: '#ec4899',
            card: '#ffffff',
            cardDark: '#2d1822',
            border: '#fbcfe8',
            borderDark: '#452636',
        },
    },
    {
        id: 'obsidian-glass',
        name: 'Obsidian Glass',
        category: 'Dark & Sci-Fi',
        fonts: {
            display: "'Outfit', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#020617',
            bgDark: '#020617',
            text: '#f8fafc',
            textDark: '#f8fafc',
            muted: '#64748b',
            mutedDark: '#64748b',
            accent: '#cbd5e1',
            accentDark: '#cbd5e1',
            accentAlt: '#94a3b8',
            card: 'rgba(30, 41, 59, 0.4)',
            cardDark: 'rgba(30, 41, 59, 0.4)',
            border: 'rgba(255, 255, 255, 0.1)',
            borderDark: 'rgba(255, 255, 255, 0.1)',
        },
    },
    {
        id: 'arctic-mesh',
        name: 'Arctic Mesh',
        category: 'Minimalist',
        fonts: {
            display: "'Space Grotesk', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#fcfdfd',
            bgDark: '#0f172a',
            text: '#0f172a',
            textDark: '#f8fafc',
            muted: '#64748b',
            mutedDark: '#94a3b8',
            accent: '#0ea5e9',
            accentDark: '#38bdf8',
            accentAlt: '#0284c7',
            card: 'rgba(255, 255, 255, 0.8)',
            cardDark: 'rgba(30, 41, 59, 0.5)',
            border: 'rgba(14, 165, 233, 0.15)',
            borderDark: 'rgba(56, 189, 248, 0.2)',
        },
    },
    {
        id: 'zen-space',
        name: 'Zen Space',
        category: 'Minimalist',
        fonts: {
            display: "'Outfit', sans-serif",
            body: "'Space Mono', monospace",
        },
        colors: {
            bg: '#ffffff',
            bgDark: '#000000',
            text: '#000000',
            textDark: '#ffffff',
            muted: '#737373',
            mutedDark: '#a3a3a3',
            accent: '#000000',
            accentDark: '#ffffff',
            accentAlt: '#404040',
            card: '#ffffff',
            cardDark: '#000000',
            border: '#e5e5e5',
            borderDark: '#262626',
        },
    },
    {
        id: 'velvet-midnight',
        name: 'Velvet Midnight',
        category: 'Creative',
        fonts: {
            display: "'Sora', sans-serif",
            body: "'Inter', sans-serif",
        },
        colors: {
            bg: '#0f0518',
            bgDark: '#0f0518',
            text: '#f3e8ff',
            textDark: '#f3e8ff',
            muted: '#a855f7',
            mutedDark: '#a855f7',
            accent: '#d946ef',
            accentDark: '#d946ef',
            accentAlt: '#c084fc',
            card: 'rgba(46, 16, 101, 0.4)',
            cardDark: 'rgba(46, 16, 101, 0.4)',
            border: 'rgba(217, 70, 239, 0.2)',
            borderDark: 'rgba(217, 70, 239, 0.2)',
        },
    },
];
/**
 * Get a random theme ID
 */
export function getRandomThemeId() {
    return THEMES[Math.floor(Math.random() * THEMES.length)].id;
}

/**
 * Mutable accent override — set by PortfolioRenderer when customAccent is active
 */
let _accentOverride = null;

export function setAccentOverride(accent) {
    _accentOverride = accent;
}

/**
 * Internal: get the raw theme without any overrides (prevents circular calls)
 */
function _getBaseTheme(themeId) {
    return THEMES.find(t => t.id === themeId) || THEMES[0];
}

/**
 * Get theme config by ID. If an accent override is active, returns customized colors.
 */
export function getTheme(themeId) {
    const base = _getBaseTheme(themeId);
    if (_accentOverride) {
        return getThemeWithCustomColors(themeId, _accentOverride);
    }
    return base;
}

/**
 * Curated accent color presets
 */
export const ACCENT_PRESETS = [
    { name: 'Default', color: null },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Ocean', color: '#0ea5e9' },
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Violet', color: '#8b5cf6' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Fuchsia', color: '#d946ef' },
    { name: 'Lime', color: '#84cc16' },
    { name: 'Orange', color: '#f97316' },
];

// ─── Color utilities ──────────────────────────────
function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }
    return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Get a theme with custom accent colors applied.
 * Uses _getBaseTheme to avoid circular calls.
 * Only overrides `accent` — leaves accentDark/accentAlt intact
 * so creative themes with gradient backgrounds don't get blown out.
 */
export function getThemeWithCustomColors(themeId, customAccent) {
    const original = _getBaseTheme(themeId);
    if (!customAccent) return original;

    return {
        ...original,
        colors: {
            ...original.colors,
            accent: customAccent,
        },
        _customAccent: customAccent,
    };
}
