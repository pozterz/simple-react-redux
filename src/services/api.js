import { getLocationOrigin }    from './getLocationOrigin';

export const api = (method = 'get', endpoint = '/', body = {}, actionTypes) => {
  return dispatch => {
    const fetchType       = 'FETCH';
    
    const url     = `${getLocationOrigin()}/${endpoint}`;
    const options = {};
    const data = body;

    return Promise.resolve(
      dispatch({
        type: 'FETCH_MIDDLEWARE',
        fetch: {
          type: fetchType,
          actionTypes,
          url,
          data,
          method,
          options
        }
      })
    );
  }
};
