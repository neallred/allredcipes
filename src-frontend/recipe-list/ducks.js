import {abbreviations} from '../constants/abbreviations'
import {
  RECIPES_GET,
  RECIPES_GET_SUCCESS,
  RECIPES_GET_FAILURE,
  RECIPES_CREATE,
  RECIPES_CREATE_SUCCESS,
  RECIPES_CREATE_FAILURE,
  RECIPES_EDIT,
  RECIPES_EDIT_SUCCESS,
  RECIPES_EDIT_FAILURE,
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
} from '../utils/array-sorting'

export const initialEditState = {
  author: '',
  instructions: '',
  ingredients: '',
  name: '',
  _id: null,
}

export const initialCreateState = {
  author: '',
  instructions: '',
  ingredients: '',
  name: '',
}

export const recipesInitialState = {
  list: [],
  recipeCreate: null, //is an object with the 4 recipe keys when in create mode.
  recipeEdit: initialEditState,
  errorGet: null,
  errorCreate: null,
  errorDelete: null,
  errorEdit: null,
}

const findRecipe = (recipes, id) => recipes.find(recipe => recipe._id === id)
const findRecipeIndex = (recipes, id) => recipes.findIndex(recipe => recipe._id === id)

export default function recipes(state = recipesInitialState, action) {
	switch (action.type) {
		case RECIPES_GET_SUCCESS:
      return Object.assign({}, state, {list: mergeRecipesBy(state.list, action.value, '_id'), errorGet: null})

		case RECIPES_GET_FAILURE:
      return Object.assign({}, state, {errorGet: action.value})

		case RECIPES_CREATE_SUCCESS:
			const newlyCreatedRecipe = action && action.value || {}
      return Object.assign({}, state, {list: [...state.list, newlyCreatedRecipe], errorCreate: null})

		case RECIPES_CREATE_FAILURE:
      return Object.assign({}, state, {errorCreate: action.value})

		case RECIPES_EDIT_SUCCESS:
      const listWithEdittedRecipe = state.list.slice()
      const edittedRecipe = findRecipe(listWithEdittedRecipe, action.value._id)
      if (!edittedRecipe) {
        return Object.assign({}, state, {errorEdit: null})
      }
      edittedRecipe.author = action.value.author
      edittedRecipe.ingredients = action.value.ingredients
      edittedRecipe.instructions = action.value.instructions
      edittedRecipe.name = action.value.name
      return Object.assign({}, state, {list: listWithEdittedRecipe, errorEdit: null})

		case RECIPES_EDIT_FAILURE:
      return Object.assign({}, state, {errorEdit: action.value})

		case RECIPES_DELETE_SUCCESS:
      const listWithoutRecipe = state.list.slice()
			const deletedRecipeIndex = findRecipeIndex(state.list, action.value)
			if (deletedRecipeIndex === -1) { return state }
			return Object.assign(
        {},
        state,
        {
          list: [
            ...state.list.slice(0, deletedRecipeIndex),
            ...state.list.slice(deletedRecipeIndex + 1)
          ],
          errorDelete: null,
        }
			)

		case RECIPES_DELETE_FAILURE:
      return Object.assign({}, state, {errorDelete: action.value})

		case RECIPES_TOGGLE_VIEW:
      const listWithToggledView = state.list.slice()
      const recipeWithToggledView = findRecipe(state.list, action.value)
      recipeWithToggledView.showIngredients = !recipeWithToggledView.showIngredients

      return Object.assign({}, state, {list: listWithToggledView})

		case RECIPES_TOGGLE_EDIT:
      if (state.recipeEdit._id) {
        return Object.assign({}, state, {recipeEdit: initialEditState})
      }
      else {
        const recipeToEdit = Object.assign({}, findRecipe(state.list, action.value))
        return  Object.assign({}, state, {recipeEdit: recipeToEdit})
      }

		case RECIPES_HANDLE_EDIT:
        return Object.assign({}, state, {recipeEdit: {...state.recipeEdit, ...action.value}})

		case RECIPES_TOGGLE_CREATE:
      if (!state.recipeCreate) {
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
      const newRecipeCreate = Object.assign({}, state.recipeCreate, {...action.value})
      return Object.assign({}, state, {recipeCreate: newRecipeCreate})

		default:
			return state
	}
}

const regexer = function(pattern){
	return new RegExp(pattern, "gi")
}

export function mergeRecipesBy(oldRecipes, fetchedRecipes, byTerm='_id') {
  const oldIds = oldRecipes.map(recipe => recipe[byTerm])
  const fetchedIds = fetchedRecipes.map(recipe => recipe[byTerm])
  let mergedRecipes = oldRecipes.slice()
  let matchedRecipesIds = []

  for (let i = 0; i < fetchedIds.length ; i = i + 1) {
    const matchedIdLocation = oldIds.indexOf(fetchedIds[i])
    if(matchedIdLocation !== -1) {
      mergedRecipes[matchedIdLocation] = fetchedRecipes[i]
      //mergedRecipes.splice(matchedIdLocation, 1, fetchedRecipes[fetchedIds[i]])
      matchedRecipesIds.push(fetchedIds[i])
    }
  }

  for (let i = 0; i < matchedRecipesIds.length ; i = i + 1) {
    fetchedRecipes.splice(matchedRecipesIds[i], 1)
  }
  mergedRecipes = [...mergedRecipes, ...fetchedRecipes]
  return mergedRecipes

}

export function recipesDelete(id) {
  return {
    type: RECIPES_DELETE,
    value: id
  }
}

export function recipesToggleView(id) {
  return {
    type: RECIPES_TOGGLE_VIEW,
    value: id
  }
}

export function recipesToggleEdit(id) {
  return {
    type: RECIPES_TOGGLE_EDIT,
    value: id
  }
}

export function recipesHandleEdit(formFields) {
  return {
    type: RECIPES_HANDLE_EDIT,
    value: formFields
  }
}

export function recipesToggleCreate() {
  return {
    type: RECIPES_TOGGLE_CREATE,
  }
}

export function recipesHandleCreate(formFields) {
  return {
    type: RECIPES_HANDLE_CREATE,
    value: formFields
  }
}

export function recipesGet(page) {
  return {
    type: RECIPES_GET,
    value: page
  }
}

export function recipesEdit(recipeToEdit) {
  return {
    type: RECIPES_EDIT,
    value: recipeToEdit
  }
}

export function recipesCreate(recipeToCreate) {
  console.log('recipeToCreate', recipeToCreate)
  return {
    type: RECIPES_CREATE,
    value: recipeToCreate
  }
}

