// @flow weak

import moment from 'moment'
import { appConfig } from '../../config'
import auth from '../../services/auth'
import { api } from '../../services/api'

import { CHECK_IF_AUTHENTICATED, DISCONNECT_USER, REQUEST_LOG_USER, RECEIVED_LOG_USER, ERROR_LOG_USER } from '../../config/constant'

// REDUCER
const initialState = {
  isLoading: false,
  actionTime: '',

  token: null,
  user: null,
  isAuthenticated: false
}

export default function(state = initialState, action) {
  const currentTime = moment().format()
  const { token, user, isAuthenticated } = initialState
  switch (action.type) {
    case CHECK_IF_AUTHENTICATED:
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated: action.isAuthenticated || isAuthenticated,
        token: action.token || token,
        user: action.user || user,
        isLoading: false
      }

    case DISCONNECT_USER:
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated,
        token,
        user,
        isLoading: false
      }

    case REQUEST_LOG_USER:
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated,
        token,
        user,
        isLoading: true
      }

    case RECEIVED_LOG_USER:
      const userLogged = action.payload.data.result
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated,
        token: userLogged.token,
        user,
        isLoading: false
      }

    case ERROR_LOG_USER:
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated,
        token,
        user,
        isLoading: false
      }

    default:
      return state
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
//

export function disconnectUser() {
  auth.clearAllAppStorage()
  return { type: DISCONNECT_USER }
}

export function checkIfAuthenticated(token = null) {
  if (!token) {
    token = auth.getToken()
  }

  let user = auth.decodeToken(token)
  if (auth.isExpiredToken(token)) {
    user = null
  }

  const isAuthenticated = !!(token && user)

  return {
    type: CHECK_IF_AUTHENTICATED,
    token,
    user,
    isAuthenticated
  }
}

export function logUser(username, password) {
  const method = 'POST'
  const url = `${appConfig.api.auth}`
  const data = {
    username,
    password
  }
  const actions = {
    request: REQUEST_LOG_USER,
    success: RECEIVED_LOG_USER,
    fail: ERROR_LOG_USER
  }

  return api(method, url, data, actions)
}
