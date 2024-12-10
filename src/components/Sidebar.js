import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import ApiIcon from '@mui/icons-material/Api';
import LoginIcon from '@mui/icons-material/Login';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        height: '300vh',
        backgroundColor: '#2f3035',
        color: '#ffffff',
        padding: 2,
      }}
    >
      <h3 style={{ margin: '0 0 20px 0', color: '#ffffff', textAlign: 'center' }}>
        TecsupVault
      </h3>
      <List>
        {/* First three items with hover effect */}
        <ListItem
          button
          component={Link}
          to="/"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Inicio"
            sx={{
              color: '#ffffff',
              '&:hover': {
                color: '#000000',
              },
            }}
          />
        </ListItem>

        <ListItem
          button
          component="a"
          href="https://api-proyecto-integrador.onrender.com/api/"
          target="_blank"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <ApiIcon />
          </ListItemIcon>
          <ListItemText
            primary="API"
            sx={{
              color: '#ffffff',
              '&:hover': {
                color: '#000000',
              },
            }}
          />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/iniciar-sesion"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText
            primary="Iniciar Sesión"
            sx={{
              color: '#ffffff',
              '&:hover': {
                color: '#000000',
              },
            }}
          />
        </ListItem>

        <Divider sx={{ backgroundColor: '#ffffff', margin: '20px 0' }} />

        {/* Add hover effect to the remaining items */}
        <ListItem
          button
          component={Link}
          to="/proyectos"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Proyectos" sx={{ color: '#ffffff' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/categorias"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categorías" sx={{ color: '#ffffff' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/alumnos"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Alumnos" sx={{ color: '#ffffff' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/años"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Años" sx={{ color: '#ffffff' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/grupos"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Grupos" sx={{ color: '#ffffff' }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/secciones"
          sx={{
            '&:hover': {
              backgroundColor: '#ffcc00',
              color: '#000000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Secciones" sx={{ color: '#ffffff' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
