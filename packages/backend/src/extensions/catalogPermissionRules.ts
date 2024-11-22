import { createBackendModule } from '@backstage/backend-plugin-api';
import { catalogPermissionExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import { isInSystemRule } from './permissionsPolicyExtension';

export default createBackendModule({
  pluginId: 'catalog',
  moduleId: 'permission-rules',
  register(reg) {
    reg.registerInit({
      deps: { catalog: catalogPermissionExtensionPoint },
      async init({ catalog }) {
        catalog.addPermissionRules(isInSystemRule);
      },
    });
  },
});