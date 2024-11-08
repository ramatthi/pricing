// src/Components/Button.tsx
import React from 'react';
import { Button, Grid } from '@mui/material';

interface ActionButtonsProps {
  handleSave: () => void;
  handleCancel: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ handleSave, handleCancel }) => {
  return (
    <Grid item xs={12}>
      <Button 
        type='submit'
        variant="contained" 
        color="primary" 
        onClick={handleSave} 
        style={{ marginRight: '16px' }}
      >
        Save
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleCancel}
        style={{ marginRight: '16px' }}
      >
        Cancel
      </Button>
    </Grid>
  );
};

export default ActionButtons;
