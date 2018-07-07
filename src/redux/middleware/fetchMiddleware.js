import axios from 'axios'
import auth from '../../services/auth'

import { FETCH_MIDDLEWARE } from '../../config/constant'
import * as _ from 'lodash'
import { notify } from 'reapop'

const noti = (message, type = 'error') => ({
	title: _.startCase(type),
	message: message,
	status: type,
	dismissible: true,
	dismissAfter: 5000
})

const fetchMiddleware = store => next => action => {
	if (action.type !== FETCH_MIDDLEWARE) {
		return next(action)
	}

	const {
		actions: { request, success, fail },
		url,
		method,
		data,
		headers,
		options
	} = action.payload

	store.dispatch({ type: request })

	let api = axios.create({
		baseURL: url
	})

	api.interceptors.request.use(config => {
		let token = auth.getToken()
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	})

	const queryName = method === 'GET' ? 'params' : 'data'

	return api
		.request({
			method,
			url,
			[queryName]: data,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...headers
			},
			...options
		})
		.then(data => {
      if (_.has(data, 'response.data.result.message')) {
        const {
          data: {
            result: { message }
          }
        } = data
        if (message) {
          store.dispatch(notify(noti(message, 'success')))
        }
      }
			return store.dispatch({ type: success, payload: data })
		})
		.catch(err => {
			if (_.has(err, 'response.data.result.message')) {
				console.log(err.message)
				const {
					response: {
						data: {
							result: { message }
						}
					}
				} = err
				store.dispatch(notify(noti(message, 'error')))
			} else if (_.has(err, 'response.data.message')) {
				console.log(err.message)
				const {
					response: {
						data: { message }
					}
				} = err
				store.dispatch(notify(noti(message, 'error')))
			} else {
				store.dispatch(notify(noti('Internal Error', 'error')))
			}
			store.dispatch({ type: fail, error: err })
			console.log('Error catched!', err)
			return Promise.reject(err)
		})
}

export default fetchMiddleware
