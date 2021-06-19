import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TestFormComponent from '../Components/test_form/TestFormComponent';
import TestPageComponent from '../Components/test_page/TestPageComponent';

const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <Switch>
      <Route exact path='/'>
        <TestFormComponent />
      </Route>
      <Route exact path='/main'>
        <TestPageComponent />
      </Route>
     
      <Route path='/'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default AppRoutes;