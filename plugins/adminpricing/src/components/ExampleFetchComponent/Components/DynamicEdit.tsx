import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import EditableTextField from './EditableTextField';
import ActionButtons from './Button';
import axios from 'axios';

type EditableFormProps = {
  editableRow: any;
  onFieldChange: (field: string, value: any) => void;
  handleCancel: () => void;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const DynamicEdit: React.FC<EditableFormProps> = ({
  editableRow,
  onFieldChange,
  handleCancel,
  setData,
  setIsEditing,
}) => {
  const formFields = [
    { label: 'ID', field: 'id', type: 'number', disabled: true },
    { label: 'Booking Type', field: 'bookingType', type: 'text' },
    { label: 'Vehicle Type', field: 'vehicleType', type: 'text' },
    { label: 'Base Price Per Km', field: 'basePricePerKm', type: 'number' },
    { label: 'Interval Change Km', field: 'intervalChangeKm', type: 'number' },
    { label: 'Increment In Price', field: 'incrementInPrice', type: 'number' },
    { label: 'Decrement In Price', field: 'decrementInPrice', type: 'number' },
    { label: 'Max Cap', field: 'maxCap', type: 'number' },
    { label: 'Min Cap', field: 'minCap', type: 'number' },
  ];

  const handleSave = async () => {
    if (editableRow) {
      try {
        await axios.put(`http://localhost:8080/api/pricingdetails/${editableRow.id}`, editableRow);
        setData((prev) =>
          prev.map((item) => (item.id === editableRow.id ? editableRow : item))
        );
        setIsEditing(false); 
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  return (
    <Paper style={{ padding: '15px', boxShadow: 'none' }}>
      <Grid container spacing={2}>
        {formFields.map((field) => (
          <Grid item xs={12} sm={6} key={field.field}>
            <EditableTextField
              label={field.label}
              value={editableRow ? editableRow[field.field] : ''}
              onChange={(e) =>
                onFieldChange(
                  field.field,
                  field.type === 'number' ? Number(e.target.value) : e.target.value
                )
              }
              type={field.type}
              
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <ActionButtons handleSave={handleSave} handleCancel={handleCancel} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DynamicEdit;
