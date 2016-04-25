export const CREATE_RECIPE = 'CREATE_RECIPE'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'
export const DESTROY_RECIPE = 'DESTROY_RECIPE'
export const TOGGLE_RECIPE = 'TOGGLE_RECIPE'
export const OPEN_MODAL = 'OPEN_MODAL'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_NAME: 'SHOW_NAME',
  SHOW_INGREDIENTS: 'SHOW_INGREDIENTS',
  SHOW_AUTHOR: 'SHOW_AUTHOR'
}

let nextRecipeId = 20
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


/*this is an action. There is only one reducer per state tree*/
export function destroyRecipe (recipeId) {
  return {
    type: DESTROY_RECIPE,
    recipeId
  }
}

/* reducer that listens to action and updates the state */
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

export const openModal = (id) => {
  return {
    type: OPEN_MODAL
  }
}
