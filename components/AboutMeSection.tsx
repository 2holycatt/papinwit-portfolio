'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePreTextAnimation } from '@/hooks/preTextAnimation';
// import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const AboutMeSection = () => {

    const lineSecionTriggerRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const boxRef = useRef<HTMLDivElement | null>(null);

    usePreTextAnimation({
        trigger: lineSecionTriggerRef,
        line: lineRef,
        box: boxRef
    });

    return (
        <div className='my-[5rem]'>
            <section
                ref={lineSecionTriggerRef}
                className='h-[50vh] flex items-center justify-center bg-neutral-900 relative overflow-hidden py-[10rem]'
            >
                <div
                    ref={lineRef}
                    className='absolute w-px h-dvh bg-white origin-bottom scale-y-0'
                >

                </div>
                <div
                    ref={boxRef}
                    className='text-4xl font-bold text-blue-600 relative z-10 bg-neutral-900 px-6'
                >
                    {/* Let&apos;s get to know me better */}
                    About
                </div>
            </section>
            <section className='text-white mt-[10rem] min-h-screen max-w-6xl mx-auto' id="about">
                <div className='text-9xl font-bold'>
                    <p>About</p>
                </div>
                <div className='grid grid-cols-4 gap-6 mt-5'>
                    <div className='md:h-64 md:w-64 bg-blue-900'>
                        <p>Fullname</p>
                    </div>
                    <div className='md:h-64 md:w-64 bg-blue-900'>
                        <p>Age</p>
                    </div>
                    <div className='md:h-64 md:w-64 bg-blue-900'>
                        <p>Nation</p>
                    </div>
                    <div className='md:h-64 md:w-64 bg-neutral-900'>
                        {/* <p>Fullname</p> */}
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-6 mt-[2em]'>
                    <div className='md:h-64 md:w-64 bg-neutral-900'>
                        {/* <p>Fullname</p> */}
                    </div>
                    <div className='md:h-64 md:w-64 bg-blue-900'>
                        <p>Age</p>
                    </div>
                    <div className='md:h-64 md:w-64 bg-blue-900'>
                        <p>Nation</p>
                    </div>
                    <div className='md:h-64 md:w-64 bg-blue-900'>
                        <p>Fullname</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutMeSection;