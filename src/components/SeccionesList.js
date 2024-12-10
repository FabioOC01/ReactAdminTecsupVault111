import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SeccionesList = () => {
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API usando Axios
  const fetchSecciones = async () => {
    try {
      const response = await axios.get('https://api-proyecto-integrador.onrender.com/api/secciones/');
      setSecciones(response.data);  
      setLoading(false);  
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);  
    }
  };

  const handleDelete = async (id) => {
    try {
      // Eliminar la sección desde la API
      await axios.delete(`https://api-proyecto-integrador.onrender.com/api/secciones/${id}`);
      // Actualizar el estado localmente para reflejar la eliminación
      setSecciones(secciones.filter((seccion) => seccion.id !== id));
    } catch (error) {
      console.error('Error al eliminar la sección:', error);
    }
  };

  
  useEffect(() => {
    fetchSecciones();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

 
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>
              Sección
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {secciones.map((seccion) => (
            <TableRow
              key={seccion.id}
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                },
              }}
            >
              <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                {seccion.nombre}
              </TableCell>
              <TableCell>
                <Link to={`/editar-seccion/${seccion.id}`} style={{ textDecoration: 'none' }}>
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
                  onClick={() => handleDelete(seccion.id)} // Asegúrate de definir esta función en tu componente padre.
                >
                  Borrar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SeccionesList;
