'use client';

import React, { useState } from 'react';
import { Button, Box, Typography, List, ListItem } from '@mui/material';

const FileUpload = () => {
    const [fileName, setFileName] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files != null) {
            // Array.from(files).map((file, i) => {
            //     console.dir(file)
            //     // console.log(`File No.${i+1}, Name: ${fileObject}`);
            // })
            setFileName(files)
        }
    }
    return (
        <Box>
            <Button variant="outlined" component="label">
                Upload Images
                <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            {
                fileName && fileName.length > 0 && (
                    <Box my={1}>
                        <Typography variant="body2" color="textSecondary">Selected files:</Typography>
                        <List dense>
                            {Array.from(fileName).map((file, index) => (
                                <ListItem key={index} sx={{ pl: 2 }}>
                                    • {file.name}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )
            }
        </Box>
    )
}
export default FileUpload