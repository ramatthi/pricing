import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { NavLink, Routes, Route } from 'react-router-dom';
import FlatComponent from './Flat';
import SlabComponent from './Slab';

export const ExampleFetchComponent: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: 2,
        bgcolor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          maxWidth: 1300,
          width: '100%',
          minHeight: 670,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          {/* Header Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              justifyContent: 'center',
              mb: 3,
              bgcolor: '#ffffff',
              padding: 1,
              borderRadius: '8px',
              boxShadow: 2,
            }}
          >
            {['Flat', 'Slab', 'Dynamic', 'Intercity', 'Hourly'].map(label => (
              <NavLink
                key={label}
                to={`${label}component`}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: isActive ? '#ffffff' : '#007BFF',
                  padding: '8px 16px',
                  backgroundColor: isActive ? '#007BFF' : '#e0e0e0',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                })}
              >
                <Typography variant="body1">{label}</Typography>
              </NavLink>
            ))}
          </Box>

          {/* Route components for different tabs */}
          <Box sx={{ marginTop: 3 }}>
            <Routes>
              <Route path="Flatcomponent" element={<FlatComponent />} />
              <Route path="Slabcomponent" element={<SlabComponent />} />
              {/* Add routes for Dynamic, Intercity, Hourly components here */}
            </Routes>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExampleFetchComponent;
