import _ from 'lodash'
import {
	SESSION_LOGIN_REQUEST,
	SESSION_LOGIN_SUCCESS,
	SESSION_LOGIN_FAILURE,

	SESSION_CHECK_STATUS_REQUEST,
	SESSION_CHECK_STATUS_SUCCESS,
	SESSION_CHECK_STATUS_FAILURE,

	SESSION_LOGOUT_REQUEST,
	SESSION_LOGOUT_SUCCESS,
	SESSION_LOGOUT_FAILURE
} from '../constants/action-types'

const defaultState = {
	isLoggedIn: false,
	buttonSelected: 'login'
};

export const session = (state = defaultState, action) => {
	switch (action.type) {
		case SESSION_LOGIN_SUCCESS:
			return _.assign({}, state, {isLoggedIn: true})
		case SESSION_LOGOUT_SUCCESS:
			return _.assign({}, state, {isLoggedIn: false})
		case SESSION_CHECK_STATUS_SUCCESS:
			return _.assign({}, state, {isLoggedIn: true})

		default:
			return state
	}
}

export const sessionCheckStatus = () => {
	return {
		type: SESSION_CHECK_STATUS_REQUEST
	}
}

export const sessionLogin = (requestObj) => {
	return {
		type: SESSION_LOGIN_REQUEST,
		value: requestObj
	}
}

export const sessionLogout = () => {
	return {
		type: SESSION_LOGOUT_REQUEST
	}
}
