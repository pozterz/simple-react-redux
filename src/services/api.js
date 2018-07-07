import { getLocationOrigin } from './getLocationOrigin'

export const api = (method = 'get', endpoint = '/', body = {}, actions) => {
	return dispatch => {
		const url = `${getLocationOrigin()}/${endpoint}`
    const options = {}
    const headers = {}
		const data = body

		return Promise.resolve(
			dispatch({
				type: 'FETCH_MIDDLEWARE',
				payload: {
					actions,
					url,
					method,
          data,
          headers,
					options
				}
			})
		)
	}
}
