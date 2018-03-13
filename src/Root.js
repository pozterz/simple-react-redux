import React, { Component } from 'react'
import { ConnectedRouter }  from 'react-router-redux'
import { Provider }         from 'react-redux'
import configStore          from './redux/configStore'
import { history }          from './redux/configStore'
import App                      from './containers/App';
import {
  Switch,
  Route
}                           from 'react-router-dom';
import Login                from './views/Login/Login';
import LogoutRoute              from './components/logoutRoute/LogoutRoute'
import 'bootstrap/dist/css/bootstrap.css';

const store = configStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <LogoutRoute exact path="/logout" />
              <App />
            </Switch>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default Root;
