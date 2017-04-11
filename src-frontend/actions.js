import {
	SET_VISIBILITY_FILTER,
	SET_SEARCH_FILTERS,
	SET_SEARCH_TERMS,
} from './constants/action-types';

export function setVisibilityFilter(filter) {
	return {
		type: SET_VISIBILITY_FILTER,
		filter
	}
}

export const setSearchFilters = (filter) => {
	return {
		type: SET_SEARCH_FILTERS,
		filter
	}
}

export const setSearchTerms = (terms) => {
	return {
		type: SET_SEARCH_TERMS,
		terms
	}
}
