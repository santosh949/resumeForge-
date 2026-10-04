import React from 'react';

/**
 * SectionLink handles smooth scrolling to an element ID without breaking HashRouter routing.
 */
export default function SectionLink({ targetId, children, className, style }) {
    const handleClick = (e) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a
            href={`#${targetId}`}
            onClick={handleClick}
            className={className}
            style={{ cursor: 'pointer', ...style }}
        >
            {children}
        </a>
    );
}
