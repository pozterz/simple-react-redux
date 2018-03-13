import React, {
  Component
}                       from 'react';
import {
  Route,
  Redirect,
  withRouter
}                       from 'react-router-dom';
import auth             from '../../services/auth';

class LogoutRoute extends Component {

  componentDidMount() {
    auth.clearAllAppStorage();
  }

  render() {
    return (
      <Route { ...this.props }>
        <Redirect to={{ pathname: '/login' }} />
      </Route>
    );
  }
}

export default withRouter(LogoutRoute);
