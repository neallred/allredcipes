import { React } from 'react';
import { createStore } from 'redux';
import { FixturesRecipes } from './FixturesRecipes'; 


export const CREATE_RECIPE = 'CREATE_RECIPE'
export const DESTROY_RECIPE = 'DESTROY_RECIPE'
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

const initialState = {
  recipes: FixturesRecipes
}

function recipeApp(state = initialState, action) {
  switch (action.type) {
    case CREATE_RECIPE:
      return Object.assign({}, state, {
        recipes: [
          ...state.recipes,
          {
            name: action.name,
            ingredients: action.ingredients,
            instructions: action.instructions,
            author: action.author
          }
        ]
      })
    case DESTROY_RECIPE:
      return Object.assign({}, state, {
        recipes: [
          ...state.recipes,
          {
            name: action.name,
            ingredients: action.ingredients,
            instructions: action.instructions,
            author: action.author
          }
        ]
      })
    default:
      return state
  }
}

let store = createStore(recipeApp);

console.log(store.getState())
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(createRecipe('Spaghetti', 'noodles, meat, sauce', 'boil noodles. brown meat. mix and add sauce.', 'Toricelli'))
store.dispatch(createRecipe('Meatballs', 'meat', 'scoop into balls and bake', 'meathead'))
store.dispatch(createRecipe('Jellyfish', 'jelly, fish', 'jelly your fish, and spread jelly on it', 'cowz'))

unsubscribe()

/*

export class FirstRedux extends React.Component {
  
}
*/
