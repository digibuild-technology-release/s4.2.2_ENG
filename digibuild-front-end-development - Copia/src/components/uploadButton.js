import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [digitalTwinData, setDigitalTwinData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") { // Check for JSON file type
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          setDigitalTwinData(parsedData);
        } catch (error) {
          alert("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .json file"); // Alert message for JSON files
    }
  };

  return (
    <Button component="label" variant="contained" sx={{ height: '50px' }} startIcon={<CloudUploadIcon />}>
      Please upload record
      <input
        type="file"
        accept=".json" // Accetta solo file JSON
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
