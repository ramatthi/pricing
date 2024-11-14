import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {  IconButton, makeStyles } from '@material-ui/core';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import AddPricing from '../Components/AddPricing';
import EditPricing from '../Components/Edit';
import AddPricingButton from '../Components/AddPricingButton';

type Pricing = {
  id: number;
  booking_type: string;
  vehicle_type: string;
  minDistance: number;
  maxDistance: number;
  price_per_km: number;
  previous_range_cap: number;
  createdby :number

};

const useStyles = makeStyles((theme) => ({
  container: { backgroundColor: 'transparent', marginTop: '-35px' },
  breadcrumbs: { marginBottom: theme.spacing(2), cursor: 'pointer' },
  addButton: {
    marginRight :'10px',
    marginBottom: '10px'
  }
}));

const Intercity: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Pricing[]>([]);
  const [editableRow, setEditableRow] = useState<Pricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding,setIsAdding ] =useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingIntercitydetails')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEditClick = (row: Pricing) => {
    setEditableRow(row);
    setIsEditing(true);
  };
  const handleAddClick =() =>{
    setIsAdding(true);
  }

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
  const columns: TableColumn<Pricing>[] = useMemo (() =>[
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'booking_type' },
    { title: 'Vehicle Type', field: 'vehicle_type' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price Per Km', field: 'price_per_km' },
    { title: 'Pre Range cap', field: 'previous_range_cap' },
    { title: 'Created By', field: 'createdby' },
    {
      title: 'Actions', 
      field: 'actions',
      render: (rowData) => (
        <IconButton onClick={() => handleEditClick(rowData)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ],[]);
 
  const fields = [
    { label: 'Booking Type', name: 'booking_type', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicle_type', type: 'text' },
    { label: 'Min Distance', name: 'minDistance', type: 'number' },
    { label: 'Max Distance', name: 'maxDistance', type: 'number' },
    { label: 'Price Per Km', name: 'price_per_km', type: 'number' },
    { label: 'Previous Range cap', name: 'previous_range_cap', type: 'number' },
  ];
  const handleAddRow = (newRowData: { [key: string]: string | number }) => {
    axios
      .post('http://localhost:8080/api/', newRowData)
      .then((response) => {
        setData((prevData) => [...prevData, response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
     });
  };

  return (
    <div>
      {isEditing ? (
        <div className={classes.breadcrumbs}>
          <BreadcrumbsComponent handleCancel={handleCancel} 
            breadcrumblabels={['Intercity Pricing','Edit Intercity Pricing']} />
          <EditPricing
            fields={fields}
            handleEditRow={handleEditRow}
            handleCancel={handleCancel}
            initialRowData={editableRow || undefined}
            handleUpdateRow={handleUpdateRow} 
            isEditing={isEditing} 
          />
        </div>
      ) : isAdding?(
        <div className={classes.breadcrumbs}>
        <BreadcrumbsComponent handleCancel={handleCancel}
            breadcrumblabels={['Intercity Pricing','Add Intercity Pricing']} />
        <AddPricing fields={fields} handleCancel={handleCancel} handleAddRow={handleAddRow}/>
        </div>
      ):(<div className={classes.container}>
        <Table<Pricing>
          options={{ search: true, paging: false, padding: 'dense' }}
          columns={columns}
          data={data}
          style={{ boxShadow: 'none' }}
        />
        <AddPricingButton onClick={handleAddClick} />
      </div>)}
      </div>
  );
};

export default Intercity;
