import { useRef, useState } from 'react';

/**
 * TiltCard — 3D perspective tilt effect on hover.
 * @param {number} maxTilt — max rotation degrees (default 12)
 * @param {boolean} glare — show glare overlay on hover
 */
export default function TiltCard({ children, maxTilt = 12, glare = true, style = {} }) {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - y) * maxTilt * 2;
        setTilt({ rotateX, rotateY });
        setGlarePos({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 });
        setIsHovered(false);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                position: 'relative',
                overflow: 'hidden',
                willChange: 'transform',
            }}
        >
            {children}
            {glare && isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        borderRadius: 'inherit',
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                    }}
                />
            )}
        </div>
    );
}
