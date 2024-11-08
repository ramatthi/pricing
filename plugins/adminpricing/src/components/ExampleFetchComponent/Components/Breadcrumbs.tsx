import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';


interface BreadcrumbsComponentProps {
  handleCancel: () => void;
  breadcrumblabels:[string,string];
}




const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({ handleCancel,breadcrumblabels }) => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={handleCancel}>
          {breadcrumblabels[0]};
        </Link>
        <Typography color="textPrimary">{breadcrumblabels[1]}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
