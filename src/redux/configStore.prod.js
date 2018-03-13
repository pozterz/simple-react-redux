import {
  createStore,
  applyMiddleware
}                               from 'redux';
import { routerMiddleware }     from 'react-router-redux';
import thunkMiddleware          from 'redux-thunk';
import reducer                  from './reducer/reducers';
import createHistory            from 'history/createBrowserHistory';
import fetchMiddleware          from './middleware/fetchMiddleware';

export const history = createHistory();

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
    fetchMiddleware
  )
);

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer);
}
