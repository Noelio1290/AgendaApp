import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const InputFile = ({ onChange = () => {}, label = '', name = '', value ='' }) => {
  const [selectedImage, setSelectedImage] = useState(value);
  
  const selectFile = event => {
    const selectImagen = URL.createObjectURL(event.target.files[0]);
    setSelectedImage(selectImagen);
    onChange({ target: { name, value: selectImagen } });
  }; 

  return (
    <Box
      sx={{
        display: 'flex',
        width: '330px',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        flexFlow: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column',
        }}
      >
        <label htmlFor="btn-upload" style={{ margin: 1 }}>
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={selectFile}
          />
          <Button className="btn-choose" variant="outlined" component="span">
            {label}
          </Button>
        </label>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 2,
        }}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt='selected'
            style={{ width: '180px', Height: '200px', maxWidth: '180px', maxHeight: '200px' }}
          />
        )}
      </Box>
    </Box>
  );
};

export default InputFile;