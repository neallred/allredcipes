import { combineReducers } from 'redux'
import { CREATE_RECIPE, DESTROY_RECIPE, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters
import { FixturesRecipes } from './components/FixturesRecipes'; 


function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function recipes(state = [], action) {
  switch (action.type) {
    case CREATE_RECIPE:
      return [
        ...state,
        {
          name: action.name,
          ingredients: action.ingredients,
          instructions: action.instructions,
          author: action.author
        }
      ]
    case DESTROY_RECIPE:
      return [
        ...recipes.slice(0, index),
        ...recipes.slice(index + 1)
      ]
    default:
      return state
  }
}

const recipeApp = combineReducers({
  visibilityFilter,
  recipes
})

export { recipeApp }
