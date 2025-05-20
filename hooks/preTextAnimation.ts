import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export function usePreTextAnimation(refs: { [key: string]: React.RefObject<HTMLElement | null> }) {
    useEffect(() => {
        // Object.entries(refs).forEach(([key, ref]) => {
        //     if (ref.current) {

        //         console.log(`Animating ${key}:`);

        //     }
        // })
        const lineSection = refs.trigger.current;
        const boxCur = refs.box.current;
        const lineCur = refs.line.current;

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: lineSection,
                start: 'top 50%',
                end: 'top 10%',
                toggleActions: 'play none none reverse',
                scrub: true
                // scrub เป็นการทำให้ animation sync กับ scroll เรีกยว่า Scroll-linked animation 
                // markers: true
            }
        });

        tl.to(lineCur, {
            scaleY: 0.8,
            ease: 'power2.out',
            duration: 1
        })

        tl.fromTo(boxCur,
            { y: 100, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out'
            },
            '-=.05'
        );

    }, [refs]);
}