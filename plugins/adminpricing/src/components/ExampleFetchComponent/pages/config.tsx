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
    { title: 'Approved By', field: 'approvedBy' },
    { title: 'Created by', field: 'createdBy' },
    { title: 'Updated by', field: 'updatedBy' },
  
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

export type HourlyPricing = {
  id: number;
  booking_type: string;
  vehicle_type: string;
  hours: number;
  kilometers: number;
  price: number;
  approvedBy: number;
};

export interface HourlyPricingConfig {
  pageTitle: string;
  tableColumns: TableColumn<HourlyPricing>[];  
  fields: { label: string; name: string; type: string }[];  
  
}
export const hourlyPricingConfig: HourlyPricingConfig = {
  pageTitle: 'Hourly Pricing',
  tableColumns: [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'booking_type' },
    { title: 'Vehicle Type ID', field: 'vehicle_type_id' },
    { title: 'Hours', field: 'hours' },
    { title: 'Kilometers', field: 'kilometers' },
    { title: 'Price', field: 'price' },
    { title: 'Approved By', field: 'approvedBy' },
  ],
  fields: [
     { label: 'Booking Type', name: 'booking_type', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicle_type', type: 'text' },
    { label: 'Hours', name: 'hours', type: 'number' },
    { label: 'Kilometers', name: 'kilometers', type: 'number' },
    { label: 'Price', name: 'price', type: 'number' },
    { label: 'Approved By', name: 'approvedBy', type: 'number' }
  ],
 
};

export type IntercityPricing = {
  id: number;
  booking_type: string;
  vehicle_type: string;
  minDistance: number;
  maxDistance: number;
  price_per_km: number;
  previous_range_cap: number;
  createdby :number
};

export interface IntercityPricingConfig {
  pageTitle: string;
  tableColumns: TableColumn<IntercityPricing>[];  
  fields: { label: string; name: string; type: string }[];  
  
}
export const intercityPricingConfig: IntercityPricingConfig = {
  pageTitle: 'Intercity Pricing',
  tableColumns: [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'booking_type' },
    { title: 'Vehicle Type', field: 'vehicle_type' },
    { title: 'Min Distance', field: 'minDistance' },
    { title: 'Max Distance', field: 'maxDistance' },
    { title: 'Price Per Km', field: 'price_per_km' },
    { title: 'Pre Range cap', field: 'previous_range_cap' },
    { title: 'Created By', field: 'createdby' },
  ],
  fields: [
    { label: 'Booking Type', name: 'booking_type', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicle_type', type: 'text' },
    { label: 'Min Distance', name: 'minDistance', type: 'number' },
    { label: 'Max Distance', name: 'maxDistance', type: 'number' },
    { label: 'Price Per Km', name: 'price_per_km', type: 'number' },
    { label: 'Previous Range cap', name: 'previous_range_cap', type: 'number' },
  ],
 
};

export type DynamicPricing = {
  id: number;
  bookingType: string;
  vehicleType: string;
  basePricePerKm: number;
  intervalChangeKm: number;
  incrementInPrice: number;
  decrementInPrice: number;
  maxCap: number;
  minCap: number;
};

export interface DynamicPricingConfig {
  pageTitle: string;
  tableColumns: TableColumn<DynamicPricing>[];  
  fields: { label: string; name: string; type: string }[];  
  
}
export const dynamicPricingConfig: DynamicPricingConfig = {
  pageTitle: 'Intercity Pricing',
  tableColumns: [
    { title: 'ID', field: 'id' },
    { title: 'Booking Type', field: 'bookingType' },
    { title: 'Vehicle Type', field: 'vehicleType' },
    { title: 'Base Price', field: 'basePricePerKm' },
    { title: 'Interval Change', field: 'intervalChangeKm' },
    { title: 'Increment In Price', field: 'incrementInPrice' },
    { title: 'Decrement In Price', field: 'decrementInPrice' },
    { title: 'Max Cap', field: 'maxCap' },
    { title: 'Min Cap', field: 'minCap' },
  ],
  fields: [
    { label: 'Booking Type', name: 'bookingType', type: 'text' },
    { label: 'Vehicle Type', name: 'vehicleType', type: 'text' },
    { label: 'Base Price Per Km', name: 'basePricePerKm', type: 'number' },
    { label: 'Interval Change Km', name: 'intervalChangeKm', type: 'number' },
    { label: 'Increment in Price', name: 'incrementInPrice', type: 'number' },
    { label: 'Decrement in Price', name: 'decrementInPrice', type: 'number' },
    { label: 'Max Cap', name: 'maxCap', type: 'number' },
    { label: 'Min Cap', name: 'minCap', type: 'number' }
  ],
 
};

