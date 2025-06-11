import { ExperiencePlain } from "@/types/experience";
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react";

type UserProps = {
    userId: string;
};

const CreateExperienceForm: React.FC<UserProps> = ({ userId }) => {

    const [experience, setExperience] = useState<ExperiencePlain>(
        {
            title: "",
            company: "",
            position: "",
            location: "",
            startDate: new Date(),
            endDate: new Date(),
            description: "",
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', userId);
        formData.append('title', experience.title ?? "");
        formData.append('company', experience.company ?? "");
        formData.append('position', experience.position ?? "");
        formData.append('location', experience.location ?? "");
        formData.append('startDate', experience.startDate!.toISOString());
        formData.append('endDate', experience.endDate!.toISOString());
        formData.append('description', experience.description ?? "");
        
        try {

            const res = await fetch('/api/experience', {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                alert('OK!')
            }

        } catch {
            console.log('error');
        }
    }

    useEffect(() => {
        console.log(experience);
    }, [experience])

    return (
        <>
            <div className="my-4">
                <p className='text-zinc-800 font-bold me-2'>Add Experience</p>
            </div>
            <div>
                <form
                    className="space-y-6 w-full mx-auto"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Title"
                            fullWidth
                            value={experience?.title}
                            onChange={(e) => setExperience({ ...experience, title: e.target.value })}
                        />
                        <TextField
                            label="Company"
                            fullWidth
                            value={experience?.company}
                            onChange={(e) => setExperience({ ...experience, company: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Position"
                            fullWidth
                            value={experience?.position}
                            onChange={(e) => setExperience({ ...experience, position: e.target.value })}
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            value={experience?.location}
                            onChange={(e) => setExperience({ ...experience, location: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={experience.startDate?.toISOString().split("T")[0]}
                            onChange={(e) => setExperience({ ...experience, startDate: new Date(e.target.value) })}
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={experience.endDate?.toISOString().split("T")[0]}
                            onChange={(e) => setExperience({ ...experience, endDate: new Date(e.target.value) })}
                        />
                    </div>

                    <TextField
                        // sx={{mb: 3}}
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        value={experience?.description}
                        onChange={(e) => setExperience({ ...experience, description: e.target.value })}
                    />

                    {/* <TextField
                        label="Duration (months)"
                        type="number"
                        fullWidth
                    // value={duration}
                    // onChange={(e) => setDuration(e.target.value)}
                    /> */}

                    <div className="flex justify-end mt-5">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Save Experience
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateExperienceForm