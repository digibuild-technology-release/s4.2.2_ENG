import React from 'react';
import Button from '@mui/material/Button';

function PopupButton() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://cloud2.digibuild-project.com/file/5e9e51bb-d355-44f4-a7c3-64fdf5377e16/download'; // Il tuo link per il download del file
    link.setAttribute('download', ''); // Imposta l'attributo "download" per scaricare il file automaticamente
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleDownload} sx={{ height: '50px' }}>
         Download file
      </Button>
    </div>
  );
}

export default PopupButton;
