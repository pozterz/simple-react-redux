import decode from 'jwt-decode'
import moment from 'moment'

const TOKEN_KEY = 'token'
const USER_INFO = 'userInfo'

const APP_PERSIST_STORES_TYPES = ['localStorage', 'sessionStorage']

const stringify = JSON.stringify
const parse = JSON.parse

export const auth = {
	getToken(fromStorage = APP_PERSIST_STORES_TYPES[0], tokenKey = TOKEN_KEY) {
		// localStorage:
		if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
			return (localStorage && localStorage.getItem(tokenKey)) || null
		}
		// sessionStorage:
		if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
			return (sessionStorage && sessionStorage.getItem(tokenKey)) || null
		}
		// default:
		return null
	},
	setToken(value = '', toStorage = APP_PERSIST_STORES_TYPES[0], tokenKey = TOKEN_KEY) {
		if (!value || value.length <= 0) {
			return
		}
		// localStorage:
		if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
			if (localStorage) {
				localStorage.setItem(tokenKey, value)
			}
		}
		// sessionStorage:
		if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
			if (sessionStorage) {
				sessionStorage.setItem(tokenKey, value)
			}
		}
	},

	isAuthenticated(fromStorage = APP_PERSIST_STORES_TYPES[0], tokenKey = TOKEN_KEY) {
		return !!this.getToken(fromStorage, tokenKey)
	},

	clearToken(storage = APP_PERSIST_STORES_TYPES[0], tokenKey = TOKEN_KEY) {
		// localStorage:
		if (localStorage && localStorage[tokenKey]) {
			localStorage.removeItem(tokenKey)
			return true
		}
		// sessionStorage:
		if (sessionStorage && sessionStorage[tokenKey]) {
			sessionStorage.removeItem(tokenKey)
			return true
		}

		return false
	},

	getTokenExpirationDate(encodedToken) {
		if (!encodedToken) {
			return new Date(0) // is expired
		}

		const token = decode(encodedToken)
		if (!token.exp) {
			return new Date(0) // is expired
		}

		const expirationDate = new Date(token.exp * 1000)
		return expirationDate
	},

	isExpiredToken(encodedToken) {
		const expirationDate = this.getTokenExpirationDate(encodedToken)
		const rightNow = moment()
		const isExpiredToken = moment(rightNow).isAfter(moment(expirationDate))

		return isExpiredToken
	},

	clearAllAppStorage() {
		if (localStorage) {
			localStorage.clear()
		}
		if (sessionStorage) {
			sessionStorage.clear()
		}
	},

	decodeToken(token) {
		if (token !== null) {
			return decode(token)
		}
		return null
	},

	setUserInfo(value = '', toStorage = APP_PERSIST_STORES_TYPES[0], userInfoKey = USER_INFO) {
		if (!value || value.length <= 0) {
			return
		}
		// localStorage:
		if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
			if (localStorage) {
				localStorage.setItem(userInfoKey, stringify(value))
			}
		}
		// sessionStorage:
		if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
			if (sessionStorage) {
				sessionStorage.setItem(userInfoKey, stringify(value))
			}
		}
	},
	getUserInfo(fromStorage = APP_PERSIST_STORES_TYPES[0], userInfoKey = USER_INFO) {
		if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
			return (localStorage && parse(localStorage.getItem(userInfoKey))) || null
		}
		if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
			return (sessionStorage && parse(sessionStorage.getItem(userInfoKey))) || null
		}
		return null
	}
}
export default auth
