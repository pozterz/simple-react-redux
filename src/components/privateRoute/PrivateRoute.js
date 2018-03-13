import React, {
  Component
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  Route,
  Redirect,
  withRouter
}                         from "react-router-dom";
import auth               from '../../services/auth';

class PrivateRoute extends Component {
  static propTypes = {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    component:  PropTypes.any.isRequired,
    path:       PropTypes.string
  };

  render() {
    const {
      component: InnerComponent,
      ...rest
    } = this.props;
    const { location } = this.props;
    
    const isUserAuthenticated = this.isAuthenticated();
    const isTokenExpired      = this.isExpired();
    return (
      <Route
        {...rest}
        render={
          props => (
            !isTokenExpired && isUserAuthenticated
              ? <InnerComponent {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )
        }
      />
    );
  }

  isAuthenticated() {
    const dec = auth.decodeToken()
    const userId = dec !== undefined ? dec.data.adminId : false || false;
    const isAuthenticated = auth.getToken() && userId ? true : false;
    return isAuthenticated;
  }

  isExpired() {
    return auth.isExpiredToken(auth.getToken());
  }
}

export default withRouter(PrivateRoute);
