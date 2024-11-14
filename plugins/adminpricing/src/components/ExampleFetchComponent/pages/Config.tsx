import { TableColumn } from '@backstage/core-components';


export type Pricing = {
  id: number;
  minDistance: number;
  maxDistance: number;
  vehicleType: string;
  bookingType: number;
  pricePerKm: number;
  previousTotalPrice: number;
  createdBy: number;
  updatedBy: number; 
};

export interface PricingConfig {
  pageTitle: string;
  tableColumns: TableColumn<Pricing>[]; 
  fields: { label: string; name: string; type: string }[]; 
 
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
    { title: 'Updated by', field: 'updatedBy' },
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
    { label: 'Updated by', name: 'updatedBy', type: 'number' },
  ],
 
};


export type FlatPricing = {
  id: number;
  bookingType: string;
  vehicleType: string;
  minDistance: number;
  maxDistance: number;
  price: number;
  previousPrice: number;
  isActive: string;
  approvedBy: string;
  createdBy: number;
  updatedBy: number; 
};

export interface FlatPricingConfig {
  pageTitle: string;
  tableColumns: TableColumn<FlatPricing>[];  
  fields: { label: string; name: string; type: string }[];  
  
}

export const flatPricingConfig: FlatPricingConfig = {
  pageTitle: 'Flat Pricing',
  tableColumns: [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'bookingType' },
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price', field: 'price' },
    { title: 'Previous Price', field: 'previousPrice' },
    { title: 'Active', field: 'isActive' },
    { title: 'Approved By', field: 'approvedBy' },
    { title: 'Created by', field: 'createdBy' },
    { title: 'Updated by', field: 'updatedBy' },
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
    { label: 'Price', name: 'price', type: 'number' },
    { label: 'Previous Price', name: 'previousPrice', type: 'number' },
    { label: 'Created by', name: 'createdBy', type: 'number' },
    { label: 'Updated by', name: 'updatedBy', type: 'number' },
  ],
 
};
