'use client';
import ProfileImage from "@/components/ProfileImage";
// import Image from "next/image";
// import { useState } from 'react';
// import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from "@heroicons/react/24/solid";
// import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { FaFacebook, FaLinkedin, FaEnvelope, } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { BsDownload } from "react-icons/bs";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

gsap.registerPlugin(ScrollTrigger);

import { Source_Sans_3 } from "next/font/google";
import ScrollIndicator from "@/components/ScrollIndicator";
import SkillSection from "@/components/SkillSection";
import AboutMeSection from "@/components/AboutMeSection";
import ProjectSection from "@/components/ProjectSection";

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
      <div className="bg-white p-3">
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
        

      </div>
      <div className="bg-white p-3">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
      <div className="shadow-lg fixed z-[1000] right-30 bottom-10 p-2 bg-white rounded-md border-2 border-solid border-indigo-500 flex items-center">
        <a
          href="/Papinwit-Resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
          title="view resume"
          className="font-bold pe-2 border-1 border-white border-r-gray-200 hover:text-blue-800 duration-300 transition-colors"
        >My Resume</a>
        <a href="/Papinwit-Resume.pdf" download title="donwload" className="text-lg ps-2 hover:text-green-800 duration-300 transition-colors"><BsDownload /></a>
      </div>
      <div className="sticky top-0 z-50 backdrop-blur-md py-3 border-b-[0.125rem] border-blue-800">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6 py-3">
          <div className="text-blue-800">
            <a href="#main" className="font-bold">PAPINWIT</a>
          </div>
          <div className="flex justify-between text-gray-500 font-bold" id="navbar">
            <a href="#project" className="nav-link">Projects</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#skill" className="nav-link">Skill</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contacts</a>

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
      <ProjectSection />
      <AboutMeSection />
      <SkillSection />
      <section id="experience" className="min-h-screen text-white max-w-6xl mx-auto py-[2em]">...</section>
      <section id="project" className="min-h-screen py-20 text-white">...</section>
      <section id="about" className="min-h-screen py-20 text-white">...</section>
    </main>
  );
}
export default Home

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];