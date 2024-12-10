import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { Link } from 'react-router-dom';

const GrupoList = () => {
  const [grupos, setGrupos] = useState([]);

  // Obtener datos de la API
  useEffect(() => {
    axios.get('https://api-proyecto-integrador.onrender.com/api/grupos/')
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => console.error('Error fetching groups:', error));
  }, []);

  // Función para eliminar un grupo
  const handleDelete = (id) => {
    axios.delete(`https://api-proyecto-integrador.onrender.com/api/grupos/${id}/`)
      .then(() => {
        setGrupos(grupos.filter(grupo => grupo.id !== id));
      })
      .catch(error => console.error('Error deleting group:', error));
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
          <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Nombre</TableCell>
          <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Sección</TableCell>
          <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {grupos.map((grupo) => (
          <TableRow
            key={grupo.id}
            sx={{
              '&:hover': {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
              },
            }}
          >
            <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
              {grupo.nombre}
            </TableCell>
            <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
              {grupo.seccion ? grupo.seccion.nombre : 'N/A'}
            </TableCell>
            <TableCell>
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
                component={Link}
                to={`/editar-grupo/${grupo.id}`}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                    color: '#fff',
                  },
                }}
                onClick={() => handleDelete(grupo.id)}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  
  );
};

export default GrupoList;
