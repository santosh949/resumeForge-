import { useRef, useEffect, useState } from 'react';

/**
 * ParallaxSection — wraps content in a parallax scroll effect.
 * @param {number} speed — parallax multiplier (0.1 = subtle, 0.5 = strong)
 * @param {string} direction — 'up' or 'down'
 */
export default function ParallaxSection({ children, speed = 0.3, direction = 'up', style = {} }) {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.innerHeight - rect.top;
            const val = scrolled * speed * (direction === 'up' ? -1 : 1);
            setOffset(val);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, direction]);

    return (
        <div
            ref={ref}
            style={{
                ...style,
                transform: `translateY(${offset}px)`,
                willChange: 'transform',
                transition: 'transform 0.1s linear',
            }}
        >
            {children}
        </div>
    );
}
