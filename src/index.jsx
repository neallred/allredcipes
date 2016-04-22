import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/custom.css.scss';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './App';
import { FirstRedux } from './components/FirstRedux';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={FirstRedux}/>
    </Route>
  </Router>
), document.getElementById('my-app'));
