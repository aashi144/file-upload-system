import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files', error);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files/download/${fileId}`, {
        responseType: 'blob', // Important for downloading files
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file', error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Uploaded Files</Typography>
      <List>
        {files.map((file) => (
          <ListItem key={file._id} divider>
            <ListItemText primary={file.originalName} />
            <Button variant="outlined" color="primary" onClick={() => handleDownload(file._id, file.originalName)}>
              Download
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FileList;
