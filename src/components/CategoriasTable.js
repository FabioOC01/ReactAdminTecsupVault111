import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Importar Link
import axios from 'axios';

const CategoriesTable = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://api-proyecto-integrador.onrender.com/api/categorias/');
        setCategorias(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {/* Create Category Button */}
      <Link to="/crear-categoria" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
        >
          Crear Categoría
        </Button>
      </Link>

      {/* Categories Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((categoria) => (
              <TableRow
                key={categoria.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}></TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {categoria.nombre}
                </TableCell>
                <TableCell>
                  <Link to={`/editar-categoria/${categoria.id}`} style={{ textDecoration: 'none' }}>
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

export default CategoriesTable;
