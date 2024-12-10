import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { TextField, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const YearsEdit = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const navigate = useNavigate(); // Navegar a otras páginas
  const [año, setAño] = useState(null);  // Inicializamos como null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAño = async () => {
      try {
        const response = await axios.get(`https://api-proyecto-integrador.onrender.com/api/anos/${id}`);
        setAño(response.data);  // Asignamos los datos del año
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el año:', error);
        setLoading(false);
      }
    };

    fetchAño();
  }, [id]);

  const handleSave = async () => {
    try {
      // Realiza la actualización del año con los datos actuales
      await axios.put(`https://api-proyecto-integrador.onrender.com/api/anos/${id}`, año);
      // Después de guardar, redirige a la página de años
      navigate('/años');
    } catch (error) {
      console.error('Error al actualizar el año:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;  // Muestra el indicador de carga mientras se obtienen los datos
  }

  if (!año) {
    return <div>No se encontró el año.</div>;  // Manejo de error si no se encontró el año
  }

  return (
    <div>
      <h2>Editar Año</h2>
      <form>
        <TextField
          label="Año"
          variant="outlined"
          value={año.año || ''}  // Validación adicional para evitar errores si 'año' es nulo
          onChange={(e) => setAño({ ...año, año: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Semestre"
          variant="outlined"
          value={año.semestre || ''}  // Validación adicional para evitar errores si 'semestre' es nulo
          onChange={(e) => setAño({ ...año, semestre: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
      </form>

      {/* Tabla con la información del Año */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Año</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Semestre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                },
              }}
            >
              <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                {año.id}  {/* Mostrar el ID del año */}
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                {año.año}
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                {año.semestre}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default YearsEdit;



