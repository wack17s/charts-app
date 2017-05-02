/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import KoefDempf from './containers/KoefDempf';
import KoefDempf1 from './containers/KoefDempf1';
import KoefDempf2 from './containers/KoefDempf2';

export default () => (
  <Router>
    <App>
      <Switch>
        <Route path="/koefDempf" component={KoefDempf} />
        <Route path="/koefDempf1" component={KoefDempf1} />
        <Route path="/koefDempf2" component={KoefDempf2} />
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  </Router>
);
