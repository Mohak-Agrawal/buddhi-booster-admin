import React, { useRef } from 'react';
import { Button, Typography, Input } from '@mui/material';

const CsvUploadButton = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Input
        type="file"
        inputProps={{ accept: '.csv' }}
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        <Typography>Upload CSV</Typography>
      </Button>
    </>
  );
};

export default CsvUploadButton;
