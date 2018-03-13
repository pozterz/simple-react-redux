// @flow weak

import moment             from 'moment';
import { appConfig }      from '../../config';
import auth               from '../../services/auth';
import { api }                from '../../services/api'

const REQUEST_LOG_USER       = 'REQUEST_LOG_USER';
const RECEIVED_LOG_USER      = 'RECEIVED_LOG_USER';
const ERROR_LOG_USER         = 'ERROR_LOG_USER';

const CHECK_IF_USER_IS_AUTHENTICATED = 'CHECK_IF_USER_IS_AUTHENTICATED';

const DISCONNECT_USER                = 'DISCONNECT_USER';

// REDUCER
const initialState = {
  isFetching:      false,
  isLogging:       false,
  time:            '',

  id:              '',
  email:           '',
  token:           null,
  isAuthenticated: false
};

export default function (
  state = initialState,
  action
) {
  const currentTime = moment().format();

  switch (action.type) {

  case CHECK_IF_USER_IS_AUTHENTICATED:
    return {
      ...state,
      actionTime:      currentTime,
      isAuthenticated: action.isAuthenticated,
      token:           action.token || initialState.token,
      id:              action.user && action.user.id         ? action.user.id:        initialState.id,
      email:           action.user && action.user.email      ? action.user.email:     initialState.email,
    };

  case DISCONNECT_USER:
    return {
      ...state,
      actionTime:      currentTime,
      isAuthenticated: false,
      token:           initialState.token,
      id:              initialState.id,
      email:           initialState.email,
    };

  case REQUEST_LOG_USER:
    return {
      ...state,
      actionTime: currentTime,
      isLogging:  true
    };

  case RECEIVED_LOG_USER:
    const userLogged = action.payload.data.result;
    return {
      ...state,
      actionTime:      currentTime,
      isAuthenticated: true,
      token:           userLogged.token,
      id:              userLogged.id,
      email:           userLogged.email,
      isLogging:       false
    };

  case ERROR_LOG_USER:
    return {
      ...state,
      actionTime:       currentTime,
      isAuthenticated:  false,
      isLogging:        false
    };

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
//

export function disconnectUser() {
  auth.clearAllAppStorage();
  return { type: DISCONNECT_USER };
}

export function checkUserIsConnected() {
  const token           = auth.getToken();
  const user            = auth.decodeToken();
  const isAuthenticated = (token && user) ? true : false;

  return {
    type: CHECK_IF_USER_IS_AUTHENTICATED,
    token,
    ...user,
    isAuthenticated
  };
}

function logUser(
  email, password
) {
  const method      = 'POST';
  const url         = `${appConfig.api.auth}`;
  const data = {
      email,
      password
  }
  const actionTypes = {
    request:  REQUEST_LOG_USER,
    success:  RECEIVED_LOG_USER,
    fail:     ERROR_LOG_USER
  }

  return api(method, url, data, actionTypes)
}
export function logUserIfNeeded({ email, password }) {
  return (dispatch,getState) => {
    if (shouldLogUser(getState())) {
      return dispatch(logUser(email, password));
    }
    return Promise.resolve();
  };
}
function shouldLogUser(state) {
  const isLogging = state.userAuth.isLogging;
  if (isLogging) {
    return false;
  }
  return true;
}

