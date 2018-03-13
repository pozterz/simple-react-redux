import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import gallery             from '../actions/gallery';
import views             from '../actions/views';
import userAuth             from '../actions/userAuth';

export const reducers = {
  gallery,
  userAuth,
  views
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
