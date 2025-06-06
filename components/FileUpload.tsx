'use client';

import React from 'react';
import { Button } from '@mui/material';

type FileUploadProps = {
    onFilesChange: (files: FileList) => void;
};

// แก้ไข FileUpload ให้รับ onFilesChange เป็น prop แทน เพราะต้อง setForm ที่ /app/admin/page.tsx
const FileUpload = ({ onFilesChange }: FileUploadProps) => {
    // const [fileName, setFileName] = useState<FileList | null>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files != null) {
            // Array.from(files).map((file, i) => {
            //     console.dir(file)
            //     // console.log(`File No.${i+1}, Name: ${fileObject}`);
            // })
            onFilesChange(files)
        }
    }
    return (
        <Button variant="outlined" component="label">
            Upload Images
            <input type="file" hidden multiple onChange={handleFileChange} />
        </Button>
    )
}
export default FileUpload