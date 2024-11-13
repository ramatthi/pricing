import React from 'react';
import { Breadcrumbs,  Typography } from '@mui/material';
 
// Define the types for the component's props
interface BreadcrumbsComponentProps {
  handleCancel: () => void;
}
 
// Define the BreadcrumbsComponent functional component
const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({ handleCancel }) => {
  return (
    <div>
       <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '16px' }}>
          <Typography
            color="textPrimary"
            onClick={handleCancel}  
            style={{ cursor: 'pointer' }}  
          >
            View Pricing
          </Typography>
          <Typography color="textPrimary">Edit Pricing</Typography>
        </Breadcrumbs>
    </div>
  );
};
 
export default BreadcrumbsComponent;