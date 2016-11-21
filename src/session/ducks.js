import _ from 'lodash'
import {
	SESSION_CREATE_REQUEST,
	SESSION_CREATE_SUCCESS,
	SESSION_CREATE_FAILURE,

	SESSION_DELETE_REQUEST,
	SESSION_DELETE_SUCCESS,
	SESSION_DELETE_FAILURE
} from '../action-types'

const defaultState = {
	isLoggedIn: false,
	buttonSelected: 'login'
};

export const session = (state = defaultState, action) => {
	switch (action.type) {
		case SESSION_CREATE_SUCCESS:
			return _.assign({}, state, {isLoggedIn: true})
		case SESSION_DELETE_SUCCESS:
			return _.assign({}, state, {isLoggedIn: false})

		default:
			return state
	}
}

export const createSession = (username, password) => {
	return {
		type: SESSION_CREATE_REQUEST,
		username,
		password
	}
}

export const deleteSession = () => {
	return {
		type: SESSION_DELETE_REQUEST
	}
}
