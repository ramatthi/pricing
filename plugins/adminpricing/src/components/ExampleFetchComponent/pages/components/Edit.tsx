import React from 'react';
import { TextField, Grid } from '@material-ui/core';
 
interface EditableTextFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
 
const EditableTextField: React.FC<EditableTextFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        label={label}
        fullWidth
        value={value}
        onChange={onChange}
        type={type}
      />
    </Grid>
  );
};
 
export default EditableTextField;