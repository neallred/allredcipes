import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { recipeApp } from './reducers'
import { App } from './App'
import { Home } from './components/Home'
import { FixturesRecipes } from './components/FixturesRecipes'
import './css/bootstrap.min.css';
import './css/custom.css.scss';

const initialState = {
  visibilityFilter: 'SHOW_ALL',
  isEditing: false,
  recipes: FixturesRecipes,
  recipeToEdit: {
    id: null,
    hideIngredients: true,
    name: '',
    ingredients: '',
    instructions: '',
    author: ''
  }
}

let store = createStore(recipeApp, initialState);

/*FOR TESTING PURPOSES*/
import { createRecipe, destroyRecipe, setVisibilityFilter, VisibilityFilters } from './actions'
let unsubscribe = store.subscribe(() => {})
/*
store.dispatch(createRecipe('Meatballs', 'meat', 'scoop into balls and bake', 'meathead'))
store.dispatch(createRecipe('Jellyfish', 'jelly, fish', 'jelly your fish, and spread jelly on it', 'cowz'))
*/

unsubscribe()

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute 
          component={Home}
        />
      </Route>
    </Router>
  </Provider>
), document.getElementById('my-app'));
