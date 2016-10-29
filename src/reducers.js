import { combineReducers } from 'redux';
import _ from 'lodash';
import {reducer as formReducer} from 'redux-form';
import {
	RECIPES_SUCCESS,

	RECIPE_CREATE_SUCCESS,

	RECIPE_UPDATE_SUCCESS,

	RECIPE_DELETE_SUCCESS,

	CREATE_RECIPE,

	TOGGLE_RECIPE,
	IS_EDITING,

	SET_VISIBILITY_FILTER,
	SET_SEARCH_FILTERS,
	SET_SEARCH_TERMS,

	SHOW_ALL,

	BY_ALL,
	BY_NAME,
	BY_INGREDIENTS,
	BY_INSTRUCTIONS,
	BY_AUTHOR 
} from './action-types';

function visibilityFilter(state = SHOW_ALL, action) {
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
			return Object.assign({}, state, action.recipe);
		case TOGGLE_RECIPE:
			if (state.id !== action.id) {
				return state
			}

			return Object.assign({}, state, {
				hideIngredients: !state.hideIngredients
			});

		default:
			return state
	}
}

const recipes = (state = [], action) => {
	switch (action.type) {
		case RECIPES_SUCCESS:
			return _.union(...state, action.recipes);
		case CREATE_RECIPE:
			return [
				...state,
				recipe(undefined, action)
			]
		case RECIPE_CREATE_SUCCESS:
			const newlyFetchedRecipe = action && action.recipe;
			const newRecipe = {
				id: newlyFetchedRecipe.id,
				hideIngredients: true,
				name: newlyFetchedRecipe.name,
				ingredients: newlyFetchedRecipe.ingredients || '',
				instructions: newlyFetchedRecipe.instructions || '',
				author: newlyFetchedRecipe.author || ''
			}
			return [...state, newRecipe]
		case RECIPE_UPDATE_SUCCESS:
			return state.map(r =>
					recipe(r, action)
			);
		case RECIPE_DELETE_SUCCESS:
			const recipeToDelete = _.findIndex(state, (recipe) => {
				return (recipe.id + '') === (action.recipeIdToDelete + '')
			});
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

const isEditing = (state = {}, action) => {
	switch (action.type) {
		case IS_EDITING:
			const isEditingState = !state.flag;
			return Object.assign({}, state, {
				flag: isEditingState,
				id: isEditingState ? action.id : null
			});
		default:
			return state
	}
}

const setSearchFilters = (state = [], action) => {
	switch (action.filter) {
		//Intentional fall through
		case BY_ALL:
		case BY_NAME:
		case BY_INGREDIENTS:
		case BY_INSTRUCTIONS:
		case BY_AUTHOR:
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


const recipeApp = combineReducers({
	visibilityFilter,
	recipes,
	isEditing,
	setSearchFilters,
	setSearchTerms,
	form: formReducer
})

export { recipeApp }
