import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger';
import { recipeApp } from './reducers'
import { App } from './app'
import { Home } from './home/home'
import { rootSaga } from './sagas'
import './css/bootstrap.min.css';
import './css/custom.css.scss';
//import initialRecipes from '../loadInitialState';

const initialState = {
	recipes: [],
	visibilityFilter: 'BY_ALL',
	isEditing: {
		flag: false,
		id: null
	},
	setSearchFilters: [],
	setSearchTerms: []
}
const loggerMiddleware = createLogger({
	level: 'error',
	collapsed: true,
});
//applyMiddleware(thunkMiddleware, loggerMiddleware)
//const enhancer = compose(
//	applyMiddleware(sagaMiddleware)
//);

//const store = createStore(recipeApp, initialState, enhancer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	recipeApp,
	initialState,
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);



ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('my-app'));
