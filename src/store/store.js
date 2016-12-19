import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'

import _ from 'lodash'

//DUCKS
import { session } from '../session/ducks'
import { header } from '../header/ducks'
import { recipeFormReducer as recipeForm } from '../recipe-form/ducks'
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

const recipe = (state = {}, action) => {
	switch (action.type) {
		case RECIPE_UPDATE_SUCCESS:
			if (state.id !== action.recipe.id) {
				return state
			}
			return _.assign({}, state, action.recipe)
		case TOGGLE_RECIPE:
			if (state.id !== action.id) {
				return state
			}

			return _.assign({}, state, {
				hideIngredients: !state.hideIngredients
			})

		default:
			return state
	}
}

const recipes = (state = [], action) => {
	switch (action.type) {
		case RECIPES_SUCCESS:
			return _.union(...state, action.recipes)
		case CREATE_RECIPE:
			return [
				...state,
				recipe(undefined, action)
			]
		case RECIPE_CREATE_SUCCESS:
			const newlyFetchedRecipe = action && action.recipe || {}
			const { id, name, ingredients, instructions, author } = newlyFetchedRecipe
			const newRecipe = {
				id,
				hideIngredients: true,
				name,
				ingredients,
				instructions,
				author
			}
			return [...state, newRecipe]
		case RECIPE_UPDATE_SUCCESS:
			return state.map(r =>
					recipe(r, action)
			)
		case RECIPE_DELETE_SUCCESS:
			const recipeToDelete = _.findIndex(state, (recipe) => {
				return (recipe.id + '') === (action.recipeIdToDelete + '')
			})
			if (recipeToDelete === -1) {
				return state
			}
			return [
				...state.slice(0, recipeToDelete),
				...state.slice(recipeToDelete + 1)
			]
		case TOGGLE_RECIPE:
			return state.map(r =>
					recipe(r, action)
			)
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
	recipeForm,
	recipes,
	header,
	search,
	session,
	setSearchFilters,
	setSearchTerms,
	visibilityFilter
})


const initialState = {
	recipes: [],
	recipeForm: {
		id: '',
		name: '',
		author: '',
		recipes: '',
		ingredients: '',
		isVisible: false,
		isNewRecipe: true
	},
	search: {
		SEARCH_CONTRIBUTOR: false,
		SEARCH_NAME: false,
		SEARCH_INGREDIENTS: false,
		SEARCH_INSTRUCTIONS: false,
	}
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducers,
	initialState,
	applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export { store }
