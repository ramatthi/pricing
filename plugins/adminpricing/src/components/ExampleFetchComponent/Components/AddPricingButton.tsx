import { Button } from '@material-ui/core';
import React from 'react';

interface AddPricingButtonProps {
  onClick: () => void;
}

const AddPricingButton: React.FC<AddPricingButtonProps> = ({ onClick }) => {
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={onClick}  
      style={{ marginTop: '10px' }} 
    >
      Add Pricing
    </Button>
  );
};

export default AddPricingButton;
