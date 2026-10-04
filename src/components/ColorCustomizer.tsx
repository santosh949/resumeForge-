import { useState } from 'react';
import { ACCENT_PRESETS } from '../templates/themes';

/**
 * A sleek row of color swatches + a custom color picker.
 * Appears on the portfolio preview page.
 */
export default function ColorCustomizer({ currentAccent, onAccentChange, isDark }) {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div className="color-customizer">
            <div className="color-customizer-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13.5" cy="6.5" r="2.5" />
                    <circle cx="17.5" cy="10.5" r="2.5" />
                    <circle cx="8.5" cy="7.5" r="2.5" />
                    <circle cx="6.5" cy="12.5" r="2.5" />
                    <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-1.5 4-3 4h-1.8c-.8 0-1.2.9-.7 1.5.3.4.5.9.5 1.5 0 1.7-1.3 3-3 3z" />
                </svg>
                Accent Color
            </div>

            <div className="color-swatches">
                {ACCENT_PRESETS.map((preset, i) => (
                    <button
                        key={i}
                        className={`color-swatch ${(preset.color === currentAccent || (!preset.color && !currentAccent)) ? 'color-swatch-active' : ''
                            }`}
                        onClick={() => onAccentChange(preset.color)}
                        title={preset.name}
                        style={{
                            background: preset.color
                                ? preset.color
                                : isDark
                                    ? 'linear-gradient(135deg, #333, #555)'
                                    : 'linear-gradient(135deg, #ccc, #eee)',
                        }}
                    >
                        {!preset.color && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <path d="M18 6L6 18" />
                            </svg>
                        )}
                    </button>
                ))}

                {/* Custom color picker */}
                <div className="color-swatch-custom-wrap">
                    <button
                        className={`color-swatch color-swatch-custom ${showPicker ? 'color-swatch-active' : ''}`}
                        onClick={() => setShowPicker(!showPicker)}
                        title="Custom Color"
                        style={{
                            background: currentAccent && !ACCENT_PRESETS.find(p => p.color === currentAccent)
                                ? currentAccent
                                : 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                        }}
                    />
                    {showPicker && (
                        <div className="color-picker-dropdown">
                            <input
                                type="color"
                                value={currentAccent || '#10b981'}
                                onChange={e => onAccentChange(e.target.value)}
                                className="color-picker-input"
                            />
                            <span className="color-picker-hex">{currentAccent || 'Default'}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
