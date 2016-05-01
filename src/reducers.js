import { combineReducers } from 'redux'
import { CREATE_RECIPE, UPDATE_RECIPE, DESTROY_RECIPE, TOGGLE_RECIPE, IS_EDITING, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
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
    case DESTROY_RECIPE:
      let indexDestroy, iDestroy
        for(iDestroy=0;iDestroy<state.length;iDestroy++){
          state[iDestroy];
          if(state[iDestroy].id === action.recipeId){
            indexDestroy = iDestroy;
          }
        }
      return [
        ...state.slice(0, indexDestroy),
        ...state.slice(indexDestroy + 1)
      ]
    case UPDATE_RECIPE:
      let indexUpdate, iUpdate
        for(iUpdate=0;iUpdate<state.length;iUpdate++){
          state[iUpdate];
          if(state[iUpdate].id === action.recipeId){
            index = iUpdate;
          }
        }
      return [
        ...state.slice(0, indexUpdate),
        ...{
          id: action.id,
          hideIngredients: action.hideIngredients,
          name: action.name,
          ingredients: action.ingredients,
          instructions: action.instructions,
          author: action.author
        },
        ...state.slice(indexUpdate + 1)
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
      return Object.assign({}, state, {
        isEditing: !state.isEditing
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
/*
      return Object.assign({}, state, {
        isEditing: !state.isEditing
      })
     */


const recipeApp = combineReducers({
  visibilityFilter,
  recipes,
  isEditing,
  recipeToEdit
})

export { recipeApp }
