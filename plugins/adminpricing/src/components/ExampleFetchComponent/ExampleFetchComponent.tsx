import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { NavLink, Routes, Route } from 'react-router-dom';
import FlatComponent from './pages/Flat';
import SlabComponent from './pages/Slab';
import Dynamic from './pages/Dynamic';
import Hourly from './pages/Hourly';
import Intercity from './pages/Intercity';

export const ExampleFetchComponent: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: 0 ,height:'100vh'}}>
    
      <Card sx={{display:'flex', maxWidth: 1800, width: '100%', minHeight: 900, boxShadow: 3 }}>
        <CardContent>
       
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginBottom: 3, borderBottom: '1px solid #ddd' }}>
            {['Flat', 'Slab', 'Dynamic', 'Intercity', 'Hourly'].map((label) => (
              <NavLink
                key={label}
                to={`${label}component`}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderBottom: isActive ? '3px solid blue' : '3px solid transparent',
                  color: isActive ? 'blue' : 'black',
                  fontWeight: isActive ? 'bold' : 'normal',
                  cursor: 'pointer',
                })}
              >
                {label}
              </NavLink>
            ))}
          </Box>

         
          <Box sx={{ padding: 2 }}>
            <Routes>
              <Route path="Flatcomponent" element={<FlatComponent />} />
              <Route path="Slabcomponent" element={<SlabComponent />} />
              <Route path="Dynamiccomponent" element={<Dynamic />} />
              <Route path="Hourlycomponent" element={<Hourly />} />
              <Route path="Intercitycomponent" element={<Intercity />} />
              {/* Add other routes as needed */}
            </Routes>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExampleFetchComponent;
