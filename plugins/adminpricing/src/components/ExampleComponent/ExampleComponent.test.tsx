import React from 'react';
import { ExampleComponent } from './ExampleComponent';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import {
  registerMswTestHooks,
  renderInTestApp,
} from '@backstage/test-utils';

describe('ExampleComponent', () => {
  const server = setupServer();
  
  // Enable sane handlers for network requests
  registerMswTestHooks(server);

  // Setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render the page header', async () => {
    await renderInTestApp(<ExampleComponent />);
    
    // Check if the main title of the page is rendered
    expect(screen.getByText('Welcome to adminpricing!')).toBeInTheDocument();
    
    // Check if the subtitle is not rendered (based on the current code)
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  it('should render ExampleFetchComponent', async () => {
    await renderInTestApp(<ExampleComponent />);
    
    // Check if the ExampleFetchComponent is rendered inside the grid
    expect(screen.getByTestId('example-fetch-component')).toBeInTheDocument();
  });

  // If you decide to include the InfoCard or ContentHeader later on, you can test for it like this:
  // it('should render the InfoCard', async () => {
  //   await renderInTestApp(<ExampleComponent />);
  //   expect(screen.getByText('Information card')).toBeInTheDocument();
  // });

});
