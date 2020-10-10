import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/Login';
import ProductsClient from './components/ProductsClient';
import RegisterScreen from './components/Register';
import ProfileScreen from './components/Profile';
import AplicationProvider from './context/ContextAplication';
import AdminOrders from './components/AdminOrders';
import AdminDetails from './components/AdminDetails';

function App() {
  return (
    <AplicationProvider>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />
        <Route exact path="/login" component={ LoginScreen } />
        <Route exact path="/products" component={ ProductsClient } />
        <Route exact path="/register" component={ RegisterScreen } />
        <Route exact path="/profile" component={ ProfileScreen } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/admin/profile" component={ ProfileScreen } />
        <Route exact path="/admin/orders/:id" render={ (props) => <AdminDetails props={ props } /> } />
      </Switch>
    </AplicationProvider>
  );
}

export default App;
