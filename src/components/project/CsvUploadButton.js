import { Button, Typography } from '@mui/material';
import { useRef } from 'react';

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
      <div style={{ display: 'none' }}>
        <input
          type="file"
          inputProps={{ accept: '.csv' }}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>

      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        <Typography>Upload CSV</Typography>
      </Button>
    </>
  );
};

export default CsvUploadButton;
