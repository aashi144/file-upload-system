import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

function App() {
  const [fileListUpdated, setFileListUpdated] = useState(false);

  const handleFileUpload = () => {
    setFileListUpdated((prev) => !prev); // Toggle to re-render the FileList
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        File Upload System
      </Typography>
      <FileUpload onUpload={handleFileUpload} />
      <FileList key={fileListUpdated} /> {/* Key to force re-render on upload */}
    </Container>
  );
}

export default App;
