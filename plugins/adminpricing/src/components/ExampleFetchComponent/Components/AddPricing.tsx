import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';

const AddPricing = () => {
  // Define the state with an index signature
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    vehicleType: '',
    bookingType: '',
    minDistance: '',
    maxDistance: '',
    pricePerKm: '',
    previousTotalPrice: ''
  });

  // Define the fields dynamically
  const fields = [
    { label: 'Vehicle Type', name: 'vehicleType', type: 'text' },
    { label: 'Booking Type', name: 'bookingType', type: 'number' },
    { label: 'Min Distance', name: 'minDistance', type: 'number' },
    { label: 'Max Distance', name: 'maxDistance', type: 'number' },
    { label: 'Price Per Km', name: 'pricePerKm', type: 'number' },
    { label: 'Previous Total Price', name: 'previousTotalPrice', type: 'number' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Dynamically render the TextField components */}
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                label={field.label}
                fullWidth
                value={formData[field.name]}
                onChange={handleChange}
                name={field.name}
                type={field.type}
              />
            </Grid>
          ))}
        </Grid>
      </form>
    </div>
  );
};

export default AddPricing;
