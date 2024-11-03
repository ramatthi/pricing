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
};

const EditPricing: React.FC<EditPricingProps> = ({ pricing, onSave }) => {
  const [editedPricing, setEditedPricing] = useState<RidePricing>(pricing);

  const handleChange = (field: keyof RidePricing, value: any) => {
    setEditedPricing({ ...editedPricing, [field]: value });
  };

  const handleSave = () => {
    onSave(editedPricing);
  };

  return (
    <Box p={3} maxWidth="100%" maxHeight="100%" mx="auto" boxShadow={2} borderRadius={4}>
      <Typography variant="h6" gutterBottom>
        Edit Pricing
      </Typography>
      {Object.keys(pricing).map((key) => (
        <Box mb={2} key={key}>
          <TextField
            label={key}
            fullWidth
            type={typeof pricing[key as keyof RidePricing] === 'number' ? 'number' : 'text'}
            value={editedPricing[key as keyof RidePricing]}
            onChange={(e) => handleChange(key as keyof RidePricing, e.target.value)}
          />
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default EditPricing;
