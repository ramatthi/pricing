import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
 
interface Field {
  label: string;
  name: string;
  type: string | number;
}
 
interface AddPricingProps {
  fields: Field[];
  handleCancel: () => void;
  handleAddRow: (data: { [key: string]: string | number }) => void; 
}
 
const AddPricing: React.FC<AddPricingProps> = ({ fields, handleCancel, handleAddRow }) => {

  const initialFormData = fields.reduce<{ [key: string]: string | number }>((acc, field) => {
    acc[field.name] = ''; 
    return acc;
  }, {});
 

  const [formData, setFormData] = useState(initialFormData);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
 
   
    let updatedValue: string | number = value;
    if (type === 'number') {
      updatedValue = value === '' ? '' : Number(value); 
    }
 
    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
  
    handleAddRow(formData);
 
    
    setFormData(initialFormData);
 
    
    handleCancel();
  };
 
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                label={field.label}
                fullWidth
                value={formData[field.name] || ''}
                onChange={handleChange}
                name={field.name}
                type={field.type as React.HTMLInputTypeAttribute} 
                InputProps={{
                  inputMode: field.type === 'number' ? 'numeric' : 'text',
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Submit
        </Button>
        <Button onClick={handleCancel} color="secondary" variant="contained" style={{marginTop :'17px',marginLeft :'10px'}}>
          Cancel
        </Button> 
      </form>
    </div>
  );
};
 
export default AddPricing;
 
 