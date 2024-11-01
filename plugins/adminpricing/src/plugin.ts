import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const adminpricingPlugin = createPlugin({
  id: 'adminpricing',
  routes: {
    root: rootRouteRef,
  },
});

export const AdminpricingPage = adminpricingPlugin.provide(
  createRoutableExtension({
    name: 'AdminpricingPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
