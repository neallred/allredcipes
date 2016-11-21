import _ from 'lodash'
import {
	HEADER_BUTTON_SELECT
} from '../action-types'

export const defaultStateHeader = {
	buttonSelected: 'login'
};

export const header = (state = defaultStateHeader, action) => {
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
