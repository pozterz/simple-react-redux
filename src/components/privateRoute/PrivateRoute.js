import React, {
  Component
}                         from 'react';
import {
  Route,
  Redirect,
  withRouter
}                         from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

class PrivateRoute extends Component {
  
  render() {
    const {
      isAuthenticated,
      component: InnerComponent,
      ...rest
    } = this.props;
    const { location } = this.props;

    return (
      <Route
        {...rest}
        render={
          props => (
            isAuthenticated
              ? <InnerComponent {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )
        }
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userAuth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
    },
    dispatch
  )
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PrivateRoute)