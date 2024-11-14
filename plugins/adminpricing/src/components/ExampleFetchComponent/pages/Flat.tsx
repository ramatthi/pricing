import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import AddPricing from '../Components/AddPricing';
import EditPricing from '../Components/Edit';
import AddPricingButton from '../Components/AddPricingButton';
import { FlatPricingConfig, flatPricingConfig, FlatPricing } from './Config';

interface DenseTableProps {
  config?: FlatPricingConfig;
}

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
    marginRight: '10px',
    marginBottom: '10px',
  },
}));

const FlatComponent: React.FC<DenseTableProps> = ({ config = flatPricingConfig }) => {
  const classes = useStyles();
  const [data, setData] = useState<FlatPricing[]>([]);
  const [editableRow, setEditableRow] = useState<FlatPricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/pricingFlatdetails')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEditClick = (row: FlatPricing) => {
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
            prev.map((item) =>
              item.id === editableRow.id ? { ...editableRow, ...response.data } : item
            )
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
        console.error('Error adding data:', error);
      });
  };

  const columns: TableColumn<FlatPricing>[] = useMemo(() => {
    return [
      ...config.tableColumns,
      {
        title: 'Actions',
        field: 'actions',
        render: (rowData: FlatPricing) => (
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
           breadcrumblabels={['Flat Pricing','Edit Flat Pricing']} />
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
           <BreadcrumbsComponent handleCancel={handleCancel}
            breadcrumblabels={['Flat Pricing','Add Flat Pricing']} />
          <AddPricing fields={fields} handleCancel={handleCancel} handleAddRow={handleAddRow} />
        </div>
      ) : (
        <div className={classes.container}>
          <Table<FlatPricing>
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

export default FlatComponent;
