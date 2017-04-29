import './css/reset.scss'
import './css/background.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './home/home'
import { store } from './store/store'

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Home}/>
		</Router>
	</Provider>
), document.getElementById('my-app'));
