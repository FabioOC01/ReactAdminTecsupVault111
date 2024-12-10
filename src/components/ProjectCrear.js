import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

const ProjectCrear = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [año, setAño] = useState('');
  const [semestre, setSemestre] = useState(''); 
  const [imagen, setImagen] = useState(null);
  const [documento, setDocumento] = useState(null);
  const [video, setVideo] = useState(null);
  const [urlGithub, setUrlGithub] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://api-proyecto-integrador.onrender.com/api/categorias/');
        setCategorias(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las categorías');
        setLoading(false);
      }
    };
    
    fetchCategorias();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!titulo || !descripcion || !categoria || !año || !semestre) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoria);
    formData.append('año', año);
    formData.append('semestre', semestre); 
    if (imagen) {
      formData.append('imagen', imagen);
    }
    if (documento) {
      formData.append('documento', documento);
    }
    if (video) {
      formData.append('video', video);
    }
    if (urlGithub) {
      formData.append('url_github', urlGithub);
    }

    try {
      await axios.post('https://api-proyecto-integrador.onrender.com/api/proyectos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Proyecto creado con éxito');
      navigate('/proyectos'); 
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      alert('Hubo un error al crear el proyecto');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper sx={{ padding: 3, boxShadow: 3 }}>
      <h2>Crear Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Título del Proyecto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        
        <TextField
          fullWidth
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            label="Categoría"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Año"
          value={año}
          onChange={(e) => setAño(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* New Semestre Field */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Semestre</InputLabel>
          <Select
            label="Semestre"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            required
          >
            <MenuItem value="1">Semestre 1</MenuItem>
            <MenuItem value="2">Semestre 2</MenuItem>
            {/* You can add more semesters if needed */}
          </Select>
        </FormControl>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          sx={{ marginBottom: 2 }}
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setDocumento(e.target.files[0])}
          sx={{ marginBottom: 2 }}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          label="URL de GitHub"
          value={urlGithub}
          onChange={(e) => setUrlGithub(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button type="submit" variant="contained" color="primary">
          Crear Proyecto
        </Button>
      </form>
    </Paper>
  );
};

export default ProjectCrear;
