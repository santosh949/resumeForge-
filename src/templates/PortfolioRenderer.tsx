import BoldMinimal from './themes/BoldMinimal';
import GradientWave from './themes/GradientWave';
import DarkTerminal from './themes/DarkTerminal';
import SoftPastel from './themes/SoftPastel';
import NeonGlass from './themes/NeonGlass';
import CyberMatrix from './themes/CyberMatrix';
import RetroVaporwave from './themes/RetroVaporwave';
import ElegantSerif from './themes/ElegantSerif';
import AuroraBoreal from './themes/AuroraBoreal';
import BrutalistRaw from './themes/BrutalistRaw';
import CleanSlate from './themes/CleanSlate';
import MonochromeLight from './themes/MonochromeLight';
import CherryBlossom from './themes/CherryBlossom';
import ObsidianGlass from './themes/ObsidianGlass';
import ArcticMesh from './themes/ArcticMesh';
import ZenSpace from './themes/ZenSpace';
import VelvetMidnight from './themes/VelvetMidnight';
import { setAccentOverride } from './themes';

const THEME_MAP = {
    'bold-minimal': BoldMinimal,
    'gradient-wave': GradientWave,
    'dark-terminal': DarkTerminal,
    'soft-pastel': SoftPastel,
    'neon-glass': NeonGlass,
    'cyber-matrix': CyberMatrix,
    'retro-vaporwave': RetroVaporwave,
    'elegant-serif': ElegantSerif,
    'aurora-boreal': AuroraBoreal,
    'brutalist-raw': BrutalistRaw,
    'clean-slate': CleanSlate,
    'monochrome-light': MonochromeLight,
    'cherry-blossom': CherryBlossom,
    'obsidian-glass': ObsidianGlass,
    'arctic-mesh': ArcticMesh,
    'zen-space': ZenSpace,
    'velvet-midnight': VelvetMidnight,
};

/**
 * Renders the correct theme component based on themeId.
 * Falls back to BoldMinimal if themeId is unknown.
 * Supports customAccent: overrides accent colors across the theme.
 */
export default function PortfolioRenderer({ data, themeId, recruiterMode, customAccent }) {
    // Set the global accent override so getTheme() returns modified colors
    setAccentOverride(customAccent || null);

    const ThemeComponent = THEME_MAP[themeId] || BoldMinimal;
    return <ThemeComponent data={data} recruiterMode={recruiterMode} />;
}
