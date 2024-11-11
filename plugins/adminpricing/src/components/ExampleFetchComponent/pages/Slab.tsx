import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditPricing from '../Components/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import AddPricing from '../Components/AddPricing';
import AddPricingButton from '../Components/AddPricingButton';

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

const useStyles = makeStyles((theme) => ({
  container: { backgroundColor: 'transparent', marginTop: '-35px' },
  breadcrumbs: { marginBottom: theme.spacing(2), cursor: 'pointer' },
  addButton: { marginRight: '10px', marginBottom: '14px' },
}));

const DenseTable: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Pricing[]>([]);
  const [editableRow, setEditableRow] = useState<Pricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingdetails')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEditClick = (row: Pricing) => {
    setEditableRow(row); 
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleEditRow = (field: string, value: any) => {
    if (editableRow) {
      setEditableRow({ ...editableRow, [field]: value });
    }
  };

  const handleUpdateRow = () => {
    if (editableRow) {
      axios
        .put(`http://localhost:8080/api/updatePricing/${editableRow.id}`, editableRow)
        .then((response) => {
          
          setData((prev) =>
            prev.map((item) => (item.id === editableRow.id ? { ...editableRow, ...response.data } : item))
          );
          setIsEditing(false); 
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    }
  };

  const columns: TableColumn<Pricing>[] = useMemo(() => [
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
  ], []);

  const handleAddRow = (newRowData: { [key: string]: string | number }) => {
    axios
      .post('http://localhost:8080/api/addSlabPricing', newRowData)
      .then((response) => {
        setData((prevData) => [...prevData, response.data]);
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  const fields = [
    { label: 'Booking Type', name: 'bookingType', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicleType', type: 'text' },
    { label: 'Min Distance', name: 'minDistance', type: 'number' },
    { label: 'Max Distance', name: 'maxDistance', type: 'number' },
    { label: 'Price Per km', name: 'pricePerKm', type: 'number' },
    { label: 'Previous Total Price', name: 'previousTotalPrice', type: 'number' },
    { label: 'Created by', name: 'createdBy', type: 'number' },
    { label: 'Updated by', name: 'updatedby', type: 'number' },
  ];

  return (
    <div>
      {isEditing ? (
        <div className={classes.breadcrumbs}>
          <BreadcrumbsComponent
            handleCancel={handleCancel}
            breadcrumblabels={['Slab Pricing', 'Edit Slab Pricing']}
          />
          <EditPricing
            fields={fields}
            handleEditRow={handleEditRow}
            handleCancel={handleCancel}
            initialRowData={editableRow || undefined}
            handleUpdateRow={handleUpdateRow} 
            isEditing={isEditing} 
          />
        </div>
      ) : isAdding ? (
        <div className={classes.breadcrumbs}>
          <BreadcrumbsComponent
            handleCancel={handleCancel}
            breadcrumblabels={['Slab Pricing', 'Add Slab Pricing']}
          />
          <AddPricing fields={fields} handleCancel={handleCancel} handleAddRow={handleAddRow} />
        </div>
      ) : (
        <div className={classes.container}>
          <Table<Pricing>
            options={{ search: true, paging: false, padding: 'dense' }}
            columns={columns}
            data={data}
            style={{ boxShadow: 'none' }}
          />
          <AddPricingButton onClick={handleAddClick} />
        </div>
      )}
    </div>
  );
};

export default DenseTable;
