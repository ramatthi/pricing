import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import BreadcrumbsComponent from '../Components/Breadcrumbs';
import FlatEdit from '../Components/FlatEdit';

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
}));

const FlatComponent: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<Pricing[]>([]);
  const [editableRow, setEditableRow] = useState<Pricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleCancel = () => {
    setEditableRow(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (editableRow) {
      setEditableRow({ ...editableRow, [field]: value });
    }
  };

  const columns: TableColumn<Pricing>[] = [
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
      ) : (
        <div className={classes.container}>
          <Table<Pricing>
            options={{ search: true, paging: false, }}
            columns={columns}
            data={data}
            style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
          />
        </div>
      )}
    </div>
  );
};

export default FlatComponent;
