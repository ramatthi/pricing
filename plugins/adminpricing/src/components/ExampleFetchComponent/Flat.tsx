import React, { useState } from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import { Box, Typography, Breadcrumbs, Link } from '@material-ui/core';
import EditPricing from './edit'; 

type RidePricing = {
  id: number;
  vehicleType: string;
  baseKms: number;
  baseRateDay: number;
  baseRateNight: number;
  perKmsDay: number;
  perKmsNight: number;
};

type DenseTableProps = {
  pricing: RidePricing[];
  onEdit: (pricing: RidePricing) => void;
};

const DenseTable: React.FC<DenseTableProps> = ({ pricing, onEdit }) => {
  const columns: TableColumn<RidePricing>[] = [
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Base KMS', field: 'baseKms' },
    { title: 'Base Rate - Day Time (INR)', field: 'baseRateDay' },
    { title: 'Base Rate - Night Time (INR)', field: 'baseRateNight' },
    { title: 'Per KMS - Day Time (INR)', field: 'perKmsDay' },
    { title: 'Per KMS - Night Time (INR)', field: 'perKmsNight' },
    {
      title: 'Edit',
      render: (rowData: RidePricing) => (
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={() => onEdit(rowData)}
        />
      ),
    },
  ];

  return (
    <Table
      options={{ search: true, paging: false, sorting: false }}
      columns={columns}
      data={pricing}
      style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
    />
  );
};

const FlatComponent: React.FC = () => {
  const initialPricing: RidePricing[] = [
    { id: 1, vehicleType: 'Car', baseKms: 10, baseRateDay: 500, baseRateNight: 600, perKmsDay: 15, perKmsNight: 18 },
    // Add additional initial pricing data here
  ];

  const [pricing, setPricing] = useState<RidePricing[]>(initialPricing);
  const [editingPricing, setEditingPricing] = useState<RidePricing | null>(null);

  const handleEdit = (pricing: RidePricing) => {
    setEditingPricing(pricing);
  };

  const handleSave = (updatedPricing: RidePricing) => {
    setPricing((prevPricing) =>
      prevPricing.map((item) => (item.id === updatedPricing.id ? updatedPricing : item))
    );
    setEditingPricing(null);
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '16px' }}>
        <Typography color="inherit">Flat Pricing</Typography>
        {editingPricing ? (
          <Typography color="textPrimary">Edit Pricing</Typography>
        ) : (
          <Typography color="textPrimary">View Pricing</Typography>
        )}
      </Breadcrumbs>
      
      {editingPricing ? (
        <EditPricing pricing={editingPricing} onSave={handleSave} />
      ) : (
        <DenseTable pricing={pricing} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default FlatComponent;
