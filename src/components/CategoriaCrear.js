import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoriaCrear = () => {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api-proyecto-integrador.onrender.com/api/categorias/', { nombre });
      alert('Categoría creada con éxito');
      navigate('/categorias');
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      alert('Hubo un error al crear la categoría');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '300px', margin: '0 auto' }}>
      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Crear Categoría
      </Button>
    </Box>
  );
};

export default CategoriaCrear;
