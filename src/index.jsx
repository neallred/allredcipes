import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/custom.css.scss';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './App';
import { createStore } from 'redux'
import { recipeApp } from './reducers';
import { FixturesRecipes } from './components/FixturesRecipes';


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

/**********************/


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={App}/>
    </Route>
  </Router>
), document.getElementById('my-app'));
