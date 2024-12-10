import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';

const GrupoEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [grupo, setGrupo] = useState({
    nombre: '',
    seccion: '',
  });

  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    axios.get('https://api-proyecto-integrador.onrender.com/api/secciones/')
      .then(response => {
        setSecciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las secciones:', error);
      });

    axios.get(`https://api-proyecto-integrador.onrender.com/api/grupos/${id}/`)
      .then(response => {
        const grupoData = response.data;
        setGrupo({
          nombre: grupoData.nombre,
          seccion: grupoData.seccion ? grupoData.seccion.id : '',
        });
      })
      .catch(error => {
        console.error('Error al obtener el grupo:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrupo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`https://api-proyecto-integrador.onrender.com/api/grupos/${id}/`, grupo)
      .then(response => {
        alert('Grupo actualizado correctamente');
        navigate('/grupos');  // Redirigir a la lista de grupos
      })
      .catch(error => {
        console.error('Error al actualizar el grupo:', error.response ? error.response.data : error);
        alert('Error al actualizar el grupo');
      });
  };

  return (
    <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: '#fff' }}>
      <h2>Editar Grupo</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre del Grupo"
          name="nombre"
          value={grupo.nombre}
          onChange={handleChange}
          required
          sx={{ marginBottom: 2 }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Sección</InputLabel>
          <Select
            label="Sección"
            name="seccion"
            value={grupo.seccion}
            onChange={handleChange}
            required
          >
            {secciones.map((seccion) => (
              <MenuItem key={seccion.id} value={seccion.id}>
                {seccion.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default GrupoEdit;


