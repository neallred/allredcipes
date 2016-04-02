import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/custom.css.scss';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './App';
import { OwnRecipes } from './OwnRecipes';
import { OtherRecipes } from './OtherRecipes';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={OwnRecipes}/>
      <Route path='/other-recipes' component={OtherRecipes}/>
    </Route>
  </Router>
), document.getElementById('my-app'));
