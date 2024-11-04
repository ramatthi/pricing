import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@material-ui/core';



type RidePricing = {
  id: number;
  vehicleType: string;
  baseKms: number;
  baseRateDay: number;
  baseRateNight: number;
  perKmsDay: number;
  perKmsNight: number;
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
      const { id, vehicleType, baseKms, baseRateDay, baseRateNight, perKmsDay, perKmsNight } = editedPricing;
      const payload = { id, vehicleType, baseKms, baseRateDay, baseRateNight, perKmsDay, perKmsNight };
      console.log(payload);
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
          value={editedPricing.vehicleType}
          onChange={(e) => handleChange('vehicleType', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Base Kms"
          fullWidth
          type="number"
          value={editedPricing.baseKms}
          onChange={(e) => handleChange('baseKms', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Base Rate Day"
          fullWidth
          type="number"
          value={editedPricing.baseRateDay}
          onChange={(e) => handleChange('baseRateDay', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Base Rate Night"
          fullWidth
          type="number"
          value={editedPricing.baseRateNight}
          onChange={(e) => handleChange('baseRateNight', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Day"
          fullWidth
          type="number"
          value={editedPricing.perKmsDay}
          onChange={(e) => handleChange('perKmsDay', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Per Kms Night"
          fullWidth
          type="number"
          value={editedPricing.perKmsNight}
          onChange={(e) => handleChange('perKmsNight', e.target.value)}
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
