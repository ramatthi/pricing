import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, makeStyles } from '@material-ui/core';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import DynamicEdit from '../Components/DynamicEdit';

type Pricing = {
  id: number;
  bookingType: string;
  vehicleType: string;
  basePricePerKm: number;
  intervalChangeKm: number;
  incrementInPrice: number;
  decrementInPrice: number;
  maxCap: number;
  minCap: number;
  
};

const useStyles = makeStyles((theme) => ({
    container: { backgroundColor: 'transparent',
      marginTop: '-35px',  },
    breadcrumbs: { marginBottom: theme.spacing(2), cursor: 'pointer' },
  }));

const Dynamic: React.FC = () => {
  const classes = useStyles(); 
  const [data, setData] = useState<Pricing[]>([]); 
  const [editableRow, setEditableRow] = useState<Pricing | null>(null); 
  const [isEditing, setIsEditing] = useState(false); 

  
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingDynamicdetails')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle the edit button click
  const handleEditClick = (row: Pricing) => {
    setEditableRow(row);
    setIsEditing(true);
  };

  // Handle cancel action for editing
  const handleCancel = () => {
    setEditableRow(null);
    setIsEditing(false);
  };

  // Handle field change in the editable form
  const handleFieldChange = (field: string, value: any) => {
    if (editableRow) {
      setEditableRow({ ...editableRow, [field]: value });
    }
  };

  // Define columns for the table
  const columns: TableColumn<Pricing>[] = [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'bookingType' },
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Base Price', field: 'basePricePerKm' },
    { title: 'Interval Change', field: 'intervalChangeKm' },
    { title: 'Increment In Price', field: 'incrementInPrice' },
    { title: 'Decrement In Price', field: 'decrementInPrice' },
    { title: 'Max Cap', field: 'maxCap' },
    { title: 'Min Cap', field: 'minCap' },
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
        <div className={classes.breadcrumbs}>
          {/* Assuming BreadcrumbsComponent is another component */}
          <BreadcrumbsComponent handleCancel={handleCancel} 
           breadcrumblabels={['Dynamic Pricing','Edit Dynamic Pricing']} />
          <DynamicEdit
            editableRow={editableRow}
            onFieldChange={handleFieldChange}
            handleCancel={handleCancel}
            setData={setData}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <div className={classes.container}>
          <Table<Pricing>
            options={{ search: true, paging: false, padding: 'dense' }}
            columns={columns}
            data={data}
            style={{ boxShadow: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default Dynamic;
