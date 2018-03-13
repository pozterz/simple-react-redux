import {
  createStore,
  applyMiddleware
}                               from 'redux';
import { routerMiddleware }     from 'react-router-redux';
import thunkMiddleware          from 'redux-thunk';
import reducer                  from './reducer/reducers';
import { composeWithDevTools }  from 'redux-devtools-extension';
import { createLogger }         from 'redux-logger';
import createHistory            from 'history/createBrowserHistory';
import fetchMiddleware          from './middleware/fetchMiddleware';

export const history = createHistory();

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
    fetchMiddleware,
    loggerMiddleware
  )
);

export default function configStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('./reducer/reducers', () =>
      store.replaceReducer(require('./reducer/reducers').default)
    );
  }
  return store;
}