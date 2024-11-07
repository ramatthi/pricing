import React, { useEffect, useState } from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import BreadcrumbsComponent from '../components/BreadCrumbs'; // Assuming breadcrumbs are correctly defined
import EditableTextField from '../components/Edit';  // Assuming EditableTextField is correctly defined

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
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/Flat');
        const data = await response.json();
        setPricing(data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
        setError('Error fetching pricing data. Please try again.');
      }
    };
    fetchPricingData();
  }, []);

  // Handle edit action
  const handleEdit = (pricing: RidePricing) => {
    setEditingPricing(pricing);
  };

  // Handle saving updated pricing
  const handleSave = async (updatedPricing: RidePricing) => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:8080/api/EditFlat', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPricing),
      });

      if (!response.ok) throw new Error('Failed to update pricing');

      setPricing((prevPricing) =>
        prevPricing.map((item) => (item.id === updatedPricing.id ? updatedPricing : item))
      );
      setEditingPricing(null);
    } catch (error) {
      console.error('Error updating pricing data:', error);
      setError('Error updating pricing data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setEditingPricing(null);
    setError(null); // Clear any previous errors
  };

  // Handle form field change
  const handleChange = (field: keyof Omit<RidePricing, 'id'>, value: string) => {
    if (editingPricing) {
      const parsedValue = field === 'vehicleType' ? value : parseFloat(value);
      setEditingPricing(prev => ({ ...prev!, [field]: parsedValue }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    if (!editingPricing) return false;
    const { baseKms, baseRateDay, baseRateNight, perKmsDay, perKmsNight } = editingPricing;
    if ([baseKms, baseRateDay, baseRateNight, perKmsDay, perKmsNight].some(val => isNaN(val))) {
      setError('Please ensure all fields are filled with valid numeric values.');
      return false;
    }
    return true;
  };

  // Columns configuration for the table
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

  // Fields configuration for the editable form
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
      {/* Show breadcrumbs if editing */}
      {editingPricing && (
        <BreadcrumbsComponent handleCancel={handleCancel} />
      )}

      {editingPricing ? (
        <div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {pricingFields.map(field => (
            <EditableTextField
              key={field.field}
              label={field.label}
              value={editingPricing[field.field] ?? ''}
              onChange={(e) =>
                handleChange(field.field, e.target.value)
              }
              type={field.type}
            />
          ))}
          <div>
            <button
              onClick={() => {
                if (validateForm()) handleSave(editingPricing);
              }}
              disabled={isSaving}
            >
              Save
            </button>
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

export default IntercityComponent;
