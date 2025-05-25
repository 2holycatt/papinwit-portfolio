'use client';
import { useState } from 'react';
// import { Input, Accordion, AccordionItem } from "@heroui/react";
import { Flex, Avatar } from "@radix-ui/themes";
import { TextField } from '@mui/material';
import FileUpload from '@/components/FileUpload';

interface ProjectForm {
    title: string;
    projectType: string;
    description: string;
    images: string[];
    techs: string[];
    gitHubLink: string;
    members: number;
    myPosition: string;
    internalUse: boolean;
}


export default function AdminPage() {
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

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files !== null) {
            setSelectedFiles(files);
        }

    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        try {
            await fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify(form),
            });
            alert('Project created!');
        } catch {
            console.log(e);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
            
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"/> */}

            <TextField id="title" label="Title" variant="outlined" sx={{mb: 1}}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full"
                required
            />

            <TextField id="productType" label="Project type" variant="outlined" sx={{mb: 1}}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="w-full"
                required
            />

            <TextField id="description" label="Description" variant="outlined" sx={{mb: 1}}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full"
                required
            />

            {/* <input
                placeholder="Choose images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 rounded border-1 border-black"
            /> */}

            <FileUpload/>


            {/* <input
                placeholder="Image URLs (comma separated)"
                onChange={(e) => setForm({ ...form, images: e.target.value.split(',') })}
                className="w-full p-2 rounded border-1 border-black"
            /> */}

            {/* <input
                placeholder="Technologies Used (comma separated)"
                onChange={(e) => setForm({ ...form, techs: e.target.value.split(',') })}
                className="w-full p-2 rounded border-1 border-black"
            /> */}

            <input
                placeholder="GitHub Link"
                onChange={(e) => setForm({ ...form, gitHubLink: e.target.value })}
                className="w-full p-2 rounded border-1 border-black"
            />


            <input
                type="number"
                placeholder="Number of Members"
                onChange={(e) => setForm({ ...form, members: Number(e.target.value) })}
                className="w-full p-2 rounded border-1 border-black"
            />

            <input
                placeholder="Your Position"
                onChange={(e) => setForm({ ...form, myPosition: e.target.value })}
                className="w-full p-2 rounded border-1 border-black"
            />

            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    onChange={(e) => setForm({ ...form, internalUse: e.target.checked })}
                />
                <span>Internal Use</span>
            </label>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Project
            </button>
        </form>
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