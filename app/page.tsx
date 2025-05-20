'use client';
import ProfileImage from "@/components/ProfileImage";
// import Image from "next/image";
// import { useState } from 'react';
// import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from "@heroicons/react/24/solid";
// import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { BsDownload } from "react-icons/bs";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Source_Sans_3 } from "next/font/google";
import ScrollIndicator from "@/components/ScrollIndicator";
import SkillSection from "@/components/SkillSection";
import AboutMeSection from "@/components/AboutMeSection";

const oswald = Source_Sans_3({
  weight: '700',
  subsets: ['latin']
})

const Home = () => {


  // const [imgWidth, setImgWidth] = useState(200);
  // const [imgHeight, setImgHeight] = useState(200);
  // const boxesRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    // if (!boxesRef.current) return;

    gsap.fromTo(
      '.gsap-box-left',
      { autoAlpha: 0, x: -50 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      '.gsap-box-right',
      { autoAlpha: 0, x: 50 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.2,
      }
    );

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove('text-blue-800', 'font-bold');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('text-blue-800', 'font-bold');
              }
            });
          }
        });
      },
      {
        threshold: 0.6, // ต้องเข้า viewport อย่างน้อย 60% ถึงจะ trigger
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };


  }, []);
  return (
    <main className="bg-neutral-900	font-sans relative">
      <div className="shadow-lg fixed z-[1000] right-30 bottom-10 p-2 bg-white rounded-md border-2 border-solid border-indigo-500 flex items-center">
        <a href="#" title="view resume" className="font-bold pe-2 border-1 border-white border-r-gray-200 hover:text-blue-800 duration-300 transition-colors">My resume</a>
        <a href="#" title="donwload" className="text-lg ps-2 hover:text-green-800 duration-300 transition-colors"><BsDownload /></a>
      </div>
      <div className="sticky top-0 z-50 backdrop-blur-md py-3 border-b-[0.125rem] border-blue-800">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6 py-3">
          <div className="text-blue-800">
            <a href="#main" className="font-bold">PAPINWIT</a>
          </div>
          <div className="flex justify-between text-gray-500 font-bold" id="navbar">
            <a href="#about" className="nav-link">About</a>
            <a href="#skill" className="nav-link">Skill</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#project" className="nav-link">Project</a>
          </div>
        </div>
      </div>
      <div id="main" className="relative rounded-md max-w-6xl mx-auto py-[1m]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch py-5">
          <div className="col-span-2">
            <div className="overflow-y-clip">
              {/* React Hook */}
              {/* <ProfileImage width={imgWidth} height={imgHeight} /> */}
              <div className="relative w-fit z-0 overflow-y-clip">
                <ProfileImage
                  width={600}
                  height={600}
                />
                <div className={`${oswald.className} absolute inset-0 flex flex-col mt-[5em] text-white z-[2]`}>
                  <p className="gsap-box-left text-5xl">Hi, I am</p>
                  <p className="gsap-box-left text-[6rem] text-blue-800 text-shadow-lg/50">Papinwit</p>
                  <p className="gsap-box-left text-[5rem] text-blue-800 mb-2 text-shadow-lg/50">Simawan</p>
                  <div className="gsap-box-left mt-3 flex">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl me-5">
                      <FaFacebook />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl me-5">
                      <FaLinkedin />
                    </a>
                    {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                      <FaEnvelope />
                    </a> */}
                    <p className="text-2xl flex">
                      <FaEnvelope className="me-3" /><span className="text-base">papinwit.s@kkumail.com</span>
                    </p>
                  </div>
                  {/* <p className="text-xl text-white">Software Engineer</p> */}
                </div>
                {/* <div>
                  <p className="text-white">Earth</p>
                </div> */}
              </div>
            </div>
            {/* <div>
              <div className="flex justify-center">
                <button type='button'
                  onClick={() => {
                    setImgHeight(imgHeight + 20);
                    setImgWidth(imgWidth + 20);
                  }}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                  <MagnifyingGlassPlusIcon className="h-6 w-6 text-white-500" /> Zoom In
                </button>
                <button type='button' onClick={() => {
                  setImgHeight(imgHeight - 20);
                  setImgWidth(imgWidth - 20);
                }}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                  <MagnifyingGlassMinusIcon className="h-6 w-6 text-white-500" /> Zoom Out
                </button>
              </div>
            </div> */}
          </div>
          <section className="relative max-w-3xl">
            {/* <GlobeAsiaAustraliaIcon 
              className="absolute inset-x-0 -top-14 text-blue-900 z-0 mx-auto"
              height={400}
              width={400}
            /> */}
            <div className="mt-[5em]">
              <ImQuotesLeft className="gsap-box-right text-gray-500 text-8xl" />
              <p className={`${oswald.className} gsap-box-right relative text-2xl font-extralight text-gray-400 z-10 tracking-wide`}>
                Fresh IT graduate passionate about <br />
                <span className="text-blue-500 text-3xl">Software Development</span>
                <span className="ms-2 text-3xl">&</span><br />
                <span className="text-blue-500 text-3xl flex items-center">
                  Data Science
                  <span className="ms-2 -bottom-2 flex gap-1 animate-pulse w-fit">
                    <span className="w-1 h-2 bg-blue-300 animate-bounce delay-100"></span>
                    <span className="w-1 h-4 bg-blue-400 animate-bounce delay-200"></span>
                    <span className="w-1 h-3 bg-blue-500 animate-bounce delay-300"></span>
                  </span>
                </span>

                Committed to building solutions that solve real problems.
                Seeking opportunities in the IT or related field
                {/* Currently seeking opportunities as a <strong>Full-stack Developer</strong>, <strong>Software Engineer</strong>, or <strong>Data Scientist</strong> where I can apply my skills and grow with a dynamic team. */}
              </p>
              <small className="gsap-box-right text-gray-500">
                May 15 2025, 20 days ago
              </small>
              {/* <p className="relative text-lg text-gray-300 z-10">
                Seeking opportunities as a <strong>Software Engineer</strong>, <strong>Full-stack Developer</strong>, or <strong>ML Engineer</strong>, with a focus on building efficient and scalable systems.
              </p> */}
            </div>
            {/* <div>
              <button type="button" className="mt-5 p-2 border-2 border-blue-500 text-white">Learn more</button>
            </div> */}

          </section>
        </div>
        <ScrollIndicator />
      </div>

      {/* <div className="bg-blue-500">
        <div className="space-y-8 mt-[100vh]">
          {['One', 'Two', 'Three', 'Four'].map((item, i) => (
            <div key={i} className="box bg-purple-500 p-10 text-white text-2xl opacity-0 translate-y-10">
              {item}
            </div>
          ))}
        </div>
      </div> */}
      {/* <section id="skill" className="min-h-screen text-white max-w-6xl mx-auto py-[2em]">
        <div>
          ...
        </div>
      </section> */}
      <AboutMeSection />
      <SkillSection />
      <section id="experience" className="min-h-screen text-white max-w-6xl mx-auto py-[2em]">...</section>
      <section id="project" className="min-h-screen py-20 text-white">...</section>
      <section id="about" className="min-h-screen py-20 text-white">...</section>
    </main>
  );
}
export default Home