import React from 'react';
import { CircularProgress, Box, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

const Loader = ({ loaderStyle }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: loaderStyle,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexGrow: 1,
      }}>
      <ThemeProvider theme={theme}>
        <CircularProgress color="primary" size={100} sx={{ display: loaderStyle }} />
      </ThemeProvider>
    </Box>
  );
};

export default Loader;