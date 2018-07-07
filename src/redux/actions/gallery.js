import { appConfig } from '../../config'
import { api } from '../../services/api'
import { 
  REQUEST_PHOTO_FETCH,
  RECEIVED_PHOTO_FETCH,
  ERROR_PHOTO_FETCH
} from '../../config/constant'

const initialState = {
  data: [],
  error: {},
  isLoading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PHOTO_FETCH:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVED_PHOTO_FETCH:
      return {
        ...state,
        isLoading: false,
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

  const actionTypes = {
    request:  REQUEST_PHOTO_FETCH,
    success:  RECEIVED_PHOTO_FETCH,
    fail:     ERROR_PHOTO_FETCH
  }

  return api(method, path, {}, actionTypes)
}
