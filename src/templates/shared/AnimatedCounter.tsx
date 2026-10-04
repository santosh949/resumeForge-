import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedCounter — counts from 0 to a target number when scrolled into view.
 * @param {number} end - target number
 * @param {string} suffix - text after number (e.g. '+', '%', ' years')
 * @param {string} prefix - text before number (e.g. '$')
 * @param {number} duration - animation duration in ms
 */
export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, className = '' }) {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;

        const startTime = Date.now();
        const endNum = parseFloat(end) || 0;

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * endNum);

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    }, [started, end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}
