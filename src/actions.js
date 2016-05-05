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

let nextRecipeId = 34
export function createRecipe(name, ingredients, instructions, author) {
  return {
    type: CREATE_RECIPE,
    id: nextRecipeId++,
    hideIngredients: true,
    name,
    ingredients,
    instructions,
    author
  }
}

export function updateRecipe(id, hideIngredients, name, ingredients, instructions, author) {
  return {
    type: UPDATE_RECIPE,
    id,
    hideIngredients,
    name,
    ingredients,
    instructions,
    author
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
  console.log('setting terms:')
  console.log(terms)
  return {
    type: SET_SEARCH_TERMS,
    terms
  }
}
