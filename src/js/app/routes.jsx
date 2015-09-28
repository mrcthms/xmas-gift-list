import React from 'react';
import { Route } from 'react-router';
import App from '../components/app.jsx';
import Home from '../components/home.jsx';
import AddItem from '../components/add-item.jsx';
import Item from '../components/item.jsx';
import Login from '../components/login.jsx';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/add' handler={AddItem} />
    <Route path='/items/:id' handler={Item} />
    <Route path='/login' handler={Login} />
  </Route>
);