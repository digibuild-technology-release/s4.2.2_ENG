import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';

function PopupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const openPopup = () => {
    setIsOpen(true);
    setInputText('');
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  console.log(inputText)

  return (
    <div>
      <Button variant="contained" onClick={openPopup} sx={{ height: '50px' }}>
         Download file
      </Button>
    </div>
  );
}

export default PopupButton;
