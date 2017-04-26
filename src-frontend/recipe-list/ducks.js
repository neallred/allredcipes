import {badWords} from '../constants/badwords'
import {abbreviations} from '../constants/abbreviations'
import union from 'lodash.union'
import {
  RECIPES_GET,
  RECIPES_GET_SUCCESS,
  RECIPES_GET_FAILURE,
  RECIPES_CREATE,
  RECIPES_CREATE_SUCCESS,
  RECIPES_CREATE_FAILURE,
  RECIPES_UPDATE,
  RECIPES_UPDATE_SUCCESS,
  RECIPES_UPDATE_FAILURE,
  RECIPES_DELETE,
  RECIPES_DELETE_SUCCESS,
  RECIPES_DELETE_FAILURE,

  RECIPES_TOGGLE_VIEW,
  RECIPES_TOGGLE_EDIT,
  RECIPES_HANDLE_EDIT,
  RECIPES_TOGGLE_CREATE,
  RECIPES_HANDLE_CREATE,
} from '../constants/action-types'

import {
  stringPropertySort
} from '../utils/array-sorting'

const initialEditState = {
  author: '',
  instructions: '',
  ingredients: '',
  name: '',
  _id: null,
}

export const recipesInitialState = {
  list: [],
  recipeCreate: null, //is an object with the 4 recipe keys when in create mode.
  recipeEdit: initialEditState,
  errorGet: null,
  errorCreate: null,
  errorDelete: null,
  errorUpdate: null,
}

const findRecipe = (recipes, id) => recipes.find(recipe => recipe._id === id)
const findRecipeIndex = (recipes, id) => recipes.findIndex(recipe => recipe._id === id)

export default function recipes(state = recipesInitialState, action) {
	switch (action.type) {
		case RECIPES_GET_SUCCESS:
      return Object.assign({}, state, {list: union(...state.list, action.value), errorGet: null})

		case RECIPES_GET_FAILURE:
      return Object.assign({}, state, {errorGet: action.value})

		case RECIPES_CREATE_SUCCESS:
			const newlyCreatedRecipe = action && action.value || {}
			const newRecipeList = [...state.list, newCreatedRecipe].sort(stringPropertySort('name'))
      Object.assign({}, state, {list: newRecipeList, errorCreate: null})

		case RECIPES_CREATE_FAILURE:
      return Object.assign({}, state, {errorCreate: action.value})

		case RECIPES_UPDATE_SUCCESS:
      const listWithUpdatedRecipe = state.list.slice()
      const updatedRecipe = findRecipe(listWithUpdatedRecipe.list, action.value._id)
      updatedRecipe.author = action.value.author
      updatedRecipe.ingredients = action.value.ingredients
      updatedRecipe.instructions = action.value.instructions
      updatedRecipe.name = action.value.name
      return Object.assign({}, state, {list: listWithUpdatedRecipe, errorUpdate: null})

		case RECIPES_UPDATE_FAILURE:
      return Object.assign({}, state, {errorUpdate: action.value})

		case RECIPES_DELETE_SUCCESS:
      const listWithoutRecipe = state.list.slice();
			const deletedRecipeIndex = findRecipeIndex(state.list, actionValue)
			if (deletedRecipeIndex === -1) { return state }
			return Object.assign({}, state, {list: [
				...state.slice(0, deletedRecipeIndex),
				...state.slice(deletedRecipeIndex + 1)
			]});

		case RECIPES_TOGGLE_VIEW:
      const listWithToggledView = state.list.slice();
      const recipeWithToggledView = findRecipe(state.list, action.value);
      recipeWithToggledView.showIngredients = !recipeWithToggledView.showIngredients;

      return Object.assign({}, state, {list: listWithToggledView});

		case RECIPES_TOGGLE_EDIT:
      if (state.recipeEdit._id) {
        return Object.assign({}, state, {recipeEdit: initialEditState})
      }
      else {
        const recipeToEdit = Object.assign({}, findRecipe(state.list, action.value))
        return  Object.assign({}, state, {recipeEdit: recipeToEdit})
      }

		case RECIPES_HANDLE_EDIT:
        return Object.assign({}, state, {recipeEdit: {...action.value}});

		case RECIPES_TOGGLE_CREATE:
      if (action.value.isStartingCreate) {
        const recipeCreate = {
          author: '',
          ingredients: '',
          instructions: '',
          name: '',
        }
        return Object.assign({}, state, {recipeCreate})
      }
      else {
        return Object.assign({}, state, {recipeCreate: null})
      }

		case RECIPES_HANDLE_CREATE:
        return Object.assign({}, state, {recipeCreate: {...action.value}});

		default:
			return state
	}
}

const regexer = function(pattern){
	return new RegExp(pattern, "gi")
}

const filterInput = function(recipePiece, filterObject, replacementPattern){
	let newString = recipePiece
	if(Array.isArray(filterObject)){
		for(let i=0;i<filterObject.length;i++){
			newString = newString ? newString.replace(regexer(filterObject[i]),replacementPattern): ''
		}
	} else if (typeof filterObject === 'object'){
		const hashKeys = Object.keys(filterObject)
		for(let i=0;i<hashKeys.length;i++){
			newString = newString ? newString.replace(regexer(hashKeys[i]), filterObject[hashKeys[i]]): ''
		}
	}
	return newString
}

export const recipesUpdate = (recipeId, hideIngredients, name, ingredients, instructions, author) => {
	var nameFiltered = filterInput(name, badWords, '***')
	var ingredientsFiltered = filterInput(filterInput(ingredients, abbreviations), badWords, '***')
	var instructionsFiltered = filterInput(instructions, badWords, '***')
	var authorFiltered = filterInput(author, badWords, '***')
	return {
		type: RECIPES_UPDATE,
    value: {
      recipeId,
      name: nameFiltered,
      ingredients: ingredientsFiltered,
      instructions: instructionsFiltered,
      author: authorFiltered
    }
	}
}

export const recipesDelete = id => ({
  type: RECIPES_DELETE,
  value: id
})

export const recipesToggleView = id => ({
  type: RECIPES_TOGGLE_VIEW,
  value: id
})

export const recipesToggleEdit = id  => ({
  type: RECIPES_TOGGLE_EDIT,
  value: id
})

export const recipesHandleEdit = formFields => ({
  type: RECIPES_HANDLE_EDIT,
  value: formFields
})

export const recipesToggleCreate = isStartingCreate => ({
  type: RECIPES_TOGGLE_CREATE,
  value: isStartingCreate
})

export const recipesHandleCreate = formFields => ({
  type: RECIPES_HANDLE_EDIT,
  value: formFields
})

export const recipesGet = page => ({
  type: RECIPES_GET,
  value: page
})

export const recipesUpdateRequest = (recipeToEdit) => ({
  type: RECIPES_UPDATE_REQUEST,
  value: recipeToEdit
});
