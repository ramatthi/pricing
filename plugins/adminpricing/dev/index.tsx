import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { adminpricingPlugin, AdminpricingPage } from '../src/plugin';

createDevApp()
  .registerPlugin(adminpricingPlugin)
  .addPage({
    element: <AdminpricingPage />,
    title: 'Root Page',
    path: '/adminpricing',
  })
  .render();
