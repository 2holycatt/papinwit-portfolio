// components/ScrollIndicator.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollIndicator: React.FC = () => {
    const dotRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (dotRef.current || containerRef.current) {
            gsap.to(dotRef.current, {
                y: 15,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });

            gsap.to(containerRef.current, {
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 90^%', // element enters the bottom of viewport
                    end: '+=200', // fade out within 200px scroll
                    scrub: true, // link scroll to animation
                    // markers: true
                },
            });
        }
    }, []);

    return (
        <div className="scroll-indicator py-2 w-full backdrop-blur-sm flex items-center justify-center" ref={containerRef}>
            <div className="mouse">
                <div className="dot" ref={dotRef}></div>
            </div>
        </div>
    );
};

export default ScrollIndicator;
