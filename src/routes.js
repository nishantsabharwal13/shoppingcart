import React from 'react';
//react router
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';


const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList} />
        <Route path="/cart" component={Cart} />
        <Route path="/admin" component={BooksForm} />
      </Route>
    </Router>
)

export default routes;