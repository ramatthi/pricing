import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { NavLink, Routes, Route } from 'react-router-dom';
import FlatComponent from './Flat';

export const ExampleFetchComponent: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <Card sx={{ maxWidth: 1200, width: '100%', minHeight: 650, boxShadow: 2 }}>
        <CardContent>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-around' }}>
            <NavLink
              to="Flatcomponent"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'blue' : 'inherit',
              })}
            >
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <Typography variant="h6">Flat</Typography>
              </Box>
            </NavLink>
            <NavLink
              to="Slabcomponent"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'blue' : 'inherit',
              })}
            >
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <Typography variant="h6">Slab</Typography>
              </Box>
            </NavLink>
            <NavLink
              to="Dynamiccomponent"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'blue' : 'inherit',
              })}
            >
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <Typography variant="h6">Dynamic</Typography>
              </Box>
            </NavLink>
            <NavLink
              to="Intercitycomponent"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'blue' : 'inherit',
              })}
            >
              <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                <Typography variant="h6">Intercity</Typography>
              </Box>
            </NavLink>
            <NavLink
              to="Hourlycomponent"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'blue' : 'inherit',
              })}
            >
              <Box sx={{ textAlign: 'center', cursor: 'hover' }}>
                <Typography variant="h6">Hourly</Typography>
              </Box>
            </NavLink>
          </Box>
          {/* Nested Routes */}
          <Box sx={{ marginTop: -2, padding: 2 }}>
            <Routes>
              <Route path="Flatcomponent" element={<FlatComponent />} />
              {/* Add other routes as needed */}
            </Routes>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExampleFetchComponent;
