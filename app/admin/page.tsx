'use client';
import React, { useCallback, useEffect, useState } from 'react';
// import { Input, Accordion, AccordionItem } from "@heroui/react";
// import { Flex, Avatar } from "@radix-ui/themes";
import { Box, TextField, Button, FormControl, Divider, Accordion, AccordionSummary, Typography, AccordionDetails, Chip, Card, List, ListItem, ListItemText, } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MdAdminPanelSettings } from "react-icons/md";
import { FaGithub, FaUserCircle } from "react-icons/fa";
import Select from 'react-select';
import { IoAddCircle } from "react-icons/io5";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { FaChevronDown } from "react-icons/fa";

// import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';

import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from 'react-resizable-panels';
import { ToastContainer, toast } from 'react-toastify';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import Image from 'next/image';
import { IUser } from '@/models/User';
import LoadingIndicator from '@/components/LoadingAnimation';
import CreateProjectForm from '@/components/CreateProjectForm';
import { IProject } from '@/models/Project';
import CreateSkillForm from '@/components/CreateSkillForm';
// import { ISkill } from '@/models/Skill';
import { SkillPlain } from '@/types/skill';
import CreateExperienceForm from '@/components/CreateExperienceForm';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';


// const options = [
//     { value: 'chocolate', label: 'Papinwit Simawan' },
//     { value: 'strawberry', label: 'Thidarat Wongwarunyu' },
//     { value: 'vanilla', label: 'Arinchawut Kanlayanam' }
// ]

// const ProjectApi = [
//     {
//         'no': '1',
//         'images': [
//             '/Ninja/Dragon.jpg',
//             '/Ninja/JurassicPark.jpg',
//             '/Ninja/Narwhal.jpg',
//             '/Ninja/T-RexandClippy.jpg'
//         ],
//         'name': 'Ninja Project',
//         'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'
//     },
//     {
//         'no': '2',
//         'images': [
//             '/October/SurfaceEarbuds.jpg',
//             '/October/SurfaceFamily2019.jpg',
//             '/October/SurfaceLaptop3-Sandstone.jpg',
//             '/October/SurfacePros.jpg'
//         ],
//         'name': 'October Project',
//         'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'

//     },
//     {
//         'no': '3',
//         'images': [
//             '/Xbox/HaloInfinite.jpg',
//             '/Xbox/XboxGear2.jpg',
//             '/Xbox/XboxGear3.jpg',
//             '/Xbox/XboxGear2.jpg'
//         ],
//         'name': 'Xbox Project',
//         'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'

//     },
//     {
//         'no': '4',
//         'images': [
//             '/BuildPhoto/Background-BuildExpoHall.jpg',
//             '/BuildPhoto/FluentRibbon-Build2020.jpg',
//             '/BuildPhoto/WindowsXP.jpg',
//             '/BuildPhoto/RedShirtFanClub.jpg'
//         ],
//         'name': 'Build Photo Project',
//         'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.'

//     }
// ];

// const skillCategories = [
//     {
//         category: "Software Development",
//         skills: {
//             Language: ["JavaScript", "TypeScript"],
//             Framework: ["React", "Express"],
//             Tools: ["Git", "Docker"],
//             Other: ["Agile", "Scrum"]
//         }
//     },
//     {
//         category: "Data Science",
//         skills: {
//             Language: ["Python", "R"],
//             Framework: ["Pandas", "scikit-learn"],
//             Tools: ["Jupyter", "TensorFlow"],
//             Other: ["EDA", "ML Workflow"]
//         }
//     },
//     {
//         category: "DevSecOps",
//         skills: {
//             Tools: ["SonarQube", "OWASP ZAP"],
//             Other: ["Security Review", "Threat Modeling"]
//         }
//     }
// ]

const fakeExperiences = [
    {
        user: '665f1a1c2f7d4b3c9f8e1234',
        title: 'Software Engineer',
        company: 'Tech Solutions Co., Ltd.',
        posotion: 'Backend Developer',
        location: 'Bangkok, Thailand',
        startDate: new Date('2020-01-15'),
        endDate: new Date('2021-06-30'),
        description: 'Developed and maintained RESTful APIs using Node.js and MongoDB.',
        duration: 17, // months
    },
    {
        user: '665f1a1c2f7d4b3c9f8e1234',
        title: 'Full Stack Developer',
        company: 'Innova Labs',
        posotion: 'Full Stack Engineer',
        location: 'Chiang Mai, Thailand',
        startDate: new Date('2021-07-01'),
        endDate: new Date('2023-03-01'),
        description: 'Worked on both frontend and backend using React and Express.',
        duration: 20, // months
    },
    {
        user: '665f1a1c2f7d4b3c9f8e1234',
        title: 'Tech Lead',
        company: 'FutureTech Ventures',
        posotion: 'Lead Developer',
        location: 'Remote',
        startDate: new Date('2023-04-01'),
        endDate: new Date('2024-12-01'),
        description: 'Leading a team of developers to build scalable SaaS platforms.',
        duration: 20, // months
    }
];

interface AddUser {
    fname: string;
    lname: string;
}

// const mockSkillsFromApi = [
//     {
//         _id: "665f98f4a2d2e4dabc000001",
//         user: "665f98c2a2d2e4dabc111111",
//         careerCategory: "Software Development",
//         abbreviation: "sd",
//         Languague: ["JavaScript", "TypeScript"],
//         Framework: ["React", "Node.js"],
//         CloudDB: ["MongoDB", "Firebase"],
//         Tool: ["VSCode", "Postman"],
//         Other: ["Agile", "Scrum"],
//         note: "Experienced in MERN stack development.",
//         createdAt: "2025-06-05T10:00:00.000Z",
//         updatedAt: "2025-06-05T12:00:00.000Z",
//         __v: 0
//     },
//     {
//         _id: "665f98f4a2d2e4dabc000002",
//         user: "665f98c2a2d2e4dabc222222",
//         careerCategory: "Data Engineer",
//         abbreviation: "de",
//         Languague: ["HTML", "CSS", "JavaScript"],
//         Framework: ["React", "Next.js"],
//         CloudDB: ["Firebase"],
//         Tool: ["Figma", "Chrome DevTools"],
//         Other: ["UI/UX"],
//         note: "Focus on modern UI frameworks and performance.",
//         createdAt: "2025-06-04T09:30:00.000Z",
//         updatedAt: "2025-06-04T11:00:00.000Z",
//         __v: 0
//     },
//     {
//         _id: "665f98f4a2d2e4dabc000003",
//         user: "665f98c2a2d2e4dabc333333",
//         careerCategory: "Data Science",
//         abbreviation: "ds",
//         Languague: ["Python", "Go"],
//         Framework: ["Django", "Express"],
//         CloudDB: ["PostgreSQL", "MongoDB"],
//         Tool: ["Docker", "Postman"],
//         Other: ["REST API", "CI/CD"],
//         note: "Skilled in scalable backend systems.",
//         createdAt: "2025-06-03T08:00:00.000Z",
//         updatedAt: "2025-06-03T08:45:00.000Z",
//         __v: 0
//     }
// ];




export default function AdminPage() {
    const router = useRouter();

    const [user, setUser] = useState<AddUser>({
        fname: "",
        lname: "",
    })

    const [loading, setLoading] = useState(true);

    const [allUsers, setAllUsers] = useState<IUser[]>([]);

    type UserOption = {
        value: string;
        label: string;
    }

    const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);


    const options: UserOption[] = allUsers.map((user) => ({
        value: String(user._id), // Assuming _id is a string
        label: `${user.fname} ${user.lname}`,
    }));

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedExp = fakeExperiences[selectedIndex];

    // const [selectedOption, setSelectedOption] = useState(options[0]);

    const fetchData = async () => {
        try {
            const allUser = await fetch('/api/users', {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
            })
            if (allUser.ok) {
                const data = await allUser.json();
                setAllUsers(data);
            } else {
                console.error('Failed to fetch users');
                setAllUsers([]);
            }

        } catch (error) {
            console.log("Something went wrong! can't get all user", error);
            setAllUsers([]);

        } finally {
            setLoading(false);
        }
    }

    const [selectedProject, setSelectedProject] = useState<{ value: string; label: string } | null>(null);

    const [userProjects, setUserProjects] = useState<IProject[]>([]);
    const [userSkill, setUserSkill] = useState<SkillPlain[]>([]);

    const projectOptions = userProjects.map((project: IProject) => ({
        value: String(project._id),
        label: project.title,
    }));

    const selectedProjectDetail = userProjects.find(
        (project) => String(project._id) === selectedProject?.value
    );


    const fetchUserDetail = useCallback(async () => {
        try {
            if (selectedUser != null) {
                const userDetail = await fetch(`/api/users/${selectedUser.value}`, {
                    method: 'GET',
                    // headers: {
                    //     'Content-Type': 'application/json'
                    // },
                })
                if (userDetail.ok) {
                    const data = await userDetail.json();
                    setUserProjects(Array.isArray(data.user.projects) ? data.user.projects : []);
                    setUserSkill(Array.isArray(data.user.skill) ? data.user.skill : []);

                } else {
                    console.error('Failed to fetch users');

                }
            }

        } catch (error) {
            console.log("Something went wrong! can't get user detail", error);
        }

    }, [selectedUser]);


    useEffect(() => {
        // get all user
        fetchData();
        // console.log('userProjects:', userProjects);
        console.log('userSkill:', userSkill);

    }, [userSkill]);

    useEffect(() => {
        // get all user
        fetchUserDetail();
    }, [fetchUserDetail]);


    // const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    // function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const files = event.target.files;
    //     if (files !== null) {
    //         setSelectedFiles(files);
    //     }

    // }

    const addUserForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fname', user.fname);
        formData.append('lname', user.lname);

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                toast.success("Add Successful!", {
                    autoClose: 5000,
                    hideProgressBar: false,
                    // closeOnClick: true,
                    // pauseOnHover: true,
                    draggable: true,
                    theme: "light", // "light" | "dark" | "colored"
                });

            } else {
                toast.error("Fail to add user!", {
                    autoClose: 5000,
                    hideProgressBar: true,
                    // closeOnClick: true,
                    // pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });

            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!", {
                autoClose: 5000,
                hideProgressBar: true,
                // closeOnClick: true,
                // pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

        } finally {
            fetchData()
                .catch(console.error);
        }
    }


    const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
            });

            if (res.ok) {
                // ลบ cookie สำเร็จ → ไปหน้า login
                router.push('/admin/login');
            } else {
                console.error('Logout failed');
            }
        } catch {
            console.log("Something went wrong! can't logout");
        }
    }

    return (
        <>
            <div className='grid grid-cols-[15%_85%] gap-2 overflow-x-hidden min-h-screen'>
                <div className='bg-zinc-50'>
                    <div className="flex justify-center items-center py-5 border-b-1 border-zinc-300">
                        <MdAdminPanelSettings className="text-3xl" />
                        <p className="font-bold text-blue-800 text-2xl text-center">Admin dash</p>
                    </div>
                    <div className="flex justify-center py-5">
                        <a href="#" onClick={logout} className="text-zinc-500 hover:text-blue-800 transition-color duration-300">Logout</a>
                        {/* <Button type="button" onClick={logout} variant="contained">Logout</Button> */}

                    </div>
                </div>
                <div className="bg-white">
                    <PanelGroup direction="horizontal" className="h-screen w-full bg-white">
                        <Panel defaultSize={30} minSize={0}>
                            <p className='px-3 pt-5 text-zinc-800 font-bold'>Create New User</p>
                            <div className='px-3 pt-5'>
                                <Box className="border-1 border-zinc-200 rounded-lg shadow-lg" component="form" onSubmit={addUserForm} sx={{
                                    '& .MuiTextField-root': { mb: 2 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // alignItems: 'flex-start',
                                    p: 4,
                                }}>
                                    <div className='p-2 rounded-lg bg-blue-900 flex items-center justify-center mb-4 w-fit shadow-sm'>
                                        <IoAddCircle className='text-3xl text-white' />
                                        {/* <p className='text-white font-bold text-md ms-1'>Add</p> */}
                                    </div>
                                    <TextField id="fname" label="Firstname" variant="outlined" sx={{ mb: 1 }}
                                        type="text"
                                        onChange={(e) => setUser({ ...user, fname: e.target.value })}
                                        className="w-full"
                                        required
                                    />
                                    <TextField id="lastname" label="Lastname" variant="outlined" sx={{ mb: 1 }}
                                        type="text"
                                        onChange={(e) => setUser({ ...user, lname: e.target.value })}
                                        className="w-full"
                                        required
                                    />

                                    <Button
                                        sx={{ backgroundColor: '#10B981', '&:hover': { backgroundColor: '#059669 ' }, alignSelf: 'flex-end' }}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </div>
                        </Panel>
                        <PanelResizeHandle className="w-2 bg-zinc-200 hover:bg-blue-500 transition-colors" />
                        <Panel defaultSize={70} minSize={0}>
                            <p className='px-3 pt-5 text-zinc-800 font-bold'>User Management Panel</p>

                            {
                                loading ? (
                                    <div className={`flex flex-col items-center justify-center h-full min-h-[300px] py-10 transition-opacity duration-300 ${loading ? 'opacity-100' : 'opacity-0 hidden'}`}>
                                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                                            Fetching all users..., please wait.
                                        </p>
                                        <LoadingIndicator isLoading={true} size={80} /> {/* ปรับขนาดได้ตามต้องการ เช่น 80px */}
                                    </div>
                                ) : allUsers.length === 0 ? (
                                    <div className={`px-3 pt-3 transition-opacity duration-300 ${!loading ? 'opacity-100' : 'opacity-0 hidden'}`}>
                                        <small className='text-red-500 font-bold'>
                                            Not found any user, please create new user.
                                        </small>
                                    </div>
                                ) : (
                                    <div className={`px-3 pt-5 transition-opacity duration-300 ${!loading ? 'opacity-100' : 'opacity-0 hidden'}`}>
                                        <div className={`flex items-center p-5 rounded-lg shadow-sm border-1 border-zinc-200`}>

                                            <FormControl sx={{ mb: 2, minWidth: 300, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <FaUserCircle className='text-4xl text-blue-900' />
                                                {/* <p className='ms-2 text-zinc-600 font-bold'>User:</p> */}
                                                <Select
                                                    className="ms-3 w-80"
                                                    options={options}
                                                    value={selectedUser}
                                                    onChange={setSelectedUser}
                                                    placeholder="Please, select the user"
                                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
                                                    styles={{
                                                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // ปรับ z-index ให้สูงกว่า tab
                                                    }} />
                                                {/* <FormLabel sx={{mr: 1, fontWeight:'bold'}}>Project:</FormLabel> */}
                                            </FormControl>
                                        </div>
                                        {
                                            !selectedUser ? (
                                                <div className='px-3 pt-5'>
                                                    <small className='text-red-500 font-bold'>
                                                        Please select user to manage.
                                                    </small>
                                                </div>
                                            ) : (
                                                <Tabs
                                                    variant="outlined"
                                                    aria-label="Pricing plan"
                                                    defaultValue={0}
                                                    sx={{ mt: 2, width: '100%', borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }}
                                                >
                                                    <TabList
                                                        disableUnderline
                                                        tabFlex={1}
                                                        sx={{
                                                            [`& .${tabClasses.root}`]: {
                                                                fontSize: 'sm',
                                                                fontWeight: 'lg',
                                                                [`&[aria-selected="true"]`]: {
                                                                    color: 'primary.500',
                                                                    bgcolor: 'white',
                                                                },
                                                                [`&.${tabClasses.focusVisible}`]: {
                                                                    outlineOffset: '-4px',
                                                                },
                                                            },
                                                        }}
                                                        className="border-b-1 border-zinc-200"
                                                    >
                                                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                                                            Projects
                                                        </Tab>
                                                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                                                            Skills
                                                        </Tab>
                                                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                                                            Experience
                                                        </Tab>
                                                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                                                            About
                                                        </Tab>
                                                    </TabList>
                                                    <TabPanel value={0} sx={{ p: 3, borderRadius: 'md', boxShadow: 'sm', bgcolor: 'white' }}>
                                                        <div className='grid grid-cols-1'>
                                                            {
                                                                userProjects.length > 0 ? (
                                                                    <div className=''>
                                                                        <div className='flex items-center mb-4'>
                                                                            <p className='text-zinc-800 font-bold me-2'>Project:</p>
                                                                            <Select
                                                                                className="w-80"
                                                                                options={projectOptions}
                                                                                value={selectedProject}
                                                                                onChange={setSelectedProject}
                                                                                placeholder="Select the project"
                                                                                menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
                                                                                styles={{
                                                                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // ปรับ z-index ให้สูงกว่า tab
                                                                                }} />
                                                                        </div>
                                                                        {
                                                                            selectedProjectDetail ? (
                                                                                <div className="div mb-5">
                                                                                    <div className="rounded-lg shadow-sm border-1 border-zinc-200 p-3">
                                                                                        <div className='flex items-center mb-2 pb-2 border-b-1 border-zinc-200'>
                                                                                            <p className='pe-2 text-zinc-800 font-bold border-r-1 border-zinc-200'>{selectedProjectDetail.title}</p>
                                                                                            <p className='px-2 text-zinc-800 border-r-1 border-zinc-200'>{selectedProjectDetail.projectType}</p>
                                                                                            <p className='px-2 text-zine-800 border-r-1 border-zinc-200'>Internal Use</p>
                                                                                            <div className='mx-2 flex justify-end items-center bg-white shadow-sm rounded-xl text-black'>
                                                                                                <a className='p-2 bg-black shadow-sm rounded-l-xl text-white hover:text-black hover:bg-white transition-colors duration-300' rel="noopener" href="https://github.com/2holycatt/papinwit-portfolio" target="_blank">
                                                                                                    On GitHub
                                                                                                </a>
                                                                                                <FaGithub className='text-2xl mx-2' />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='mb-2 pb-2 border-b-1 border-zinc-200'>
                                                                                            <p className='text-zinc-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam iusto veritatis alias id est beatae illum. Error, id, veniam ipsam, ipsum fuga cum blanditiis ut repellat sed reprehenderit ducimus.</p>
                                                                                        </div>
                                                                                        <div className='flex items-center mb-2 pb-2 border-b-1 border-zinc-200'>
                                                                                            <p className='font-bold me-2 pe-2 border-r-1 border-zinc-200'>Position: <span className='font-normal'>{selectedProjectDetail.myPosition}</span>
                                                                                            </p>
                                                                                            <p className='font-bold'>No. of Members: <span className='font-normal'>2</span>
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className='mb-2 pb-2 border-b-1 border-zinc-200'>
                                                                                            <p className='font-bold'>Tech Stack:</p>
                                                                                            <div className="grid grid-cols-8 gap-2">
                                                                                                {
                                                                                                    selectedProjectDetail.techs?.map((tech, i) => (
                                                                                                        <div key={i} className="p-2 text-sm rounded-lg bg-white text-black border-1 border-zinc-300 shadow-sm flex items-center justify-center">
                                                                                                            {tech}
                                                                                                        </div>
                                                                                                    ))
                                                                                                }
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="grid grid-cols-4 gap-2 pb-2">
                                                                                            {
                                                                                                selectedProjectDetail.images?.map((image, i) => (
                                                                                                    <Image
                                                                                                        key={i}
                                                                                                        src={`/api/image?key=${encodeURIComponent(image)}`}
                                                                                                        alt="Project Image"
                                                                                                        width={300}
                                                                                                        height={200}
                                                                                                        priority
                                                                                                        className="rounded-lg object-cover w-full h-40"
                                                                                                    />
                                                                                                ))
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="div mb-1">
                                                                                    <div className="mb-5 text-zinc-400 italic">
                                                                                        This user has no projects yet. Please create a new project.
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <div className="div mb-5">
                                                                        <div className="mb-5 text-zinc-400 italic">
                                                                            The selected project&apos;s details will appear here.
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            <Divider />
                                                            <CreateProjectForm selectedUser={selectedUser} />
                                                        </div>
                                                    </TabPanel>
                                                    <TabPanel value={1} sx={{ p: 3, borderRadius: 'md', boxShadow: 'sm', bgcolor: 'white' }}>
                                                        <div className='grid grid-cols-1'>
                                                            {
                                                                userSkill.length > 0 ? (
                                                                    <div className="div mb-1">
                                                                        <div className="mb-5 text-zinc-400 italic">
                                                                            {/* This user has no skills yet. Please create and add new skill. */}
                                                                            <Box sx={{ width: '100%' }}>
                                                                                {userSkill.map((skill) => (
                                                                                    // <p key={i}>
                                                                                    //     {skill.careerCategory}
                                                                                    // </p>
                                                                                    <Accordion key={skill.abbreviation}>
                                                                                        <AccordionSummary expandIcon={<FaChevronDown />}>
                                                                                            <Typography variant="h6">{skill.careerCategory}</Typography>
                                                                                        </AccordionSummary>
                                                                                        <AccordionDetails>
                                                                                            <Box sx={{ mb: 2 }}>
                                                                                                <Typography variant="subtitle2" color="text.secondary">
                                                                                                    Language
                                                                                                </Typography>
                                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                                                                    {skill.language?.map((skl: string) => (
                                                                                                        <Chip key={skl} label={skl} color="primary" variant="outlined" />
                                                                                                    ))}
                                                                                                </Box>
                                                                                            </Box>
                                                                                            <Box sx={{ mb: 2 }}>
                                                                                                <Typography variant="subtitle2" color="text.secondary">
                                                                                                    Framework
                                                                                                </Typography>
                                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                                                                    {skill.framework?.map((skl: string) => (
                                                                                                        <Chip key={skl} label={skl} color="primary" variant="outlined" />
                                                                                                    ))}
                                                                                                </Box>
                                                                                            </Box>
                                                                                            <Box sx={{ mb: 2 }}>
                                                                                                <Typography variant="subtitle2" color="text.secondary">
                                                                                                    Cloud/DB
                                                                                                </Typography>
                                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                                                                    {skill.cloudDB?.map((skl: string) => (
                                                                                                        <Chip key={skl} label={skl} color="primary" variant="outlined" />
                                                                                                    ))}
                                                                                                </Box>
                                                                                            </Box>
                                                                                            <Box sx={{ mb: 2 }}>
                                                                                                <Typography variant="subtitle2" color="text.secondary">
                                                                                                    Tools
                                                                                                </Typography>
                                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                                                                    {skill.tool?.map((skl: string) => (
                                                                                                        <Chip key={skl} label={skl} color="primary" variant="outlined" />
                                                                                                    ))}
                                                                                                </Box>
                                                                                            </Box>
                                                                                            <Box sx={{ mb: 2 }}>
                                                                                                <Typography variant="subtitle2" color="text.secondary">
                                                                                                    Other
                                                                                                </Typography>
                                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                                                                    {skill.other?.map((skl: string) => (
                                                                                                        <Chip key={skl} label={skl} color="primary" variant="outlined" />
                                                                                                    ))}
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </AccordionDetails>
                                                                                    </Accordion>
                                                                                ))}
                                                                            </Box>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="div mb-1">
                                                                        <div className="mb-5 text-zinc-400 italic">
                                                                            This user has no any skill yet. Please create a new project.
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            <Divider />
                                                            <CreateSkillForm skill={userSkill} userId={selectedUser.value} />
                                                        </div>
                                                    </TabPanel>
                                                    <TabPanel value={2} sx={{ p: 3, borderRadius: 'md', boxShadow: 'sm', bgcolor: 'white' }}>
                                                        <div className="flex flex-col md:flex-row gap-6 mb-5">
                                                            <div className="w-full md:w-1/3">
                                                                <List className="bg-white rounded-sm shadow-md" sx={{p:0}}>
                                                                    {fakeExperiences.map((exp, index) => (
                                                                        <ListItem
                                                                            key={index}
                                                                            component="div"
                                                                            onClick={() => setSelectedIndex(index)}
                                                                            className={`cursor-pointer transition-all duration-200 rounded-sm ${selectedIndex === index ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
                                                                        >
                                                                            <ListItemText
                                                                                primary={<span className="font-medium text-gray-900">{exp.title}</span>}
                                                                                secondary={<span className="text-sm text-gray-500">{exp.company}</span>}
                                                                            />
                                                                        </ListItem>
                                                                    ))}
                                                                </List>

                                                            </div>

                                                            {/* Detail Card */}
                                                            <div className="w-full md:w-2/3">
                                                                <Card className="p-6 shadow-sm rounded-xl bg-white space-y-4">
                                                                    <Typography variant="h6" className="text-blue-700 font-semibold">
                                                                        {selectedExp.title}
                                                                    </Typography>
                                                                    <Typography variant="subtitle1" className="text-gray-600">
                                                                        {selectedExp.company} — {selectedExp.posotion}
                                                                    </Typography>
                                                                    <Typography variant="body2" className="text-gray-500">
                                                                        Location: {selectedExp.location}
                                                                    </Typography>
                                                                    <Typography variant="body2" className="text-gray-500">
                                                                        Duration: {new Date(selectedExp.startDate).toLocaleDateString()} -{' '}
                                                                        {new Date(selectedExp.endDate).toLocaleDateString()} ({selectedExp.duration} months)
                                                                    </Typography>
                                                                    <Typography variant="body2" className="text-gray-700">
                                                                        {selectedExp.description}
                                                                    </Typography>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                        <Divider/>
                                                        <CreateExperienceForm userId={selectedUser.value}/>
                                                    </TabPanel>
                                                </Tabs>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </Panel>
                    </PanelGroup >
                </div >
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

// import { useState, useEffect, ChangeEvent, FormEvent } from "react";

// interface Item {
//     _id: string;
//     name: string;
//     description: string;
// }

// interface FormData {
//     name: string;
//     description: string;
// }

// export default function Home() {
//     const [items, setItems] = useState<Item[]>([]);
//     const [form, setForm] = useState<FormData>({ name: "", description: "" });

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async (): Promise<void> => {
//         try {
//             const res = await fetch("/api/items");
//             const data: { data: Item[] } = await res.json();
//             setItems(data.data);
//         } catch (error) {
//             console.error("Error fetching items:", error);
//         }
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//         e.preventDefault();
//         try {
//             await fetch("/api/items", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(form),
//             });
//             fetchItems();
//             setForm({ name: "", description: "" });
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     return (
//         <div>
//             <h1>Items</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     name="name"
//                     placeholder="Item name"
//                     value={form.name}
//                     onChange={handleChange}
//                 />
//                 <input
//                     name="description"
//                     placeholder="Item description"
//                     value={form.description}
//                     onChange={handleChange}
//                 />
//                 <button type="submit">Add Item</button>
//             </form>

//             <ul>
//                 {items.map((item) => (
//                     <li key={item._id}>
//                         {item.name} - {item.description}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }