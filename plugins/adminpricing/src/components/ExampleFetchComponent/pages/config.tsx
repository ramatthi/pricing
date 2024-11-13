import { TableColumn } from '@backstage/core-components';

// Define the Pricing type here
export type Pricing = {
  id: number;
  minDistance: number;
  maxDistance: number;
  vehicleType: string;
  bookingType: number;
  pricePerKm: number;
  previousTotalPrice: number;
  createdBy: number;
  updatedby: number;
};

export interface PricingConfig {
  pageTitle: string;
  tableColumns: TableColumn<Pricing>[];
  fields: { label: string; name: string; type: string }[];
  breadcrumbs: {
    edit: string
    edit1: string
    add: string
    add1: string
  };
}

export const pricingConfig: PricingConfig = {
  pageTitle: 'Slab Pricing',
  tableColumns: [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'bookingType' },
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price Per km', field: 'pricePerKm' },
    { title: 'Previous Total Price', field: 'previousTotalPrice' },
    { title: 'Created by', field: 'createdBy' },
    { title: 'Updated by', field: 'updatedby' },
    {
      title: 'Actions',
      field: 'actions',
    },
  ],
  fields: [
    { label: 'Booking Type', name: 'bookingType', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicleType', type: 'text' },
    { label: 'Min Distance', name: 'minDistance', type: 'number' },
    { label: 'Max Distance', name: 'maxDistance', type: 'number' },
    { label: 'Price Per km', name: 'pricePerKm', type: 'number' },
    { label: 'Previous Total Price', name: 'previousTotalPrice', type: 'number' },
    { label: 'Created by', name: 'createdBy', type: 'number' },
    { label: 'Updated by', name: 'updatedby', type: 'number' },
  ],
  breadcrumbs: {
    edit: 'Slab Pricing',
    edit1: 'Edit Slab Pricing',
    add: 'Slab Pricing',
    add1: 'Add Slab Pricing',
  },
};
