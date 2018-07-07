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
import ReduxSweetAlert from 'react-redux-sweetalert'
import NotificationsSystem from 'reapop'
import theme from 'reapop-theme-wybo'

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
          <ReduxSweetAlert />
					<NotificationsSystem theme={theme} />
        </div>
      </Provider>
    );
  }
}

export default Root;
