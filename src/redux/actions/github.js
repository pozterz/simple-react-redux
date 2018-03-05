import axios from 'axios'

const REQUEST_REPO_FETCH  = 'REQUEST_REPO_FETCH';
const RECEIVED_REPO_FETCH = 'RECEIVED_REPO_FETCH';
const ERROR_REPO_FETCH    = 'ERROR_REPO_FETCH';


const initialState = {
  data: [],
  error: {},
  isFetching: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_REPO_FETCH:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVED_REPO_FETCH:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data
      }
      
    case ERROR_REPO_FETCH:
      return {
        ...state,
        error: {}
      }
      
    default: return state
  }
}

export function getRepos() {
  return async dispatch => {
    dispatch(getReposRequest())
    dispatch(await fetch())
  }
}

function getReposRequest() {
  return {
    type: REQUEST_REPO_FETCH
  }
}

function fetch(){
  const url = 'https://api.github.com/users/pozterz/repos'
  return axios.get(url)
    .then(data => {
      return {
        type: RECEIVED_REPO_FETCH,
        payload: data
      }
    })
    .catch(err => {
      return {

        type: ERROR_REPO_FETCH,
        error: err
      }
    })
}