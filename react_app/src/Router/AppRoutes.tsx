import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CreateRequestFormComponent from '../Components/forms/create_request_form/CreateRequestFormComponent';
import TestFormComponent from '../Components/forms/test_form/TestFormComponent';
import HomePageComponent from '../Components/pages/home_page/HomePageComponent';

const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <Switch>
      <Route exact path='/'>
        <TestFormComponent />
      </Route>
      <Route exact path='/main'>
        <HomePageComponent />
      </Route>
      <Route exact path='/main/createRequest'>
        <CreateRequestFormComponent />
      </Route>
      {/* <Route path='/'>
        <Redirect to='/' />
      </Route> */}
    </Switch>
  );
};

export default AppRoutes;