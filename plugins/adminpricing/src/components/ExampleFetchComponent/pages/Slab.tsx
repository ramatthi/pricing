import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles, IconButton, Button, Grid, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';

type Pricing = {
  id: number;
  minDistance: number;
  maxDistance: number;
  vehicleType: string;
  bookingType: number;
  pricePerKm: number;
  previousTotalPrice: number;
  createdBy: number;
  updatedby: number;
};

type PricingFormData = {
  vehicleType: string;
  bookingType: string;
  minDistance: string;
  maxDistance: string;
  pricePerKm: string;
  previousTotalPrice: string;
};

const useStyles = makeStyles((theme) => ({
  container: { backgroundColor: 'transparent', marginTop: '-35px' },
  breadcrumbs: { marginBottom: theme.spacing(2), cursor: 'pointer' },
  addButton: { 
    marginRight :'10px',
    marginBottom: '10px' 
  }
}));

const DenseTable: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Pricing[]>([]);
  const [editableRow, setEditableRow] = useState<Pricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // State to track Add form visibility
  const [formData, setFormData] = useState<PricingFormData>({
    vehicleType: '',
    bookingType: '',
    minDistance: '',
    maxDistance: '',
    pricePerKm: '',
    previousTotalPrice: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/pricingdetails')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEditClick = (row: Pricing) => {
    setEditableRow(row);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPricing: Pricing = {
      id: Date.now(), // Temporary ID for now
      createdBy: 1,
      updatedby: 1,
      vehicleType: formData.vehicleType,
      bookingType: parseInt(formData.bookingType),
      minDistance: parseFloat(formData.minDistance),
      maxDistance: parseFloat(formData.maxDistance),
      pricePerKm: parseFloat(formData.pricePerKm),
      previousTotalPrice: parseFloat(formData.previousTotalPrice),
    };

    axios.post('http://localhost:8080/api/pricingdetails', newPricing)
      .then(() => {
        setData((prevState) => [...prevState, newPricing]); // Update local state
        setIsAdding(false); // Close form after submission
      })
      .catch((error) => console.error('Error adding pricing:', error));
  };

  const fields = [
    { label: 'Vehicle Type', name: 'vehicleType', type: 'text' },
    { label: 'Booking Type', name: 'bookingType', type: 'number' },
    { label: 'Min Distance', name: 'minDistance', type: 'number' },
    { label: 'Max Distance', name: 'maxDistance', type: 'number' },
    { label: 'Price Per Km', name: 'pricePerKm', type: 'number' },
    { label: 'Previous Total Price', name: 'previousTotalPrice', type: 'number' }
  ];

  const columns: TableColumn<Pricing>[] = [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'bookingType' },
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price Per km', field: 'pricePerKm' },
    { title: 'Previous Total Price', field: 'previousTotalPrice' },
    { title: 'Created by', field: 'createdBy' },
    { title: 'Updated by', field: 'updatedby' },
    {
      title: 'Actions',
      field: 'actions',
      render: (rowData) => (
        <IconButton onClick={() => handleEditClick(rowData)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      {isAdding ? (
        <div className={classes.breadcrumbs}>
          <BreadcrumbsComponent
            handleCancel={handleCancel}
            breadcrumblabels={['Slab Pricing', 'Add Slab Pricing']}
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    label={field.label}
                    fullWidth
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    name={field.name}
                    type={field.type}
                  />
                </Grid>
              ))}
            </Grid >
            <Button type="submit" color="primary" variant="contained">
              Add Pricing
            </Button>
            <Button onClick={handleCancel} color="secondary">
              Cancel
            </Button>
          </form>
        </div>
      ) : (
        <div className={classes.container}>
         
          <Table<Pricing>
            options={{ paging: false }}
            columns={columns}
            data={data}
            style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
          />
           <Button
            className={classes.addButton}
            color="primary"
            variant="contained"
            onClick={handleAddClick}
          >
            Add Pricing
          </Button>
        </div>
      )}
    </div>
  );
};

export default DenseTable;
