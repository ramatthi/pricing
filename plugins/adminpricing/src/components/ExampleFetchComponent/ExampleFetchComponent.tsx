import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { NavLink, Routes, Route } from 'react-router-dom';
import FlatComponent from './Flat';
import SlabComponent from './Slab';

export const ExampleFetchComponent: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
      <Card sx={{ maxWidth: 1300, width: '100%', minHeight: 670, boxShadow: 2 }}>
        <CardContent>
          
          {/* Header Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-around', marginBottom: 3 }}>
            {['Flat', 'Slab', 'Dynamic', 'Intercity', 'Hourly'].map((label) => (
              <NavLink
                key={label}
                to={`${label}component`}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px 30px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'normal',
                  border: '1px solid black',
                  color: isActive ? 'Highlight' : '',
                                })}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {label}
                </Typography>
              </NavLink>
            ))}
          </Box>

          {/* Nested Routes */}
          <Box sx={{ marginTop: -4, padding: 2 }}>
            <Routes>
              <Route path="Flatcomponent" element={<FlatComponent />} />
              <Route path="Slabcomponent" element={<SlabComponent />} />
              {/* Add other routes as needed */}
            </Routes>
          </Box>
        </CardContent>
      </Card>
    </Box>
    //comments
  );
};

export default ExampleFetchComponent;
