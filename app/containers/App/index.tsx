/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';

import GlobalStyle from '../../global-styles';
import DashboardLayout from '../../components/DashboardLayout';
import UserPage from 'containers/UserPage';
import UserManager from '../UserPage/UserManager';
import WebContent from '../WebContentPage';
import ContainerPage from '../ContainerPage/Loadable';
import WebContentForm from '../WebContentPage/FormContent';
import { LoginPage } from '../LoginForm';

const AppWrapper = styled.div.attrs({ id: 'dashboard-layout' })`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - K.R. Express"
        defaultTitle="K.R. Express"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <DashboardLayout>
          <Route exact path="/containers" component={ContainerPage} />
          <Route exact path="/users" component={UserPage} />
          <Route exact path="/users/manage/:objectId" component={UserManager} />
          <Route exact path="/page-content" component={WebContent} />
          <Route exact path="/page-content/form" component={WebContentForm} />
          <Route exact path="/page-content/form/:objectId" component={WebContentForm} />
        </DashboardLayout>
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
