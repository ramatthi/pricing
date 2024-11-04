import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableColumn } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

type RidePricing = {
  id: number;
  minimumDistance: number;
  maximumDistance: number;
  vehicleType: string;
  price: number;
  previousTotalPrice: number;
};

const useStyles = makeStyles({
  pagination: {
    marginBottom: '-2px',
    backgroundColor: 'transparent',
  },
  
});

const DenseTable: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<RidePricing[]>([]);
  const [editableRow, setEditableRow] = useState<RidePricing | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from API using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/rides'); // Replace with your API URL
        setData(response.data); // Assuming the response data is in the correct format
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (row: RidePricing) => {
    setEditableRow(row);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (editableRow) {
      setData((prev) =>
        prev.map((item) => (item.id === editableRow.id ? editableRow : item))
      );
      setEditableRow(null);
      setIsEditing(false);
    }
  };

  const columns: TableColumn<RidePricing>[] = [
    { title: 'ID', field: 'id' },
    {
      title: 'Vehicle Type',
      field: 'vehicleType',
      render: (rowData) => rowData.vehicleType,
    },
    {
      title: 'Min Distance',
      field: 'minimumDistance',
      render: (rowData) => rowData.minimumDistance,
    },
    {
      title: 'Max Distance',
      field: 'maximumDistance',
      render: (rowData) => rowData.maximumDistance,
    },
    {
      title: 'Price',
      field: 'pricePerKm',
      render: (rowData) => rowData.price,
    },
    {
      title: 'Previous Total Price',
      field: 'previousTotalPrice',
      render: (rowData) => rowData.previousTotalPrice,
    },
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
        <div style={{ marginBottom: '20px' }}>
          <h3>Edit Ride Pricing</h3>
          <TextField
            label="Vehicle Type"
            value={editableRow?.vehicleType}
            onChange={(e) => editableRow && setEditableRow({ ...editableRow, vehicleType: e.target.value })}
          />
          <TextField
            label="Min Distance"
            type="number"
            value={editableRow?.minimumDistance}
            onChange={(e) => editableRow && setEditableRow({ ...editableRow, minimumDistance: Number(e.target.value) })}
          />
          <TextField
            label="Max Distance"
            type="number"
            value={editableRow?.maximumDistance}
            onChange={(e) => editableRow && setEditableRow({ ...editableRow, maximumDistance: Number(e.target.value) })}
          />
          <TextField
            label="Price"
            type="number"
            value={editableRow?.price}
            onChange={(e) => editableRow && setEditableRow({ ...editableRow, price: Number(e.target.value) })}
          />
          <TextField
            label="Previous Total Price"
            type="number"
            value={editableRow?.previousTotalPrice}
            onChange={(e) => editableRow && setEditableRow({ ...editableRow, previousTotalPrice: Number(e.target.value) })}
          />
          <div style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Table<RidePricing>
          options={{
            search: false,
            paging: false,
            sorting :false,
            pageSize: 10,
            pageSizeOptions: [5, 10, 20],
            padding: 'dense',
          }}
          columns={columns}
          data={data}
          style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
        />
      )}
    </div>
  );
};

const FlatComponent: React.FC = () => {
  return <DenseTable />;
};

export default FlatComponent;
