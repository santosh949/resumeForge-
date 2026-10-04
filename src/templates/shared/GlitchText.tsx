import { useId } from 'react';

/**
 * GlitchText — cyberpunk glitch distortion text effect.
 * Injects scoped keyframes for clip-path glitch animation.
 */
export default function GlitchText({ text, style = {}, color1 = '#00ff41', color2 = '#ff00ff', intensity = 'medium' }) {
    const id = useId().replace(/:/g, '');
    const dur = intensity === 'high' ? '0.8s' : intensity === 'low' ? '2s' : '1.2s';

    const keyframes = `
        @keyframes glitch-${id}-1 {
            0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(0); }
            10% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 1px); }
            20% { clip-path: inset(50% 0 20% 0); transform: translate(3px, -1px); }
            30% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
            40% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
            50% { clip-path: inset(30% 0 45% 0); transform: translate(-1px, 1px); }
            60% { clip-path: inset(65% 0 15% 0); transform: translate(1px, -1px); }
            70% { clip-path: inset(5% 0 85% 0); transform: translate(-3px, 0); }
            80% { clip-path: inset(45% 0 35% 0); transform: translate(3px, 0); }
            90% { clip-path: inset(75% 0 10% 0); transform: translate(0, 2px); }
        }
        @keyframes glitch-${id}-2 {
            0%, 100% { clip-path: inset(95% 0 0 0); transform: translate(0); }
            10% { clip-path: inset(60% 0 20% 0); transform: translate(3px, -1px); }
            20% { clip-path: inset(15% 0 50% 0); transform: translate(-3px, 1px); }
            30% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
            40% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 2px); }
            50% { clip-path: inset(45% 0 30% 0); transform: translate(1px, -1px); }
            60% { clip-path: inset(25% 0 55% 0); transform: translate(-1px, 1px); }
            70% { clip-path: inset(85% 0 5% 0); transform: translate(3px, 0); }
            80% { clip-path: inset(35% 0 45% 0); transform: translate(-3px, 0); }
            90% { clip-path: inset(10% 0 75% 0); transform: translate(0, -2px); }
        }
    `;

    const baseStyle = {
        position: 'relative',
        display: 'inline-block',
        ...style,
    };

    const layerBase = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    };

    return (
        <span style={baseStyle}>
            <style>{keyframes}</style>
            {text}
            <span
                aria-hidden="true"
                style={{
                    ...baseStyle,
                    ...layerBase,
                    color: color1,
                    animation: `glitch-${id}-1 ${dur} infinite linear`,
                    mixBlendMode: 'screen',
                }}
            >
                {text}
            </span>
            <span
                aria-hidden="true"
                style={{
                    ...baseStyle,
                    ...layerBase,
                    color: color2,
                    animation: `glitch-${id}-2 ${dur} infinite linear`,
                    animationDelay: '-0.3s',
                    mixBlendMode: 'screen',
                }}
            >
                {text}
            </span>
        </span>
    );
}
