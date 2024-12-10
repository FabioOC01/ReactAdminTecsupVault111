import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import axios from 'axios';

const StudentsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alumno, setAlumno] = useState({
    nombre: '',
    apellido: '',
    grupo: '',
    seccion: '',
    proyecto: '',
  });

  const [grupos, setGrupos] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    // Obtener datos relacionados
    axios.get('https://api-proyecto-integrador.onrender.com/api/grupos/').then((res) => setGrupos(res.data));
    axios.get('https://api-proyecto-integrador.onrender.com/api/secciones/').then((res) => setSecciones(res.data));
    axios.get('https://api-proyecto-integrador.onrender.com/api/proyectos/').then((res) => setProyectos(res.data));

    // Obtener el alumno
    axios.get(`https://api-proyecto-integrador.onrender.com/api/alumnos/${id}/`)
      .then((response) => {
        setAlumno(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar el alumno:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://api-proyecto-integrador.onrender.com/api/alumnos/${id}/`, alumno)
      .then(() => {
        alert('Alumno actualizado exitosamente.');
        navigate('/alumnos');
      })
      .catch((error) => {
        console.error('Error al actualizar el alumno:', error);
        alert('Hubo un error al actualizar el alumno.');
      });
  };

  return (
    <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: '#fff' }}>
      <h2>Editar Alumno</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={alumno.nombre}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Apellido"
          name="apellido"
          value={alumno.apellido}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          required
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Grupo</InputLabel>
          <Select name="grupo" value={alumno.grupo} onChange={handleChange}>
            {grupos.map((grupo) => (
              <MenuItem key={grupo.id} value={grupo.id}>
                {grupo.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Sección</InputLabel>
          <Select name="seccion" value={alumno.seccion} onChange={handleChange}>
            {secciones.map((seccion) => (
              <MenuItem key={seccion.id} value={seccion.id}>
                {seccion.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Proyecto</InputLabel>
          <Select name="proyecto" value={alumno.proyecto} onChange={handleChange}>
            {proyectos.map((proyecto) => (
              <MenuItem key={proyecto.id} value={proyecto.id}>
                {proyecto.titulo}
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

export default StudentsEdit;

