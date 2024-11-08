import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles, IconButton, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import BreadcrumbsComponent from '../Components/Breadcrumbs';
import FlatEdit from '../Components/FlatEdit';
import AddPricing from '../Components/AddPricing';

type Pricing = {
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
  container: {
    backgroundColor: 'transparent',
    marginTop: '-35px',
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
  addButton: {
    marginRight :'10px',
    marginBottom: '10px'
  }
}));


const FlatComponent: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Pricing[]>([]);
  const [editableRow, setEditableRow] = useState<Pricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding,setIsAdding ] =useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingFlatdetails')
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

  const handleFieldChange = (field: string, value: any) => {
    if (editableRow) {
      setEditableRow({ ...editableRow, [field]: value });
    }
  };

  const columns: TableColumn<Pricing>[] = useMemo(() => [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'bookingtype' },
    { title: 'Vehicle Type', field: 'vehicletype' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price', field: 'price' },
    { title: 'Previous Price', field: 'previousPrice' },
    { title: 'Created By', field: 'createdBy' },
    { title: 'Updated By', field: 'updatedBy' },
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
   
    { label: 'Booking Type', name: 'bookingtype', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicletype', type: 'text' },
    { label: 'Min Distance', name: 'minDistance', type: 'number' },
    { label: 'Max Distance', name: 'maxDistance', type: 'number' },
    { label: 'Price', name: 'price', type: 'number' },
    { label: 'Previous Price', name: 'previousPrice', type: 'number' },
    { label: 'Approved By', name: 'approvedBy', type: 'text' },
    { label: 'Created By', name: 'createdBy', type: 'number' },
    { label: 'Updated By', name: 'updatedBy', type: 'number' }
  ];
 
  return (
    <div>
      {isEditing ? (
        <div className={classes.breadcrumbs}>
          <BreadcrumbsComponent
            handleCancel={handleCancel}
            breadcrumblabels={['Flat Pricing', 'Edit Flat Pricing']}
          />
          <FlatEdit
            editableRow={editableRow}
            onFieldChange={handleFieldChange}
            handleCancel={handleCancel}
            setData={setData}
            setIsEditing={setIsEditing}
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
        <Button
          className={classes.addButton}
          color="primary"
          variant="contained"
          onClick={handleAddClick}
        >
          Add Pricing
        </Button>
        
      </div>)}
      </div>
  );
};
 
export default FlatComponent;
