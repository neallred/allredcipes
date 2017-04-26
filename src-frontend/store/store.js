import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'

import union from 'lodash.union'

//DUCKS
import { session } from '../session/ducks'
import { header } from '../header/ducks'
import recipes from '../recipe-list/ducks'


import { searchReducer as search } from '../search/ducks'

//CONSTANTS
import {
	RECIPES_SUCCESS,

	RECIPE_CREATE_SUCCESS,

	RECIPE_UPDATE_SUCCESS,

	RECIPE_DELETE_SUCCESS,

	CREATE_RECIPE,

	TOGGLE_RECIPE,
	IS_EDITING,

	SEARCH_BY_CONTRIBUTOR,
	SEARCH_BY_NAME,
	SEARCH_BY_INGREDIENTS,
	SEARCH_BY_INSTRUCTIONS,

	SET_VISIBILITY_FILTER,
	SET_SEARCH_FILTERS,
	SET_SEARCH_TERMS,

	SHOW_ALL
} from '../constants/action-types'

const visibilityFilter = (state = SHOW_ALL, action) => {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return state
	}
}


const setSearchFilters = (state = [], action) => {
	switch (action.filter) {
		//Intentional fall through
		case 'BY_ALL':
		case 'BY_NAME':
		case 'BY_INGREDIENTS':
		case 'BY_INSTRUCTIONS':
		case 'BY_AUTHOR':
			if(state.indexOf(action.filter) === -1){
				return [...state, action.filter]
			} else {
				let filterToRemoveIndex = state.indexOf(action.filter)
				return [
					...state.slice(0, filterToRemoveIndex),
					...state.slice(filterToRemoveIndex + 1)
				]
			}
		default:
			return state
	}
}

const setSearchTerms = (state = [], action) => {
	switch (action.type) {
		case SET_SEARCH_TERMS:
			return action.terms.toLowerCase().split(' ')
		default:
			return state
	}
}


const reducers = combineReducers({
	recipes,
	header,
	search,
	session,
	setSearchFilters,
	setSearchTerms,
	visibilityFilter
})


const initialState = {} 
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducers,
  initialState,
	applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export { store }
