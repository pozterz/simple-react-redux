import React            from 'react';
import {
  Route,
  Switch
 }                      from 'react-router';
import PrivateRoute     from '../components/privateRoute/PrivateRoute';
import Home             from '../views/Home/Home';
import Gallery          from '../views/Gallery/Gallery'
import NotFound         from '../views/NotFoundPage/NotFound';

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/gallery" component={Gallery} />
      {/* <PrivateRoute exact path="/gallery" component={Gallery} /> */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default MainRoutes;
