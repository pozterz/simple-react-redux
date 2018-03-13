import { appConfig } from '../../config'
import { api } from '../../services/api'

// Reducer
const REQUEST_PHOTO_FETCH  = 'REQUEST_PHOTO_FETCH';
const RECEIVED_PHOTO_FETCH = 'RECEIVED_PHOTO_FETCH';
const ERROR_PHOTO_FETCH    = 'ERROR_PHOTO_FETCH';

const actionTypes = {
  request:  REQUEST_PHOTO_FETCH,
  success:  RECEIVED_PHOTO_FETCH,
  fail:     ERROR_PHOTO_FETCH
}

const initialState = {
  data: [],
  error: {},
  isFetching: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PHOTO_FETCH:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVED_PHOTO_FETCH:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data
      }
      
    case ERROR_PHOTO_FETCH:
      return {
        ...state,
        error: {}
      }
      
    default: return state
  }
}

// Action Creator 

export function getPhotoList() {
  const method = 'GET'
  const path = appConfig.api.photos
  return api(method, path, {}, actionTypes)
}
