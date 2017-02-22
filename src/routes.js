import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Login from './components/Login';
import ListPage from './components/ListPage';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/list" component={ListPage} />
    </Router>
  )
}

export default Routes;
