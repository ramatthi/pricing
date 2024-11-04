import React, { useEffect, useState } from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import { Typography, Breadcrumbs } from '@material-ui/core';
import EditPricing from './IntercityEdit';

type RidePricing = {
  id: number;
  vehicleType: string;
  baseKms: number;
  baseRateDay: number;
  baseRateNight: number;
  perKmsDay: number;
  perKmsNight: number;
};

const IntercityComponent: React.FC = () => {
  const [pricing, setPricing] = useState<RidePricing[]>([]);
  const [editingPricing, setEditingPricing] = useState<RidePricing | null>(null);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/Flat');
        const data = await response.json();
        setPricing(data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };
    fetchPricingData();
  }, []);

  const handleEdit = (pricing: RidePricing) => {
    setEditingPricing(pricing);
  };

  const handleSave = async (updatedPricing: RidePricing) => {
    try {
      await fetch(`http://localhost:8080/api/Flat/${updatedPricing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPricing),
      });

      setPricing((prevPricing) =>
        prevPricing.map((item) => (item.id === updatedPricing.id ? updatedPricing : item))
      );
    } catch (error) {
      console.error('Error updating pricing data:', error);
    } finally {
      setEditingPricing(null);
    }
  };

  // New function to handle canceling the edit
  const handleCancel = () => {
    setEditingPricing(null); // Reset to null to exit edit mode
  };

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
          onClick={() => handleEdit(rowData)}
        />
      ),
    },
  ];

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
        // Pass handleCancel to EditPricing
        <EditPricing pricing={editingPricing} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <Table
          options={{ search: true, paging: false, sorting: false }}
          columns={columns}
          data={pricing}
          style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
        />
      )}
    </div>
  );
};

export default IntercityComponent;
