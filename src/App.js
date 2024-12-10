import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Sidebar from './components/Sidebar';
import ProjectsTable from './components/ProjectsTable';
import ProjectsEdit from './components/ProjectsEdit';
import ProjectCrear from './components/ProjectCrear';
import CategoriesTable from './components/CategoriasTable';
import CategoriaCrear from './components/CategoriaCrear';
import CategoriasEdit from './components/CategoriasEdit';
import StudentsTable from './components/StudentsTable';
import StudentCrear from './components/StudentsCrear';
import StudentsEdit from './components/StudentsEdit';
import YearsTable from './components/YearsTable';
import YearsEdit from './components/YearsEdit';
import GrupoList from './components/GrupoList';
import GrupoEdit from './components/GrupoEdit';
import SeccionesList from './components/SeccionesList';
import SeccionesEdit from './components/SeccionesEdit';
import { Box } from '@mui/material';


const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex',  backgroundImage: 'url("https://tecsupvault.s3.us-east-2.amazonaws.com/imagenes/orange-polygonal-shapes-geometric-background-vector.png")', height: '300vh' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/proyectos" element={<ProjectsTable />} />
            <Route path="/añadir-proyecto" element={<ProjectCrear />} />
            <Route path="/editar-proyecto/:id" element={<ProjectsEdit />} />
            <Route path="/categorias" element={<CategoriesTable />} />
            <Route path="/crear-categoria" element={<CategoriaCrear />} />
            <Route path="/editar-categoria/:id" element={<CategoriasEdit />} />
            <Route path="/alumnos" element={<StudentsTable />} />
            <Route path="/crear-alumno" element={<StudentCrear />} />
            <Route path="/editar-alumno/:id" element={<StudentsEdit />} />
            <Route path="/años" element={<YearsTable />} />
            <Route path="/editar-año/:id" element={<YearsEdit />} />
            <Route path="/grupos" element={<GrupoList />} />
            <Route path="/editar-grupo/:id" element={<GrupoEdit />} />
            <Route path="/secciones" element={<SeccionesList />} />
            <Route path="/editar-seccion/:id" element={<SeccionesEdit />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
