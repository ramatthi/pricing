import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

interface Field {
  label: string;
  name: string;
  type: string | number;
}

interface EditPricingProps {
  fields: Field[];
  handleCancel: () => void;
  handleEditRow: (field: string, value: any) => void; 
  initialRowData?: { [key: string]: string | number }; 
  handleUpdateRow: () => void; 
  isEditing: boolean; 
}

const EditPricing: React.FC<EditPricingProps> = ({ fields, handleCancel, handleEditRow, initialRowData, handleUpdateRow,isEditing }) => {
  const initialFormData = fields.reduce<{ [key: string]: string | number }>((acc, field) => {
    acc[field.name] = initialRowData?.[field.name] ?? '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (initialRowData) {
      setFormData((prevState) => ({
        ...prevState,
        ...initialRowData,
      }));
    }
  }, [initialRowData]);

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

    handleEditRow(name, updatedValue); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateRow(); 
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
                disabled={field.name === 'createdBy' && isEditing}  
                InputProps={{
                  inputMode: field.type === 'number' ? 'numeric' : 'text',
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Update
        </Button>
        <Button onClick={handleCancel} color="secondary" variant="contained" style={{ marginTop: '17px', marginLeft: '10px' }}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditPricing;
