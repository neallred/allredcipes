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
import { storeDev } from './store/store'
import DevTools from './redux-dev-tools';

const isDevelopment = process.env.NODE_ENV === 'development'

const devToolsComponent = isDevelopment ? <DevTools/> : null 
ReactDOM.render((
	<Provider store={isDevelopment ? storeDev : store}>
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={Home}/>
      </Router>
      {devToolsComponent}
    </div>
	</Provider>
), document.getElementById('my-app'));
