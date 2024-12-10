import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://api-proyecto-integrador.onrender.com/api/alumnos/');
      setStudents(response.data);  
      setLoading(false);  
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  const handleEdit = (id) => {
    navigate(`/editar-alumno/${id}`);
  };

  const handleCreateStudent = () => {
    navigate('/crear-alumno'); // Navigates to the "Crear Alumno" form
  };

  return (
    <div>
      {/* Crear Alumno Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateStudent}
        sx={{ marginBottom: 2 }}
      >
        Crear Alumno
      </Button>

      {/* Students Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Grupo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Sección</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Proyecto</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {student.id}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {student.nombre}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {student.apellido}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {student.grupo}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {student.seccion}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>
                  {student.proyecto_nombre || 'No asignado'}
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
                    onClick={() => handleEdit(student.id)}
                  >
                    Editar
                  </Button>
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

export default StudentsTable;
