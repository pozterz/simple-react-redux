import { combineReducers }  from 'redux';
import github             from '../actions/github';

export const reducers = {
  repos: github
};

export default combineReducers({
  ...reducers,
});
