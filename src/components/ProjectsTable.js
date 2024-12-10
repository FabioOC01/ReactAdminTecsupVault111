import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectsTable = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('https://api-proyecto-integrador.onrender.com/api/proyectos/');
        setProyectos(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar este proyecto?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://api-proyecto-integrador.onrender.com/api/proyectos/${id}/`);
      alert('Proyecto borrado con éxito');
   
      setProyectos((prevProyectos) => prevProyectos.filter((proyecto) => proyecto.id !== id));
    } catch (error) {
      console.error('Error al borrar el proyecto:', error);
      alert('Hubo un error al intentar borrar el proyecto');
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
    <div>
      {/* Botón Añadir Proyecto */}
      <Link to="/añadir-proyecto">
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginBottom: 2,
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          Añadir Proyecto
        </Button>
      </Link>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Título</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Año</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Imagen</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proyectos.map((proyecto) => (
              <TableRow
                key={proyecto.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {proyecto.titulo}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {proyecto.descripcion}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {proyecto.año ? `${proyecto.año.año} - Semestre ${proyecto.año.semestre}` : 'N/A'}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {proyecto.categoria ? proyecto.categoria.nombre : 'N/A'}
                </TableCell>
                <TableCell>
                  {proyecto.imagen ? (
                    <img
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      style={{
                        width: '100px',
                        height: 'auto',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                      }}
                    />
                  ) : (
                    'No disponible'
                  )}
                </TableCell>
                <TableCell>
                  <Link to={`/editar-proyecto/${proyecto.id}`}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: '#1976d2',
                          color: '#fff',
                        },
                      }}
                    >
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                      },
                    }}
                    onClick={() => handleDelete(proyecto.id)}
                  >
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectsTable;

