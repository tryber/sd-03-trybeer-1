import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/Login';
import ProductsClient from './components/ProductsClient';
import AplicationProvider from './context/ContextAplication';

function App() {
  return (
    <AplicationProvider>
      <Switch>
        <Route exact path="/login" component={ LoginScreen } />
        <Route exact path="/products" component={ ProductsClient } />
      </Switch>
    </AplicationProvider>
  );
}

export default App;
