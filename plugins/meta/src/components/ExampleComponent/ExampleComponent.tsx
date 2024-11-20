import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
 
} from '@backstage/core-components';
import { IframeComponent } from '../ExampleFetchComponent';



export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to Meta Dashboard!" subtitle=""
    style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000, width: '100%', color: 'red'  }}
    > 
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
         <IframeComponent/>
        </Grid>
      </Grid>
    </Content>
  </Page>
);
