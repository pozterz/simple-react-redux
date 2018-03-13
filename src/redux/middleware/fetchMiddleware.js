import axios  from 'axios';

export const FETCH      = 'FETCH';

const fetchMiddleware = store => next => action => {
  if (!action.fetch) {
    return next(action);
  }

  if (!action.fetch.type || !action.fetch.type === FETCH) {
    return next(action);
  }

  if (!action.fetch.actionTypes) {
    return next(action);
  }

  if (action.fetch.type === FETCH) {
    const {
      actionTypes: {request, success, fail},
      url,
      method,
      data,
      headers,
      options
    } = action.fetch;

    store.dispatch({ type: request });
    
    return axios.request({
      method,
      url,
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      ...options
    })
      .then(data => store.dispatch({type: success, payload: data}))
      .catch(
        err => {
          console.log(err)
          store.dispatch({type: fail, error: err});
          return Promise.reject(err);
        }
      );
  }
  return next(action);
};

export default fetchMiddleware;
