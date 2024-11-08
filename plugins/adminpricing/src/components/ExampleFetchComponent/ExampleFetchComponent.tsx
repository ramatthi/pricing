import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { NavLink, Routes, Route } from 'react-router-dom';

import FlatComponent from './Flat';
import SlabComponent from './Slab';
import Dynamic from './Dynamic'; 
export const ExampleFetchComponent: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
   
      <Card sx={{ maxWidth: 1600, width: '100%', minHeight: 900, boxShadow: 3 }}>
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
              
            </Routes>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
 
export default ExampleFetchComponent;