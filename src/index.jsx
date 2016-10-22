import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { recipeApp } from './reducers'
import { App } from './app'
import { Home } from './home/home'
import './css/bootstrap.min.css';
import './css/custom.css.scss';
//import initialRecipes from '../loadInitialState';

const initialState = {
	recipes: [],
	visibilityFilter: 'BY_ALL',
	isEditing: false,
	recipeToEdit: {
		id: null,
		hideIngredients: true,
		name: '',
		ingredients: '',
		instructions: '',
		author: ''
	},
	setSearchFilters: [],
	setSearchTerms: []
}
const loggerMiddleware = createLogger({
	level: 'error',
	collapsed: true,
});
//applyMiddleware(thunkMiddleware, loggerMiddleware)
const enhancer = compose(
	applyMiddleware(thunkMiddleware)
);

let store = createStore(recipeApp, initialState, enhancer);




ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('my-app'));
