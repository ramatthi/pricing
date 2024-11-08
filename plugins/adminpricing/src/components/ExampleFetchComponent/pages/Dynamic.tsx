import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import DynamicEdit from '../Components/DynamicEdit';
import AddPricing from '../Components/AddPricing';

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
    addButton: {
      marginRight :'10px',
      marginBottom: '10px'
    }
  }));


const Dynamic: React.FC = () => {
  const classes = useStyles(); 
  const [data, setData] = useState<Pricing[]>([]); 
  const [editableRow, setEditableRow] = useState<Pricing | null>(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isAdding,setIsAdding ] =useState(false);
  
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingDynamicdetails')
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


  const columns: TableColumn<Pricing>[] = useMemo(() =>[
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
    { label: 'Booking Type', name: 'bookingType', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicleType', type: 'text' },
    { label: 'Base Price Per Km', name: 'basePricePerKm', type: 'number' },
    { label: 'Interval Change Km', name: 'intervalChangeKm', type: 'number' },
    { label: 'Increment in Price', name: 'incrementInPrice', type: 'number' },
    { label: 'Decrement in Price', name: 'decrementInPrice', type: 'number' },
    { label: 'Max Cap', name: 'maxCap', type: 'number' },
    { label: 'Min Cap', name: 'minCap', type: 'number' }
  ];
 

  return (
    <div>
      {isEditing ? (
        <div className={classes.breadcrumbs}>
         
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
 

export default Dynamic;
