'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { usePreTextAnimation } from '@/hooks/preTextAnimation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaGithub } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Image from 'next/image';

const ProjectSection = () => {
    // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    // const emblaUseRefs = useRef<(HTMLDivElement | null)[]>([]);
    const techs = [
        { name: 'JavaScript', class: 'devicon-javascript-plain colored' },
        { name: 'React', class: 'devicon-react-original colored' },
        { name: 'Node.js', class: 'devicon-nodejs-plain colored' },
        { name: 'Python', class: 'devicon-python-plain colored' },
    ];
    const ProjectApi = [
        {
            'no': '1',
            'images': [
                '/Ninja/Dragon.jpg',
                '/Ninja/JurassicPark.jpg',
                '/Ninja/Narwhal.jpg',
                '/Ninja/T-RexandClippy.jpg'
            ],
            'name': 'Ninja Project',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'
        },
        {
            'no': '2',
            'images': [
                '/October/SurfaceEarbuds.jpg',
                '/October/SurfaceFamily2019.jpg',
                '/October/SurfaceLaptop3-Sandstone.jpg',
                '/October/SurfacePros.jpg'
            ],
            'name': 'October Project',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'

        },
        {
            'no': '3',
            'images': [
                '/Xbox/HaloInfinite.jpg',
                '/Xbox/XboxGear2.jpg',
                '/Xbox/XboxGear3.jpg',
                '/Xbox/XboxGear2.jpg'
            ],
            'name': 'Xbox Project',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'

        },
        {
            'no': '4',
            'images': [
                '/BuildPhoto/Background-BuildExpoHall.jpg',
                '/BuildPhoto/FluentRibbon-Build2020.jpg',
                '/BuildPhoto/WindowsXP.jpg',
                '/BuildPhoto/RedShirtFanClub.jpg'
            ],
            'name': 'Build Photo Project',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'

        }
    ];
    // const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);


    const lineSectionTriggerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    usePreTextAnimation({
        trigger: lineSectionTriggerRef,
        line: lineRef,
        box: boxRef,
    })

    return (
        <div className='my-[5rem]' ref={lineSectionTriggerRef}>
            <section className="h-[50vh] flex items-center justify-center bg-neutral-900 relative overflow-hidden py-[10rem]">
                <div
                    ref={lineRef}
                    className="absolute w-px h-dvh bg-white origin-bottom scale-y-0"
                ></div>
                <div
                    ref={boxRef}
                    className="text-4xl font-bold text-blue-600 relative z-10 bg-neutral-900 px-6"
                >
                    Let&apos;s Explore My Projects
                </div>
            </section>
            <section className="relative overflow-hidden min-h-screen text-white max-w-6xl mx-auto mt-[10rem] py-[2em]" id='project'>
                <div className="flex mt-[5rem]">
                    <p className="gsap-box-left text-white text-9xl font-bold border-r-4 border-blue-900 w-fit pe-[3rem]">Projects</p>
                </div>
                <div
                    className="grid grid-cols-2 gap-10 mt-[5rem]"
                >
                    {/* Loop start from here */}
                    {
                        ProjectApi.map((project, i) => (
                            <div className='bg-blue-500 rounded-xl shadow-lg bg-neutral-800 pb-3' key={i}>
                                <div>
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 2000 }}
                                        loop={true}
                                        className='rounded-xl'
                                    >
                                        {
                                            project.images.map((src, i) => (
                                                <SwiperSlide key={i}>
                                                    <div className="relative h-64 w-full">
                                                        <Image
                                                            src={src}
                                                            alt={`Project: ${i}`}
                                                            fill
                                                            priority
                                                            sizes="(min-width: 808px) 50vw, 100vw"
                                                            style={{
                                                                objectFit: 'cover', // cover, contain, none
                                                            }}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                                <div className='p-3 border-b-1 border-gray-500 flex justify-between items-center'>
                                    <div>
                                        <p className="font-bold text-2xl">
                                            {project.name}
                                        </p>
                                        <small className='text-gray-400'>
                                            Data Analytics Web
                                        </small>
                                    </div>
                                    <div className='flex justify-center items-center bg-white shadow-lg rounded-xl text-black'>
                                        <a className='p-2 bg-white shadow-lg rounded-l-xl text-black hover:text-white hover:bg-neutral-900 transition-colors duration-300' rel="noopener" href="https://github.com/2holycatt/papinwit-portfolio" target="_blank">
                                            On GitHub
                                        </a>
                                        <FaGithub className='text-2xl mx-2' />
                                    </div>
                                </div>
                                <div className="p-3 border-b-1 border-gray-500">
                                    <p className='text-gray-300 max-h-24 overflow-y-scroll'>
                                        {project.description}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, quis. Explicabo vitae veniam vel sint. Iste quasi commodi iure incidunt eligendi at quas numquam dolores ea delectus. Nisi, quibusdam laboriosam?
                                    </p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 p-3">
                                    <div className="col-span-2">
                                        <p><span className='text-gray-400'>Role/Position:</span> Full-Stack Developer</p>
                                    </div>
                                    <div>
                                        <p><span className='text-gray-400'>Members:</span> 8</p>
                                    </div>
                                </div>
                                <div className="px-3 flex items-center">
                                    <div className='pe-2 border-r-3 border-blue-700 w-fit'><p className=''>Tech Stack</p></div>
                                    {/* <div className='ps-2'>
                                        <RiNextjsLine className='text-3xl' />
                                    </div> */}
                                    <div className='flex ps-2 gap-2'>
                                        {techs.map((tech, index) => (
                                            <i key={index} className={`${tech.class} text-2xl`} title={tech.name}></i>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </section >
        </div >
    )
}
export default ProjectSection