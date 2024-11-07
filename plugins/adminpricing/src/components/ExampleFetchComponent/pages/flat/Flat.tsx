import React, { useEffect, useState } from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import EditPricing from './FlatEdit';
import BreadcrumbsComponent from '../components/BreadCrumbs';

type RidePricing = {
  id: number;
  bookingTypeId: number;         
  vehicleTypeId: number;         
  minDistance: number;           
  maxDistance: number;           
  price: number;                 
  previousPrice: number;         
  isActive: boolean;             
  isApproved: boolean;           
  approvedBy: number;          
  createdBy: number;            
  updatedBy: number;          
};


const FlatComponent: React.FC = () => {
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
    { title: 'Vehicle Id', field: 'id' },
    { title: 'Booking Type Id', field: 'bookingTypeId' },
    { title: 'Vehicle Type Id', field: 'vehicleTypeId' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price', field: 'price' },
    { title: 'Previous Price', field: 'previousPrice' },
    { title: 'Is Active', field: 'isActive' },
    { title: 'Is Approved', field: 'isApproved' },
    { title: 'Approved By', field: 'approvedBy' },
    { title: 'Created By', field: 'createdBy' },
    { title: 'Updated By', field: 'updatedBy' },        
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
      {editingPricing && (
        <BreadcrumbsComponent handleCancel={handleCancel}/> 
      )}
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

export default FlatComponent;
