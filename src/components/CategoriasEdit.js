import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';

const CategoriasEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    axios.get(`https://api-proyecto-integrador.onrender.com/api/categorias/${id}/`)
      .then((response) => {
        setCategoria(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar la categoría:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://api-proyecto-integrador.onrender.com/api/categorias/${id}/`, categoria)
      .then(() => {
        alert('Categoría actualizada exitosamente.');
        navigate('/categorias');
      })
      .catch((error) => {
        console.error('Error al actualizar la categoría:', error);
        alert('Hubo un error al actualizar la categoría.');
      });
  };

  return (
    <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: '#fff' }}>
      <h2>Editar Categoría</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={categoria.nombre}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          required
        />
    
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default CategoriasEdit;

