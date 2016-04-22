export const CREATE_RECIPE = 'CREATE_RECIPE'
export const DESTROY_RECIPE = 'DESTROY_RECIPE'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_NAME: 'SHOW_NAME',
  SHOW_INGREDIENTS: 'SHOW_INGREDIENTS',
  SHOW_AUTHOR: 'SHOW_AUTHOR'
}

export function createRecipe(name, ingredients, instructions, author) {
  return {
    type: CREATE_RECIPE,
    name,
    ingredients,
    instructions,
    author
  }
}
export const destroyRecipe = (recipes, index) => {
  return [
    ...recipes.slice(0, index),
    ...recipes.slice(index + 1)
  ]
}
export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

