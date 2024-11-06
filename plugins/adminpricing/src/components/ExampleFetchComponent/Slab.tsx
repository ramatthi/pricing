import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, Paper, Grid, Typography, Breadcrumbs, Link } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditableTextField from './Components/EditableTextField'; 
import BreadcrumbsComponent from './Components/Breadcrumbs'; 

type RidePricing = {
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

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: 'transparent',
    marginTop: '-25px',
  },
  editContainer: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0],
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  breadcrumbsContainer: {
    marginBottom: theme.spacing(2),
  },
  link: {
    cursor: 'pointer',
  },
}));

const DenseTable: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<RidePricing[]>([]);
  const [editableRow, setEditableRow] = useState<RidePricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pricingdetails');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (row: RidePricing) => {
    setEditableRow(row);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (editableRow) {
      try {
        await axios.put(`http://localhost:8080/api/pricingdetails/${editableRow.id}`, editableRow);
        setData((prev) =>
          prev.map((item) => (item.id === editableRow.id ? editableRow : item))
        );
        setEditableRow(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  const columns: TableColumn<RidePricing>[] = [
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


  const formFields: { label: string; field: keyof RidePricing; type: string }[] = [
    { label: 'Vehicle Type', field: 'vehicleType', type: 'text' },
    { label: 'Min Distance', field: 'minDistance', type: 'number' },
    { label: 'Max Distance', field: 'maxDistance', type: 'number' },
    { label: 'Booking Type', field: 'bookingType', type: 'number' },
    { label: 'Price Per km', field: 'pricePerKm', type: 'number' },
    { label: 'Updated By', field: 'updatedby', type: 'number' },
    { label: 'Previous Total Price', field: 'previousTotalPrice', type: 'number' },
  ];

  return (
    <div>
      {isEditing ? (
        <Paper className={classes.editContainer}>
          <div className={classes.breadcrumbsContainer}>
          <BreadcrumbsComponent handleCancel={handleCancel} />
          </div>
          <Typography variant="h6" className={classes.title}>
            Edit Slab Pricing
          </Typography>
          <Grid container spacing={2}>
            {formFields.map((field) => (
              <EditableTextField
                key={field.field}
                label={field.label}
                value={editableRow ? editableRow[field.field] : ''}
                onChange={(e) =>
                  editableRow &&
                  setEditableRow({
                    ...editableRow,
                    [field.field]: field.type === 'number' ? Number(e.target.value) : e.target.value,
                  })
                }
                type={field.type}
              />
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCancel} className={classes.button}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <div className={classes.tableContainer}>
          <Table<RidePricing>
            options={{
              search: false,
              paging: false,
              sorting: false,
              padding: 'dense',
            }}
            columns={columns}
            data={data}
            style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

const SlabComponent: React.FC = () => {
  return <DenseTable />;
};

export default SlabComponent;
