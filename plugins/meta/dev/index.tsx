import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { metaPlugin, MetaPage } from '../src/plugin';

createDevApp()
  .registerPlugin(metaPlugin)
  .addPage({
    element: <MetaPage />,
    title: 'Root Page',
    path: '/meta',
  })
  .render();
