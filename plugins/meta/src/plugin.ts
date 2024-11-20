import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const metaPlugin = createPlugin({
  id: 'meta',
  routes: {
    root: rootRouteRef,
  },
});

export const MetaPage = metaPlugin.provide(
  createRoutableExtension({
    name: 'MetaPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
