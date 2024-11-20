import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {  IconButton, makeStyles } from '@material-ui/core';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import AddPricing from '../Components/AddPricing';
import EditPricing from '../Components/Edit';
import AddPricingButton from '../Components/AddPricingButton';
import { DynamicPricingConfig, dynamicPricingConfig, DynamicPricing } from './Config';
import useStyles from './Styles';
interface DenseTableProps {
  config?: DynamicPricingConfig;
}




const Dynamic: React.FC <DenseTableProps> = ({config =dynamicPricingConfig }) => {
  const classes = useStyles(); 
  const [data, setData] = useState<DynamicPricing[]>([]); 
  const [editableRow, setEditableRow] = useState<DynamicPricing | null>(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isAdding,setIsAdding ] =useState(false);
  
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingDynamicdetails')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const handleEditClick = (row: DynamicPricing) => {
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

  const columns: TableColumn<DynamicPricing>[] = useMemo(() => {
    return [
      ...config.tableColumns,
      {
        title: 'Actions',
        field: 'actions',
        render: (rowData: DynamicPricing) => (
          <IconButton onClick={() => handleEditClick(rowData)}>
            <EditIcon />
          </IconButton>
        ),
      },
    ];
  }, [config.tableColumns]);

  const fields = config.fields;

  return (
    <div>
      {isEditing ? (
        <div className={classes.breadcrumbs}>
         
          <BreadcrumbsComponent handleCancel={handleCancel} 
           breadcrumblabels={['Dynamic Pricing','Edit Dynamic Pricing']} />
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
            breadcrumblabels={['Dynamic Pricing','Edit Dynamic Pricing']} />
        <AddPricing fields={fields} handleCancel={handleCancel} handleAddRow={handleAddRow}/>
        </div>
      ):(<div className={classes.container}>
         <div className={classes.tableWrapper}>
        <Table<DynamicPricing>
          options={{ search: true, paging: false, padding: 'dense' }}
          columns={columns}
          data={data}
          style={{ boxShadow: 'none' }}
        />
        </div>
       <AddPricingButton onClick={handleAddClick} />
      </div>)}
      </div>
  );
};
 

export default Dynamic;
