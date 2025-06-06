'use client';

import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';


interface Form {
    email: string;
    password: string;
}
const LoginAdmin = () => {
    const router = useRouter();

    const [formLogin, setFormLogin] = useState<Form>({
        email: "",
        password: ""
    });
    const [error, setError] = useState('');

    // useEffect(() => {
    //     console.log(formLogin)
    // }, [formLogin])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("email", formLogin.email);
            formData.append("password", formLogin.password);

            const res = await fetch('/api/login', {
                method: 'POST',
                body: formData,
                credentials: 'include'
                // headers: {
                //     'Content-Type': 'application/json'
                // }
            });

            const data = await res.json();
            if (res.ok) {
                // ✅ Redirect ไปยัง route ที่ต้องการ
                router.push(data.redirectTo || '/admin');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong!")
        }

    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{
                '& .MuiTextField-root': { m: 1, width: '500px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                p: 2,
            }}>
                <TextField id="email" label="Email" variant="outlined" sx={{ mb: 1 }}
                    type="email"
                    onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
                    className="w-full"
                    required
                />

                <TextField id="password" label="Password" variant="outlined" sx={{ mb: 1 }}
                    type="password"
                    onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                    className="w-full"
                    required
                />
                <Button type="submit" variant="contained">Login</Button>

                {/* <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add Project
                </button> */}
                {error && <p>{error}</p>}
            </Box>

            
        </>
    )
}
export default LoginAdmin