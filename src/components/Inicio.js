import React from 'react';
import { Box, Typography } from '@mui/material';

const Inicio = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '80vh',
        textAlign: 'center',
       
      }}
    >
       
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textAlign: 'center',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          letterSpacing: '1.5px',
          marginBottom: '20px',
        }}
      >
        ¡Bienvenido a <span style={{ color: '#ffcc00' }}>TecsupVault</span>!
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          letterSpacing: '1px',
        }}
      >
        Administrador
      </Typography>
      <img 
        src="https://tecsupvault.s3.us-east-2.amazonaws.com/imagenes/TECSUPVAULT.png" 
        alt="Tecsup Logo" 
        style={{ width: '250px', height: '250px', borderRadius: '50%' }} 
      />
    </Box>
  );
};

export default Inicio;
