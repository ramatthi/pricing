import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

type RidePricing = {
  id: number;
  bookingtype: string;
  vehicletype: string;
  minDistance: number;
  maxDistance: number;
  price: number;
  previousPrice: number;
  isActive: boolean;
  approvedBy: string;
  createdBy: number;
  updatedBy: number;
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
        const response = await axios.get('https://api.example.com/rides'); 
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
        await axios.put(`https://api.example.com/rides/${editableRow.id}`, editableRow);
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
    { title: 'Booking Type', field: 'bookingtype' },
    { title: 'Vehicle Type', field: 'vehicletype' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price', field: 'price' },
    { title: 'Previous Price', field: 'previousPrice' },
    { title: 'Is Active', field: 'isActive' },
    { title: 'Approved By', field: 'approvedBy' },
    { title: 'Created By', field: 'createdBy' },
    { title: 'Updated By', field: 'updatedBy' },
    {
      title: 'Actions',
      field: 'actions',
      render: (rowData: RidePricing) => (
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
                Flat Pricing
              </Link>
              <Typography color="textPrimary">Edit Flat Pricing</Typography>
            </Breadcrumbs>
          </div>
          <Typography variant="h6" className={classes.title}>
            Edit Flat Pricing
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Booking Type"
                fullWidth
                value={editableRow?.bookingtype}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, bookingtype: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Vehicle Type"
                fullWidth
                value={editableRow?.vehicletype}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, vehicletype: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Min Distance"
                type="number"
                fullWidth
                value={editableRow?.minDistance}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, minDistance: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Max Distance"
                type="number"
                fullWidth
                value={editableRow?.maxDistance}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, maxDistance: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={editableRow?.price}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, price: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Previous Price"
                type="number"
                fullWidth
                value={editableRow?.previousPrice}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, previousPrice: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editableRow?.isActive || false}
                    onChange={(e) =>
                      editableRow && setEditableRow({ ...editableRow, isActive: e.target.checked })
                    }
                  />
                }
                label="Is Active"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Approved By"
                fullWidth
                value={editableRow?.approvedBy}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, approvedBy: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Created By"
                type="number"
                fullWidth
                value={editableRow?.createdBy}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, createdBy: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Updated By"
                type="number"
                fullWidth
                value={editableRow?.updatedBy}
                onChange={(e) =>
                  editableRow && setEditableRow({ ...editableRow, updatedBy: Number(e.target.value) })
                }
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

const FlatComponent: React.FC = () => {
  return <DenseTable />;
};

export default FlatComponent;
