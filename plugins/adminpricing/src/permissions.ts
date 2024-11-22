import { createPermission } from '@backstage/plugin-permission-common';

// Permission for viewing the admin pricing
export const adminpricingViewPermission = createPermission({
  name: 'adminpricing.view',
  attributes: {
    action: 'read', // Valid action
  },
  resourceType: 'plugin-adminpricing',
});

// Permission for editing the admin pricing
export const adminpricingEditPermission = createPermission({
  name: 'adminpricing.edit',
  attributes: {
    action: 'update', // Replace 'write' with 'update'
  },
  resourceType: 'plugin-adminpricing',
});
