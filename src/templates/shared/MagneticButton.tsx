import { useRef, useState } from 'react';

/**
 * MagneticButton — button that subtly moves toward cursor on hover.
 * @param {number} strength — distance multiplier (default 0.3)
 */
export default function MagneticButton({ children, strength = 0.3, style = {}, onClick, className = '' }) {
    const ref = useRef(null);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        setTranslate({ x: dx, y: dy });
    };

    const handleMouseLeave = () => {
        setTranslate({ x: 0, y: 0 });
    };

    return (
        <button
            ref={ref}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                transform: `translate(${translate.x}px, ${translate.y}px)`,
                transition: translate.x === 0 ? 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' : 'transform 0.1s ease-out',
                cursor: 'pointer',
            }}
        >
            {children}
        </button>
    );
}
