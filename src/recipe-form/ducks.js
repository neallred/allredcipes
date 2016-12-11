import _ from 'lodash'
import {
	SESSION_LOGIN_SUCCESS,
	SESSION_LOGOUT_SUCCESS,
	SESSION_CHECK_STATUS_SUCCESS,

	HEADER_BUTTON_SELECT,
	HEADER_HANDLE_INPUT
} from '../constants/action-types'

export const defaultState = {
	buttonSelected: 'login',
	email: '',
	username: '',
	password: '',
	passwordConfirm: ''
};

export const recipeFormReducer = (state = defaultState, action) => {
	switch (action.type) {
		case HEADER_BUTTON_SELECT:
			return _.assign({}, state, {buttonSelected: action.value})

		default:
			return state
	}
}

export const headerButtonSelect = (value) => {
	return {
		type: HEADER_BUTTON_SELECT,
		value
	}
}

export const headerHandleInput = (dataObject) => {
	return {
		type: HEADER_HANDLE_INPUT,
		value: dataObject
	}
}

