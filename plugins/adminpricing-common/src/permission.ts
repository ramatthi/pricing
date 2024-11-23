import { createPermission } from "@backstage/plugin-permission-common/index";

export const viewPricingPermission = createPermission({
  name: 'adminpricing.view',
  attributes: { action: 'read' },
  resourceType: 'adminpricing',
});

export const editPricingPermission = createPermission({
  name: 'adminpricing.edit',
  attributes: { action: 'update' },
  resourceType: 'adminpricing',
});