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

const FlatEdit: React.FC<EditableFormProps> = ({
  editableRow,
  onFieldChange,
  handleCancel,
  setData,
  setIsEditing,
}) => {
  const formFields = [
    { label: 'Booking Type', field: 'bookingtype', type: 'text' },
    { label: 'Vehicle Type', field: 'vehicletype', type: 'text' },
    { label: 'Min Distance', field: 'minDistance', type: 'number' },
    { label: 'Max Distance', field: 'maxDistance', type: 'number' },
    { label: 'Price', field: 'price', type: 'number' },
    { label: 'Previous Price', field: 'previousPrice', type: 'number' },
    { label: 'Approved By', field: 'approvedBy', type: 'text' },
    { label: 'Created By', field: 'createdBy', type: 'number' },
    { label: 'Updated By', field: 'updatedBy', type: 'number' },
  ];

  const handleSave = async () => {
    if (editableRow) {
      try {
        await axios.put(`http://localhost:8080/api/${editableRow.id}`, editableRow);
        setData((prev) =>
          prev.map((item) => (item.id === editableRow.id ? editableRow : item))
        );
        setIsEditing(false); // Exit edit mode
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
                  field.type === 'number'
                    ? Number(e.target.value)
                    : field.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value
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

export default FlatEdit;
