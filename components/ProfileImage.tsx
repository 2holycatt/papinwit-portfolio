'use client';

import Image from 'next/image';
// import { useEffect } from 'react';
// import gsap from 'gsap';

type Props = {
    width: number;
    height: number;
};

export default function ProfileImage({ width, height }: Props) {
    // useEffect(() => {
    //     gsap.fromTo(
    //         '.gsap-box-up',
    //         { opacity: 0, y: 50 },
    //         {
    //             opacity: 1,
    //             y: 0,
    //             duration: 0.5,
    //             stagger: 0.2,
    //         }
    //     )
    // }, []);

    return (
        <Image
            src="/2earth2.png"
            alt="Profile"
            width={width}
            height={height}
            className="relative translate-x-60 translate-y-6 block z-10"
            priority
        />
    );
}