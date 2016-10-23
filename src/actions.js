import {badWords} from './badwords.js'
import {abbreviations} from './abbreviations.js'
export const RECIPES_REQUEST = 'RECIPES_REQUEST'
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS'
export const RECIPES_FAILURE = 'RECIPES_FAILURE'
export const CREATE_RECIPE = 'CREATE_RECIPE'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'
export const DESTROY_RECIPE = 'DESTROY_RECIPE'
export const TOGGLE_RECIPE = 'TOGGLE_RECIPE'
export const IS_EDITING = 'IS_EDITING'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS'
export const SET_SEARCH_TERMS = 'SET_SEARCH_TERMS'

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_NAME: 'SHOW_NAME',
	SHOW_INGREDIENTS: 'SHOW_INGREDIENTS',
	SHOW_INSTRUCTIONS: 'SHOW_INSTRUCTIONS',
	SHOW_AUTHOR: 'SHOW_AUTHOR'
}

export const SearchFilters = {
	BY_ALL: 'BY_ALL',
	BY_NAME: 'BY_NAME',
	BY_INGREDIENTS: 'BY_INGREDIENTS',
	BY_INSTRUCTIONS: 'BY_INSTRUCTIONS',
	BY_AUTHOR: 'BY_AUTHOR'
}

let nextRecipeId = 125

var regexer = function(pattern){
	return new RegExp(pattern, "gi");
}

var filterInput = function(recipePiece, filterObject, replacementPattern){
	var newString = recipePiece;
	if(Array.isArray(filterObject)){
		for(var i=0;i<filterObject.length;i++){
			newString = newString ? newString.replace(regexer(filterObject[i]),replacementPattern): '';
		}
	} else if (typeof filterObject === 'object'){
		var hashKeys = Object.keys(filterObject)
		for(var i=0;i<hashKeys.length;i++){
			newString = newString ? newString.replace(regexer(hashKeys[i]), filterObject[hashKeys[i]]): '';
		}
	}
	return newString
}

export function createRecipe(name, ingredients, instructions, author) {
	var nameFiltered = filterInput(name, badWords, '***')
	var ingredientsFiltered = filterInput(filterInput(ingredients, abbreviations), badWords, '***')
	var instructionsFiltered = filterInput(instructions, badWords, '***')
	var authorFiltered = filterInput(author, badWords, '***')
	return {
		type: CREATE_RECIPE,
		id: nextRecipeId++,
		hideIngredients: true,
		name: nameFiltered,
		ingredients: ingredientsFiltered,
		instructions: instructionsFiltered,
		author: authorFiltered
	}
}

export function updateRecipe(recipeId, hideIngredients, name, ingredients, instructions, author) {
	var nameFiltered = filterInput(name, badWords, '***')
	var ingredientsFiltered = filterInput(filterInput(ingredients, abbreviations), badWords, '***')
	var instructionsFiltered = filterInput(instructions, badWords, '***')
	var authorFiltered = filterInput(author, badWords, '***')
	return {
		type: UPDATE_RECIPE,
		recipeId,
		hideIngredients,
		name: nameFiltered,
		ingredients: ingredientsFiltered,
		instructions: instructionsFiltered,
		author: authorFiltered
	}
}

export function destroyRecipe (recipeId) {
	return {
		type: DESTROY_RECIPE,
		recipeId
	}
}

export function setVisibilityFilter(filter) {
	return {
		type: SET_VISIBILITY_FILTER,
		filter
	}
}

export const toggleRecipe = (id) => {
	return {
		type: TOGGLE_RECIPE,
		id
	}
}

export const isEditing = (id, name) => {
	return {
		type: IS_EDITING,
		id,
		name
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

export const fetchRecipes = () => {
	return {
		type: RECIPES_REQUEST
	}
}
