import {
	SESSION_LOGIN_SUCCESS,
	SESSION_LOGOUT_SUCCESS,
	SESSION_CHECK_STATUS_SUCCESS,

	HEADER_BUTTON_SELECT,
	HEADER_HANDLE_INPUT,
	HEADER_MEASURE_HEIGHT 
} from '../constants/action-types'

export const defaultStateHeader = {
	buttonSelected: 'login',
	headerHeight: 0,
	email: '',
	username: '',
	password: '',
	passwordConfirm: ''
}

export const header = (state = defaultStateHeader, action) => {
	switch (action.type) {
		case HEADER_BUTTON_SELECT:
			return Object.assign({}, state, {buttonSelected: action.value})

		case HEADER_HANDLE_INPUT:
			return Object.assign({}, state, {[action.value.inputField]: action.value.input})

		case HEADER_MEASURE_HEIGHT:
			return Object.assign({}, state, {headerHeight: action.value})

		case SESSION_LOGIN_SUCCESS:
			return Object.assign({}, state, defaultStateHeader)

		case SESSION_LOGOUT_SUCCESS:
			return Object.assign({}, state, defaultStateHeader)

		case SESSION_CHECK_STATUS_SUCCESS:
			return Object.assign({}, state, defaultStateHeader)

		default:
			return state
	}
}

export const headerButtonSelect = value => {
	return {
		type: HEADER_BUTTON_SELECT,
		value
	}
}

export const headerHandleInput = dataObject => {
	return {
		type: HEADER_HANDLE_INPUT,
		value: dataObject
	}
}

export const headerMeasureHeight = value => {
	return {
		type: HEADER_MEASURE_HEIGHT,
		value
	}
}
