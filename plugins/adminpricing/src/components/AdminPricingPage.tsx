import React from 'react';
import { RequirePermission, usePermission } from '@backstage/plugin-permission-react';
import { adminpricingViewPermission, adminpricingEditPermission } from '../permissions';

export const AdminPricingPage = () => {
  const { allowed: canEdit } = usePermission({
    permission: adminpricingEditPermission,
    resourceRef: "admin-pricing-resource", // Replace with your valid resource reference
  });

  return (
    <div>
      <h1>Admin Pricing Dashboard</h1>

      {/* Protect a section with the 'view' permission */}
      <RequirePermission
        permission={adminpricingViewPermission}
        resourceRef="admin-pricing-resource" // Replace with your valid resource reference
      >
        <p>This section is visible only to users with view permissions.</p>
      </RequirePermission>

      {/* Protect an edit button */}
      {canEdit && (
        <button onClick={() => alert('You have edit access!')}>Edit Data</button>
      )}
    </div>
  );
};
