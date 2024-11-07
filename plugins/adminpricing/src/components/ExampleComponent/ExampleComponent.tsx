import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components'; 
import { ExampleFetchComponent } from '../ExampleFetchComponent';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header 
    title="Welcome to adminpricing!" 
    subtitle="" 
    style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000, width: '100%' }}>
    </Header>
    <Content>
      {/* <ContentHeader title="Pricing">
      </ContentHeader> */}
      <Grid container direction="column">
        {/* <Grid item>
          <InfoCard title="Information card">
            <Typography variant="body1">
              All content should be wrapped in a card like this.
            </Typography>
          </InfoCard>
        </Grid> */}
        <Grid item>
          <ExampleFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
