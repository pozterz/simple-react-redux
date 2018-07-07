import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import views from '../actions/views'
import userAuth from '../actions/userAuth'
import { reducer } from 'react-redux-sweetalert'
import gallery from '../actions/gallery'
import { reducer as notificationsReducer } from 'reapop'

export const reducers = {
  views,
	userAuth,
  gallery,
}

export default combineReducers({
	...reducers,
	sweetalert: reducer,
	notifications: notificationsReducer(),
	routing: routerReducer
})
