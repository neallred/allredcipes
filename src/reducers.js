import { combineReducers } from 'redux';
import find from 'lodash/find';
import {reducer as formReducer} from 'redux-form';
import { CREATE_RECIPE, UPDATE_RECIPE, DESTROY_RECIPE, TOGGLE_RECIPE, IS_EDITING, SET_VISIBILITY_FILTER, SET_SEARCH_FILTERS, SET_SEARCH_TERMS, VisibilityFilters, SearchFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;


function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return state
	}
}

const recipe = (state, action) => {
	switch (action.type) {
		case 'CREATE_RECIPE':
			return {
				id: action.id,
				hideIngredients: action.hideIngredients,
				name: action.name,
				ingredients: action.ingredients,
				instructions: action.instructions,
				author: action.author
			}
		case 'UPDATE_RECIPE':
			return {
				id: action.recipeId,
				hideIngredients: action.hideIngredients,
				name: action.name,
				ingredients: action.ingredients,
				instructions: action.instructions,
				author: action.author
			}
		case 'TOGGLE_RECIPE':
			if (state.id !== action.id) {
				return state
			}

			return Object.assign({}, state, {
				hideIngredients: !state.hideIngredients
			})

		default:
			return state
	}
}

const recipes = (state = [], action) => {
	switch (action.type) {
		case CREATE_RECIPE:
			return [
				...state,
				recipe(undefined, action)
			]
		case 'UPDATE_RECIPE':
			let indexUpdate, iUpdate
			for(var iUpdate=0;iUpdate<state.length;iUpdate++){
				state[iUpdate];
				if(state[iUpdate].id === action.recipeId){
					indexUpdate = iUpdate;
				}
			}
			return [
				...state.slice(0, indexUpdate),
				recipe(undefined, action),
				...state.slice(indexUpdate + 1)
			]
		case DESTROY_RECIPE:
			let indexDestroy, iDestroy
			for(iDestroy=0;iDestroy<state.length;iDestroy++){
				if(state[iDestroy].id === action.recipeId){
					indexDestroy = iDestroy;
				}
			}
			return [
				...state.slice(0, indexDestroy),
				...state.slice(indexDestroy + 1)
			]
		case TOGGLE_RECIPE:
			return state.map(r =>
					recipe(r, action)
			)
		default:
			return state
	}
}

const isEditing = (state = [], action) => {
	switch (action.type) {
		case 'IS_EDITING':
			const recipeToChange = find(state.recipes, ['id', action.id]);
			return Object.assign({}, state, {
				isEditing: !state.isEditing,
				recipeToEdit: recipeToChange? {
					recipeId: recipeToChange.id,
					hideIngredients: recipeToChange.hideIngredients,
					name: recipeToChange.name,
					ingredients: recipeToChange.ingredients,
					instructions: recipeToChange.instructions,
					author: recipeToChange.author
				} : null
			})
		default:
			return state
	}
}

const recipeToEdit = (state = [], action) => {
	switch (action.type) {
		case 'UPDATE_RECIPE':
			return state
		default:
			return state
	}
}

const setSearchFilters = (state = [], action) => {
	switch (action.filter) {
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
		case 'SET_SEARCH_TERMS':
			return action.terms.toLowerCase().split(' ')
		default:
			return state
	}
}


const recipeApp = combineReducers({
	visibilityFilter,
	recipes,
	isEditing,
	recipeToEdit,
	setSearchFilters,
	setSearchTerms,
	form: formReducer
})

export { recipeApp }
