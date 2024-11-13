import React, { useEffect, useState } from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../components/BreadCrumbs';
import EditableTextField from '../components/Edit';

type RidePricing = {
  id: number;
  vehicleType: string;
  baseKms: number;
  baseRateDay: number;
  baseRateNight: number;   
  perKmsDay: number;
  perKmsNight: number;
};

const DynamicComponent: React.FC = () => {
  const [pricing, setPricing] = useState<RidePricing[]>([]);
  const [editingPricing, setEditingPricing] = useState<RidePricing | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch pricing data
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

  // Handle edit action
  const handleEdit = (pricing: RidePricing) => setEditingPricing(pricing);

  // Handle field change
  const handleChange = (field: keyof RidePricing, value: string) => {
    if (editingPricing) {
      let parsedValue: string | number = value;

      if (['baseKms', 'baseRateDay', 'baseRateNight', 'perKmsDay', 'perKmsNight'].includes(field)) {
        // If it's a numeric field, parse the value to a number
        parsedValue = value ? parseFloat(value) : 0;  // Or set it to `undefined` if you prefer.
      }

      setEditingPricing(prev => ({ ...prev!, [field]: parsedValue }));
    }
  };

  // Handle save action
  const handleSave = async () => {
    if (!editingPricing ) {
      setError('Please ensure all fields are filled with valid numeric values.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/EditFlat', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPricing),
      });

      if (!response.ok) throw new Error('Failed to update pricing');
      setPricing(prev => prev.map(item => (item.id === editingPricing.id ? editingPricing : item)));
      setEditingPricing(null); // Close the editing form
    } catch (error) {
      console.error('Error updating pricing data:', error);
      setError('Error updating pricing data. Please try again.');
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setEditingPricing(null);
    setError(null);
  };

  // Columns for table
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
        <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleEdit(rowData)} />
      ),
    },
  ];

  // Form fields for editing
  const pricingFields: { label: string; field: keyof Omit<RidePricing, 'id'>; type: 'text' | 'number' }[] = [
    { label: 'Vehicle Type', field: 'vehicleType', type: 'text' },
    { label: 'Base Kms', field: 'baseKms', type: 'number' },
    { label: 'Base Rate Day', field: 'baseRateDay', type: 'number' },
    { label: 'Base Rate Night', field: 'baseRateNight', type: 'number' },
    { label: 'Per Kms Day', field: 'perKmsDay', type: 'number' },
    { label: 'Per Kms Night', field: 'perKmsNight', type: 'number' },
  ];

  return (
    <div>
      {editingPricing && <BreadcrumbsComponent handleCancel={handleCancel} />}
      {editingPricing ? (
        <div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {pricingFields.map(({ label, field, type }) => (
            <EditableTextField
              key={field}
              label={label}
              value={editingPricing[field] ?? ''}
              onChange={(e) => handleChange(field, e.target.value)}
              type={type}
            />
          ))}
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
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

export default DynamicComponent;
