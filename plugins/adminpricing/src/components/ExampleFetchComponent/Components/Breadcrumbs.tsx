import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

// Define the types for the component's props
interface BreadcrumbsComponentProps {
  handleCancel: () => void;
}

// Define the BreadcrumbsComponent functional component
const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({ handleCancel }) => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={handleCancel}>
          Slab Pricing
        </Link>
        <Typography color="textPrimary">Edit Slab Pricing</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
