import { useRef, useEffect } from 'react';

/**
 * FloatingParticles — canvas-based ambient floating particles background.
 */
export default function FloatingParticles({
    count = 40,
    color = 'rgba(255,255,255,0.3)',
    maxSize = 3,
    speed = 0.4,
    style = {},
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
            canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
            ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        };

        const initParticles = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * maxSize + 0.5,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                alpha: Math.random() * 0.5 + 0.2,
            }));
        };

        const draw = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // wrap around
                if (p.x < -5) p.x = w + 5;
                if (p.x > w + 5) p.x = -5;
                if (p.y < -5) p.y = h + 5;
                if (p.y > h + 5) p.y = -5;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = color.replace(/[\d.]+\)$/, `${p.alpha})`);
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        resize();
        initParticles();
        draw();

        window.addEventListener('resize', () => { resize(); initParticles(); });
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [count, color, maxSize, speed]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                ...style,
            }}
        />
    );
}
