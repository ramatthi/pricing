import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { NavLink, Routes, Route } from 'react-router-dom';
import FlatComponent from './pages/flat/Flat';
import SlabComponent from './pages/slab/Slab';
import DynamicComponent from './pages/dynamic/Dynamic';
import HourlyComponent from './pages/hourly/Hourly';
import IntercityComponent from './pages/intercity/Intercity';

export const ExampleFetchComponent: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
      <Card sx={{ maxWidth: '100%', width: '100%', minHeight: 650, boxShadow: 2 }}>
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
              <Route path="Slabcomponent" element={<SlabComponent />} />
              <Route path="Dynamiccomponent" element={<DynamicComponent />} />
              <Route path="Intercitycomponent" element={<IntercityComponent />} />
              <Route path="Hourlycomponent" element={<HourlyComponent />} />
              {/* Add other routes as needed */}
            </Routes>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExampleFetchComponent;
