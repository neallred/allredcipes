import {badWords} from './constants/badwords';
import {abbreviations} from './constants/abbreviations';
import {
	CREATE_RECIPE,
	UPDATE_RECIPE,
	DESTROY_RECIPE,
	SET_VISIBILITY_FILTER,
	TOGGLE_RECIPE,
	IS_EDITING,
	SET_SEARCH_FILTERS,
	SET_SEARCH_TERMS,
	RECIPES_REQUEST
} from './constants/action-types';

const regexer = function(pattern){
	return new RegExp(pattern, "gi");
}

const filterInput = function(recipePiece, filterObject, replacementPattern){
	let newString = recipePiece;
	if(Array.isArray(filterObject)){
		for(var i=0;i<filterObject.length;i++){
			newString = newString ? newString.replace(regexer(filterObject[i]),replacementPattern): '';
		}
	} else if (typeof filterObject === 'object'){
		const hashKeys = Object.keys(filterObject)
		for(var i=0;i<hashKeys.length;i++){
			newString = newString ? newString.replace(regexer(hashKeys[i]), filterObject[hashKeys[i]]): '';
		}
	}
	return newString
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

export const isEditing = (id) => {
	return {
		type: IS_EDITING,
		id
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
