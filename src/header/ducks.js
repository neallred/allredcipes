import _ from 'lodash'
import {
	SESSION_CREATE_SUCCESS,

	HEADER_BUTTON_SELECT,
	HEADER_HANDLE_INPUT
} from '../action-types'

export const defaultStateHeader = {
	buttonSelected: 'login',
	username: '',
	password: '',
	passwordConfirm: ''
};

export const header = (state = defaultStateHeader, action) => {
	switch (action.type) {
		case HEADER_BUTTON_SELECT:
			return _.assign({}, state, {buttonSelected: action.value})

		case HEADER_HANDLE_INPUT:
			return _.assign({}, state, {[action.value.inputField]: action.value.input})

		case SESSION_CREATE_SUCCESS:
			return _.assign({}, state, {username: '', password: '', passwordConfirm: ''})

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
