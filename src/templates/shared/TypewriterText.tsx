import { useState, useEffect } from 'react';

/**
 * TypewriterText — types out text character by character with a blinking cursor.
 * @param {string} text - the text to type out
 * @param {number} speed - ms per character
 * @param {number} delay - initial delay before typing starts
 */
export default function TypewriterText({ text, speed = 50, delay = 300, className = '', cursorColor = '#10b981' }) {
    const [displayed, setDisplayed] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (!text) return;

        let index = 0;
        setDisplayed('');

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                index++;
                setDisplayed(text.slice(0, index));

                if (index >= text.length) {
                    clearInterval(interval);
                    // Keep cursor blinking after done
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    // Blink cursor
    useEffect(() => {
        const blink = setInterval(() => setShowCursor(v => !v), 530);
        return () => clearInterval(blink);
    }, []);

    return (
        <span className={className}>
            {displayed}
            <span style={{
                color: cursorColor,
                fontWeight: 100,
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s',
            }}>|</span>
        </span>
    );
}
