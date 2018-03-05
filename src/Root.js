import React, { Component } from 'react';
import { Provider }             from 'react-redux';
import configStore           from './redux/configStore';
import App                      from './App';

const store = configStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
