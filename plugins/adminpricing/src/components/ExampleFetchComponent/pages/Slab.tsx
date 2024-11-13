import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { IconButton, makeStyles, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditPricing from '../Components/Edit';
import BreadcrumbsComponent from '../Components/Breadcrumbs';
import AddPricing from '../Components/AddPricing';
import AddPricingButton from '../Components/AddPricingButton';
import { PricingConfig, pricingConfig, Pricing } from './config';

const useStyles = makeStyles((theme) => ({
  container: { backgroundColor: 'transparent', marginTop: '-35px' },
  breadcrumbs: { marginBottom: theme.spacing(2), cursor: 'pointer' },
  addButton: { marginRight: '10px', marginBottom: '14px' },
}));

interface DenseTableProps {
  config?: PricingConfig;
}

const DenseTable: React.FC<DenseTableProps> = ({ config = pricingConfig }) => {
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

  const columns: TableColumn<Pricing>[] = useMemo(() => {
    // Add the edit button inside the column definitions
    return [
      ...config.tableColumns,
      {
        title: 'Actions',
        field: 'actions',
        render: (rowData: Pricing) => (
          <IconButton onClick={() => handleEditClick(rowData)}>
            <EditIcon />
          </IconButton>
        ),
      },
    ];
  }, [config.tableColumns]);

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

  const fields = config.fields;

  return (
    <div>
      {isEditing ? (
        <div className={classes.breadcrumbs}>
          <BreadcrumbsComponent
            handleCancel={handleCancel}
            breadcrumblabels={[config.breadcrumbs.edit, config.breadcrumbs.edit1]}
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
            breadcrumblabels={[config.breadcrumbs.add, config.breadcrumbs.add1]}
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
