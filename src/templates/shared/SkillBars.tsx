import { useEffect, useRef, useState } from 'react';

/**
 * SkillBars — animated horizontal progress bars that fill on scroll.
 * @param {Array} skills - [{name, level}] where level is 0-100
 * @param {string} accentColor - the fill color
 * @param {string} bgColor - the track background color
 */
export default function SkillBars({ skills, accentColor = '#10b981', bgColor = 'rgba(100,100,100,0.15)', textColor = 'inherit' }) {
    const ref = useRef(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggered(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    if (!skills?.length) return null;

    return (
        <div ref={ref} className="space-y-4">
            {skills.map((skill, i) => (
                <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-semibold" style={{ color: textColor }}>
                            {skill.name}
                        </span>
                        <span className="text-xs font-medium" style={{ color: accentColor, opacity: 0.8 }}>
                            {skill.level}%
                        </span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: bgColor }}>
                        <div
                            className="h-full rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${accentColor}, ${accentColor}aa)`,
                                width: triggered ? `${skill.level}%` : '0%',
                                transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                                boxShadow: `0 0 8px ${accentColor}40`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
