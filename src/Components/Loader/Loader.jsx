import React from 'react';
import { CircularProgress, Box, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
  },
});

const Loader = ({ loaderStyle }) => {
  return (
    <Box
      sx={{
        display: loaderStyle,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4,
        }}
      >
        <ThemeProvider theme={theme}>
          <CircularProgress color="primary" size={200} sx={{ display: loaderStyle }} />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default Loader;