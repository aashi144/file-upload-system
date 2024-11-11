import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log("hello")

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully');
      onUpload(response.data.file); // Update the file list
    } 
    catch (error) {
      console.log(error);

      // setMessage(`error ${error.message}`);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Upload File</Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
      {message && <Typography variant="body2" color="secondary">{message}</Typography>}
    </div>
  );
};

export default FileUpload;
