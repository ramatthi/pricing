import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import HourlyEdit from '../Components/HourlyEdit';
import AddPricing from '../Components/AddPricing';

type Pricing = {
  id: number;
  booking_type: string;
  vehicle_type_id: number;
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

  const handleFieldChange = (field: string, value: any) => {
    if (editableRow) {
      setEditableRow({ ...editableRow, [field]: value });
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
    { label: 'Vehicle Type ID', name: 'vehicle_type_id', type: 'number' },
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
          <HourlyEdit
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

export default Hourly;
