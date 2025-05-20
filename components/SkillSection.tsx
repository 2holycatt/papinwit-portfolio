'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePreTextAnimation } from '@/hooks/preTextAnimation';
// import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger)

const SkillSection = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const lineSectionTriggerRef = useRef<HTMLDivElement | null>(null);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const skillContextRef = useRef<HTMLDivElement | null>(null);
    
    usePreTextAnimation({
        trigger: lineSectionTriggerRef,
        line: lineRef,
        box: boxRef,
    });


    useEffect(() => {

        const element = sectionRef.current;
        const trigger = triggerRef.current;
        const skillContext = skillContextRef.current;


        if (!element || !trigger || !skillContext) return;

        const skills = element.querySelectorAll('.skill')

        gsap.to(element, {
            xPercent: -100 * (skills.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: trigger,
                start: 'top top',

                // distance
                end: () => '+=' + trigger.offsetWidth * 2,

                // reduce lag
                scrub: true,

                // hold element while scrolling
                pin: true,

                anticipatePin: 1,
            },
        })

        gsap.fromTo(
            skillContext,
            { x: -100, autoAlpha: 0 },
            {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: skillContext,
                    start: 'top 80%', // เริ่ม animation เมื่อถึง 80% ของ viewport
                    end: 'top 50%',   // สามารถขยายได้ตามต้องการ
                    toggleActions: 'play none none reverse', // เล่น animation แล้วย้อนกลับ
                },
            }

        )
    }, []);

    return (
        <div className='my-[5rem]'>
            <section
                ref={lineSectionTriggerRef}
                className="h-[50vh] flex items-center justify-center bg-neutral-900 relative overflow-hidden py-[10rem]"
            >
                <div
                    ref={lineRef}
                    className="absolute w-px h-dvh bg-white origin-bottom scale-y-0"
                ></div>
                <div
                    ref={boxRef}
                    className="text-4xl font-bold text-blue-600 relative z-10 bg-neutral-900 px-6"
                >
                    Let&apos;s Explore My Skills
                </div>

            </section>
            {/* ref={triggerRef} */}
            <section ref={triggerRef} className="relative overflow-hidden min-h-screen text-white max-w-6xl mx-auto mt-[10rem] py-[2em]" id='skill'>
                <div className="flex mt-[5rem]">
                    <p ref={skillContextRef} className="gsap-box-left text-white text-9xl font-bold border-r-4 border-blue-900 w-fit pe-[3rem]">Skill</p>
                    <p ref={skillContextRef} className="gsap-box-left text-white text-9xl font-bold w-fit ps-[3rem]">Software <br /> Development</p>
                </div>

                {/* ref={sectionRef} */}
                <div
                    ref={sectionRef}
                    // "flex-row-reverse" dont forget to add in to className kub 
                    className="flex w-[400vw] h-screen flex-row-reverse"
                >
                    <div id="Languages">
                        <div>
                            <p>Languages</p>
                        </div>
                        <div>
                            <div className='lang-icon rounded-fill'>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default SkillSection