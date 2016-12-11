import _ from 'lodash'
import {
	SEARCH_BY_CONTRIBUTOR,
	SEARCH_BY_INGREDIENTS,
	SEARCH_BY_INSTRUCTIONS,
	SEARCH_BY_NAME
} from '../constants/action-types'

export const defaultState = {
	//key values can be false, true, or ['v', 'a', 'l', 'u', 'e', 's']
	SEARCH_BY_CONTRIBUTOR: false,
	SEARCH_BY_INGREDIENTS: false,
	SEARCH_BY_INSTRUCTIONS: false,
	SEARCH_BY_NAME: false 
}

export const search = (state = defaultState, action) => {
	const {type, value} = action
	switch (action.type) {
		// Fallthrough is deliberate
		case SEARCH_BY_CONTRIBUTOR:
		case SEARCH_BY_INGREDIENTS:
		case SEARCH_BY_INSTRUCTIONS:
		case SEARCH_BY_NAME:
			if (value === 'string') {
				return _.assign({}, state, {type: value})
			}
			else {
				return _.assign({}, state, {type: value})
			}

		default:
			return state
	}
}

export const searchToggle = (type, value) => { return { type, value } }
export const searchHandleText = (type, value) => { return { type, value } }
