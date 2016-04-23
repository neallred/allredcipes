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
  recipes: FixturesRecipes
}

let store = createStore(recipeApp, initialState);

/*FOR TESTING PURPOSES*/
import { createRecipe, destroyRecipe, setVisibilityFilter, VisibilityFilters } from './actions'

console.log(store.getState())
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(createRecipe('Spaghetti', 'noodles, meat, sauce', 'boil noodles. brown meat. mix and add sauce.', 'Toricelli'))
store.dispatch(createRecipe('Meatballs', 'meat', 'scoop into balls and bake', 'meathead'))
store.dispatch(createRecipe('Jellyfish', 'jelly, fish', 'jelly your fish, and spread jelly on it', 'cowz'))

unsubscribe()

  /*
   * writing test files 
   * sqlite, could use that. a DB in one file
   * if need SQL
   * if don't need SQL, ongo or couchdb
   *
   */
/**********************/


ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('my-app'));
