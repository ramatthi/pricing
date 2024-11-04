import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Button, Paper, Grid, Typography, Breadcrumbs, Link } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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
    {
      title: 'Booking Type',
      field: 'bookingType',
      render: (rowData) => rowData.bookingType,
    },
    {
      title: 'Vehicle Type',
      field: 'vehicleType',
      render: (rowData) => rowData.vehicleType,
    },
    {
      title: 'Min Distance',
      field: 'minDistance',
      render: (rowData) => rowData.minDistance,
    },
    {
      title: 'Max Distance',
      field: 'maxDistance',
      render: (rowData) => rowData.maxDistance,
    },
    {
      title: 'Price Per km',
      field: 'pricePerKm',
      render: (rowData) => rowData.pricePerKm,
    },
    {
      title: 'Previous Total Price',
      field: 'previousTotalPrice',
      render: (rowData) => rowData.previousTotalPrice,
    },
    {
      title: 'Created by',
      field: 'createdBy',
      render: (rowData) => rowData.createdBy,
    },
    {
      title: 'Updated by',
      field: 'updatedby',
      render: (rowData) => rowData.updatedby,
    },
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
      {isEditing ? (
        <Paper className={classes.editContainer}>
          <div className={classes.breadcrumbsContainer}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link 
                color="inherit" 
                onClick={handleCancel} 
                className={classes.link}
              >
                Slab Pricing 
              </Link>
              <Typography color="textPrimary">Edit Slab Pricing</Typography>
            </Breadcrumbs>
          </div>
          <Typography variant="h6" className={classes.title}>
            Edit Slab Pricing
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Vehicle Type"
                fullWidth
                value={editableRow?.vehicleType}
                onChange={(e) => editableRow && setEditableRow({ ...editableRow, vehicleType: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Min Distance"
                type="number"
                fullWidth
                value={editableRow?.minDistance}
                onChange={(e) => editableRow && setEditableRow({ ...editableRow, minDistance: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Max Distance"
                type="number"
                fullWidth
                value={editableRow?.maxDistance}
                onChange={(e) => editableRow && setEditableRow({ ...editableRow, maxDistance: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Booking Type"
                type="number"
                fullWidth
                value={editableRow?.bookingType}
                onChange={(e) => editableRow && setEditableRow({ ...editableRow, bookingType: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price Per km"
                type="number"
                fullWidth
                value={editableRow?.pricePerKm}
                onChange={(e) => editableRow && setEditableRow({ ...editableRow, pricePerKm: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Updated By"
                type="number"
                fullWidth
                value={editableRow?.updatedby}
                onChange={(e) => editableRow && setEditableRow({ ...editableRow, updatedby: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Previous Total Price"
                type="number"
                fullWidth
                value={editableRow?.previousTotalPrice}
                onChange={(e) => editableRow && setEditableRow({ ...editableRow, previousTotalPrice: Number(e.target.value) })}
              />
            </Grid>
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
// common
const SlabComponent: React.FC = () => {
  return <DenseTable />;
};

export default SlabComponent;
