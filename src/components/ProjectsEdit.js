import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Paper } from '@mui/material';

const ProjectsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [proyecto, setProyecto] = useState({
    titulo: '',
    descripcion: '',
    año: '',
    imagen: null,
    documento: null,
    video: null,
    url_github: '',
    categoria: '',
  });

  const [años, setAños] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Obtener años
    axios.get('https://api-proyecto-integrador.onrender.com/api/anos/')
      .then(response => setAños(response.data))
      .catch(error => console.error('Error al obtener años:', error));

    // Obtener categorías
    axios.get('https://api-proyecto-integrador.onrender.com/api/categorias/')
      .then(response => setCategorias(response.data))
      .catch(error => console.error('Error al obtener categorías:', error));

    // Obtener proyecto
    axios.get(`https://api-proyecto-integrador.onrender.com/api/proyectos/${id}/`)
      .then(response => {
        const data = response.data;
        setProyecto({
          titulo: data.titulo,
          descripcion: data.descripcion,
          año: data.año?.id || '',
          imagen: null, // No se puede prellenar imágenes
          documento: null, // No se puede prellenar documentos
          video: null, // No se puede prellenar videos
          url_github: data.url_github,
          categoria: data.categoria?.id || '',
        });
      })
      .catch(error => console.error('Error al obtener el proyecto:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProyecto(prevState => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titulo', proyecto.titulo);
    formData.append('descripcion', proyecto.descripcion);
    if (proyecto.año) formData.append('año', proyecto.año);
    if (proyecto.imagen) formData.append('imagen', proyecto.imagen);
    if (proyecto.documento) formData.append('documento', proyecto.documento);
    if (proyecto.video) formData.append('video', proyecto.video);
    formData.append('url_github', proyecto.url_github);
    if (proyecto.categoria) formData.append('categoria', proyecto.categoria);

    axios.put(`https://api-proyecto-integrador.onrender.com/api/proyectos/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        alert('Proyecto actualizado correctamente');
        navigate('/proyectos');
      })
      .catch(error => {
        console.error('Error al actualizar el proyecto:', error.response?.data || error);
        alert('Error al actualizar el proyecto');
      });
  };

  return (
    <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: '#fff' }}>
      <h2>Editar Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Título"
          name="titulo"
          value={proyecto.titulo}
          onChange={handleChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="descripcion"
          value={proyecto.descripcion}
          onChange={handleChange}
          multiline
          rows={4}
          required
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Año</InputLabel>
          <Select
            name="año"
            value={proyecto.año}
            onChange={handleChange}
          >
            {años.map(año => (
              <MenuItem key={año.id} value={año.id}>
                {año.año}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="URL de GitHub"
          name="url_github"
          value={proyecto.url_github}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            name="categoria"
            value={proyecto.categoria}
            onChange={handleChange}
          >
            {categorias.map(categoria => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <input
          type="file"
          name="documento"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default ProjectsEdit;
