import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { Home } from './home/home'
import './css/bootstrap.min.css'
import './css/custom.css.scss'
import { store } from './store/store'

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Home}/>
		</Router>
	</Provider>
), document.getElementById('my-app'));
