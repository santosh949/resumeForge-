import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — animates children into view when they enter the viewport.
 * @param {string} animation - 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'fade'
 * @param {number} delay - delay in ms before animation starts
 * @param {number} threshold - 0 to 1, how much of the element needs to be visible
 */
export default function ScrollReveal({ children, animation = 'fade-up', delay = 0, threshold = 0.15, className = '' }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    const baseStyle = {
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'transform, opacity',
    };

    const hiddenStyles = {
        'fade-up': { opacity: 0, transform: 'translateY(40px)' },
        'fade-left': { opacity: 0, transform: 'translateX(-40px)' },
        'fade-right': { opacity: 0, transform: 'translateX(40px)' },
        'scale': { opacity: 0, transform: 'scale(0.9)' },
        'fade': { opacity: 0 },
    };

    const visibleStyle = { opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...baseStyle,
                ...(isVisible ? visibleStyle : hiddenStyles[animation] || hiddenStyles['fade-up']),
            }}>
            {children}
        </div>
    );
}
