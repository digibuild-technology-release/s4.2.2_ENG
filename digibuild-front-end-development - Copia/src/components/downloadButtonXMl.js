import React from 'react';
import Button from '@mui/material/Button';

const DownloadButton = () => {
  const handleDownload = () => {
    // Crea un oggetto URL per il tuo file
    const fileUrl = process.env.PUBLIC_URL + '/BIM_KYT_ARK_OPT_IFC4_bst_gb.xml';
    
    // Crea un elemento link temporaneo
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'BIM_KYT_ARK_OPT_IFC4_bst_gb.xml'; // Specifica il nome del file da scaricare

    // Aggiungi l'elemento link alla pagina e simula il click
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Rimuovi l'elemento link dalla pagina
    document.body.removeChild(downloadLink);
  };

  return (
    <Button variant="contained" onClick={handleDownload} sx={{ height: '50px' }}>
         Download file
      </Button>
  );
};

export default DownloadButton;
