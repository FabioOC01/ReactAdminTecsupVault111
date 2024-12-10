import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SeccionesEdit = () => {
  const navigate = useNavigate();  // Usa useNavigate en lugar de useHistory
  const { id } = useParams();

  const [seccion, setSeccion] = useState({
    nombre: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api-proyecto-integrador.onrender.com/api/secciones/${id}/`)
      .then(response => {
        const seccionData = response.data;
        setSeccion({
          nombre: seccionData.nombre,
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener la sección:', error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeccion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`https://api-proyecto-integrador.onrender.com/api/secciones/${id}/`, seccion)
      .then(response => {
        alert('Sección actualizada correctamente');
        navigate('/secciones');  // Reemplaza push con navigate
      })
      .catch(error => {
        console.error('Error al actualizar la sección:', error);
        alert('Error al actualizar la sección');
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: '#fff' }}>
      <h2>Editar Sección</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre de la Sección"
          name="nombre"
          value={seccion.nombre}
          onChange={handleChange}
          required
          sx={{
            marginBottom: 2,
            fontSize: '16px',
            fontFamily: '"Roboto", sans-serif',
            color: '#333',
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default SeccionesEdit;

