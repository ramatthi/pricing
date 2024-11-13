import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@material-ui/core';



type RidePricing = {
  id: number;
  bookingTypeId: number;         
  vehicleTypeId: number;         
  minDistance: number;           
  maxDistance: number;           
  price: number;                 
  previousPrice: number;         
  isActive: boolean;             
  isApproved: boolean;           
  approvedBy: number;          
  createdBy: number;            
  updatedBy: number;          
};

type EditPricingProps = {
  pricing: RidePricing;
  onSave: (updatedPricing: RidePricing) => void;
  onCancel: () => void;
};

const EditPricing: React.FC<EditPricingProps> = ({ pricing, onSave,onCancel}) => {
  const [editedPricing, setEditedPricing] = useState<RidePricing>(pricing);
  const [error, setError] = useState<string | null>(null);
  

  const handleChange = (field: keyof Omit<RidePricing, 'id'>, value: string) => {
    const parsedValue = typeof editedPricing[field] === 'number' ? parseFloat(value) : value;
    setEditedPricing({ ...editedPricing, [field]: parsedValue });
  };

  const handleSave = async () => {
    setError(null); // Reset any previous errors
    try {
      const { id, bookingTypeId, vehicleTypeId, minDistance, price, previousPrice, isActive ,isApproved,approvedBy,createdBy,updatedBy} = editedPricing;
      const payload = { id, bookingTypeId, vehicleTypeId, minDistance, price, previousPrice, isActive ,isApproved,approvedBy,createdBy,updatedBy};
      const response = await fetch(`http://localhost:8080/api/EditFlat`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update pricing');
      }

      onSave(editedPricing);
    } catch (error) {
      console.error('Error updating pricing data:', error);
      setError('Error updating pricing data. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditedPricing(pricing); // Reset to original pricing
    onCancel();
  };

  return (
    <Box p={3} maxWidth="100%" maxHeight="100%" mx="auto" boxShadow={0} borderRadius={4}>
      <Typography variant="h6" gutterBottom>
        Edit Pricing
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="ID"
        fullWidth
        type="number"
        value={editedPricing.id}
        InputProps={{
          readOnly: true, // Make ID field read-only
        }}
      />
      <Box mb={2}>
        <TextField
          label="Vehicle Type"
          fullWidth
          type="text"
          value={editedPricing.bookingTypeId}
          onChange={(e) => handleChange('bookingTypeId', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Base Kms"
          fullWidth
          type="number"
          value={editedPricing.vehicleTypeId}
          onChange={(e) => handleChange('vehicleTypeId', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Base Rate Day"
          fullWidth
          type="number"
          value={editedPricing.minDistance}
          onChange={(e) => handleChange('minDistance', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Base Rate Night"
          fullWidth
          type="number"
          value={editedPricing.maxDistance}
          onChange={(e) => handleChange('maxDistance', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Day"
          fullWidth
          type="number"
          value={editedPricing.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Night"
          fullWidth
          type="number"
          value={editedPricing.previousPrice}
          onChange={(e) => handleChange('previousPrice', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Night"
          fullWidth
          type="number"
          value={editedPricing.isActive}
          onChange={(e) => handleChange('isActive', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Night"
          fullWidth
          type="number"
          value={editedPricing.isApproved}
          onChange={(e) => handleChange('isApproved', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Night"
          fullWidth
          type="number"
          value={editedPricing.approvedBy}
          onChange={(e) => handleChange('approvedBy', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Night"
          fullWidth
          type="number"
          value={editedPricing.createdBy}
          onChange={(e) => handleChange('createdBy', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Night"
          fullWidth
          type="number"
          value={editedPricing.previousPrice}
          onChange={(e) => handleChange('previousPrice', e.target.value)}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>

    
  );
};

export default EditPricing;