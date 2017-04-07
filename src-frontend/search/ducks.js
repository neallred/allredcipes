import {
	SEARCH_CONTRIBUTOR,
	SEARCH_INGREDIENTS,
	SEARCH_INSTRUCTIONS,
	SEARCH_NAME
} from '../constants/action-types'

export const defaultState = {
	//key values can be false, true, or ['v', 'a', 'l', 'u', 'e', 's']
	SEARCH_CONTRIBUTOR: false,
	SEARCH_INGREDIENTS: false,
	SEARCH_INSTRUCTIONS: false,
	SEARCH_NAME: false 
}

export const searchReducer = (state = defaultState, action) => {
	const {type, value} = action
	switch (action.type) {
		// Fallthrough is deliberate;
		case SEARCH_CONTRIBUTOR:
		case SEARCH_INGREDIENTS:
		case SEARCH_INSTRUCTIONS:
		case SEARCH_NAME:
			if (typeof value === 'string') {
				const searchTerms = value.split(' ')
				return Object.assign({}, state, {[type]: searchTerms})
			}
			else {
				return Object.assign({}, state, {[type]: !value})
			}

		default:
			return state
	}
}

export const searchToggle = (type, value) => { return { type, value } }
export const searchHandleText = (type, value) => { return { type, value } }
