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
  hours: number;
  kilometers: number;
  price: number;
  approvedBy: number;
};

const useStyles = makeStyles((theme) => ({
  container: { backgroundColor: 'transparent', marginTop: '-35px' },
  breadcrumbs: { marginBottom: theme.spacing(2), cursor: 'pointer' },
  addButton: {
    marginRight :'10px',
    marginBottom: '10px'
  }
}));

const Hourly: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Pricing[]>([]);
  const [editableRow, setEditableRow] = useState<Pricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding,setIsAdding ] =useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingHourlydetails')
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
    { title: 'Vehicle Type ID', field: 'vehicle_type_id' },
    { title: 'Hours', field: 'hours' },
    { title: 'Kilometers', field: 'kilometers' },
    { title: 'Price', field: 'price' },
    { title: 'Approved By', field: 'approvedBy' },
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
  const handleAddRow = (newRowData: { [key: string]: string | number }) => {
    axios
      .post('http://localhost:8080/api/pricingHourlydetails', newRowData)
      .then((response) => {
        setData((prevData) => [...prevData, response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
     });
  };
  const fields = [
    { label: 'Booking Type', name: 'booking_type', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicle_type', type: 'text' },
    { label: 'Hours', name: 'hours', type: 'number' },
    { label: 'Kilometers', name: 'kilometers', type: 'number' },
    { label: 'Price', name: 'price', type: 'number' },
    { label: 'Approved By', name: 'approvedBy', type: 'number' }
  ];

  return (
    <div>
      {isEditing ? (
        <div className={classes.breadcrumbs}>
          <BreadcrumbsComponent handleCancel={handleCancel} 
            breadcrumblabels={['Hourly Pricing','Edit Hourly Pricing']} />
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
            breadcrumblabels={['Hourly Pricing','Edit Hourly Pricing']} />
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

export default Hourly;
