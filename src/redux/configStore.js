import {
  createStore,
  applyMiddleware
}                               from 'redux';
import thunkMiddleware          from 'redux-thunk';
import reducer                  from './reducer/reducers';
import { composeWithDevTools }  from 'redux-devtools-extension';
import { createLogger }         from 'redux-logger';

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
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
