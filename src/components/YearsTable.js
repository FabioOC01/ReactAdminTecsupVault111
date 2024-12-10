import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const YearsTable = () => {
    const [años, setAños] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAños = async () => {
        try {
          const response = await axios.get('https://api-proyecto-integrador.onrender.com/api/anos/');
          setAños(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener los años:', error);
          setLoading(false);
        }
      };
  
      fetchAños();
    }, []);
  
    if (loading) {
      return <CircularProgress />;
    }
  
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Año</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Semestre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '16px', fontFamily: '"Roboto", sans-serif' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {años.map((año) => (
              <TableRow
                key={año.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}></TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>{año.año}</TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}></TableCell>
                <TableCell sx={{ fontSize: '14px', fontFamily: '"Arial", sans-serif', color: '#333' }}>{año.semestre}</TableCell>
                <TableCell>
                  <Link to={`/editar-año/${año.id}`} style={{ textDecoration: 'none' }}>
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
    );
  };
  
export default YearsTable;

  