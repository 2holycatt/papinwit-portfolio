import { Box, Checkbox, FormControlLabel, List, ListItem, TextField } from "@mui/material"
import FileUpload from "./FileUpload"
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const techStacks = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Go", "Rust", "PHP", "Ruby",
    "Kotlin", "Swift", "Objective-C", "Scala", "Dart", "Perl", "R", "MATLAB",
    "HTML", "CSS", "Sass", "Less", "Tailwind CSS", "Bootstrap",
    "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "SolidJS",
    "Node.js", "Express.js", "NestJS", "Fastify", "Hapi.js",
    "Spring Boot", ".NET", "ASP.NET", "Laravel", "Django", "Flask", "Ruby on Rails",
    "GraphQL", "REST API", "gRPC",
    "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Firebase", "Supabase",
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Vercel", "Netlify", "Heroku",
    "Jest", "Mocha", "Chai", "Vitest", "Cypress", "Playwright", "Selenium",
    "Git", "GitHub Actions", "CI/CD", "Jenkins", "Travis CI",
];

interface ProjectForm {
    title: string;
    projectType: string;
    description: string;
    images: File[];
    techs: string[];
    gitHubLink: string;
    members: number;
    myPosition: string;
    internalUse: boolean;

}

type Props = {
    selectedUser: { value: string } | null; // Assuming selectedUser is an object with a value property
};

const CreateProjectForm: React.FC<Props> = ({ selectedUser }) => {

    const [form, setForm] = useState<ProjectForm>(
        {
            title: "",
            projectType: "",
            description: "",
            images: [],
            techs: [],
            gitHubLink: "",
            members: 1,
            myPosition: "",
            internalUse: false,
        }
    );

    const handleImagesChange = (files: FileList) => {
        // แปลง FileList → Array<File>
        const filesArray = Array.from(files);
        setForm(prev => ({
            ...prev,
            images: filesArray,
        }));
    };

    const handleCheckboxChanges = (tech: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setForm((prev) => ({
                ...prev,
                techs: [...prev.techs, tech]
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                techs: prev.techs.filter((t) => t !== tech),
            }));
        }
    }

    const [customTech, setCustomTech] = useState("");

    const handleAddCustomTech = () => {
        const tech = customTech.trim();
        if (tech && !techStacks.includes(tech)) {
            techStacks.push(tech); // เพิ่มเข้า array (ถ้า techStacks เป็น useState ให้ใช้ setTechStacks)
            setForm((prev) => ({
                ...prev,
                techs: [...prev.techs, tech]
            }));
            setCustomTech("");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', form.title);
        formData.append('projectType', form.projectType);
        formData.append('description', form.description);
        formData.append('gitHubLink', form.gitHubLink);
        formData.append('members', form.members.toString());
        formData.append('myPosition', form.myPosition);
        formData.append('internalUse', form.internalUse.toString());
        formData.append('userId', selectedUser?.value || ''); // Ensure userId is set

        // append techs array
        form.techs.forEach((tech) => formData.append('techs', tech));

        // append image files
        form.images.forEach((file) => {
            formData.append('images', file); // 'images' must match your backend field
        });

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: formData, // no JSON.stringify here
            });

            const result = await res.json();

            if (result.ok) {
                // console.log('Updated');
                toast.success(result.message + " : " + result.title, {
                    autoClose: 5000,
                    hideProgressBar: false,
                    // closeOnClick: true,
                    // pauseOnHover: true,
                    draggable: true,
                    theme: "light", // "light" | "dark" | "colored"
                });
            } else {
                toast.error(result.messag, {
                    autoClose: 5000,
                    hideProgressBar: true,
                    // closeOnClick: true,
                    // pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }

            // const result = await res.json();
            // console.log(result);
            // alert("Form Submitted")
        } catch (err) {
            console.error('Error submitting form:', err);
        }

    };

    useEffect(() => {
        // get all user
        console.log(form);

    }, [form])


    return (
        <>
            <div className="my-4">
                <p className='text-zinc-800 font-bold me-2'>Create New Project</p>
            </div>
            <div>
                <Box component="form" onSubmit={handleSubmit} sx={{
                    // '& .MuiTextField-root': { mb: 2 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',

                }}>
                    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"/> */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                        <div className="">
                            <TextField id="title" label="Title" variant="outlined"
                                type="text"
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full"
                                required
                                sx={{ mb: 2 }}
                            />

                            <TextField id="productType" label="Project type" variant="outlined"
                                type="text"
                                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                                className="w-full"
                                required
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                type="text"
                                multiline
                                rows={4} // ปรับจำนวนแถวได้ตามต้องการ
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full"
                                required
                                sx={{ mb: 2 }}
                            />
                            <p>Tech Stack:</p>

                            <div className="max-h-40 overflow-y-auto rounded border border-zinc-200 p-2 bg-zinc-50">
                                <div className="flex flex-wrap gap-2">
                                    {techStacks.map((tech) => (
                                        <label key={tech} className="flex items-center space-x-1 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={form.techs.includes(tech)}
                                                onChange={handleCheckboxChanges(tech)}
                                                className="accent-blue-600"
                                            />
                                            <span>{tech}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 my-2">
                                <input
                                    type="text"
                                    value={customTech}
                                    onChange={e => setCustomTech(e.target.value)}
                                    placeholder="Add custom tech"
                                    className="border-1 border-zinc-100 rounded px-2 py-1 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddCustomTech}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Add
                                </button>
                            </div>

                            <FormControlLabel control={<Checkbox checked={form.internalUse}
                                onChange={e => setForm({ ...form, internalUse: e.target.checked })} />}
                                label="Internal Use"
                            />

                        </div>
                        <div>
                            <TextField id="gitHubLink" label="GitHub Link" variant="outlined"
                                type="text"
                                sx={{ mb: 2 }}
                                placeholder="GitHub Link"
                                onChange={(e) => setForm({ ...form, gitHubLink: e.target.value })}
                                className="w-full p-2 rounded border-1 border-black"
                            />

                            <TextField id="numberOfMembers" label="No. of Members" variant="outlined"
                                type="number"
                                sx={{ mb: 2 }}
                                placeholder="Number of Members"
                                onChange={(e) => setForm({ ...form, members: Number(e.target.value) })}
                                className="w-full p-2 rounded border-1 border-black"
                            />

                            <TextField id="myPosition" label="Position" variant="outlined"
                                type="text"
                                sx={{ mb: 2 }}
                                placeholder="Your Position"
                                onChange={(e) => setForm({ ...form, myPosition: e.target.value })}
                                className="w-full p-2 rounded border-1 border-black"
                            />
                            <Box>
                                <FileUpload onFilesChange={handleImagesChange} />
                                {
                                    form.images && form.images.length > 0 && (
                                        <Box my={1}>
                                            <List dense>
                                                {Array.from(form.images).map((file, index) => (
                                                    <ListItem key={index} sx={{ pl: 2 }}>
                                                        • {file.name}
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>
                                    )
                                }
                            </Box>
                        </div>
                    </div>
                    <div className='flex justify-end w-full'>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Create Project
                        </button>
                    </div>
                </Box>
            </div>
        </>
    )
}
export default CreateProjectForm