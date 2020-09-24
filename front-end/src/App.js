import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import AplicationProvider from './context/ContextAplication';

function App() {
  return (
    <AplicationProvider>
      <Switch>
        <Route exact path="/login" component={ LoginScreen } />
        <Route exact path="/" component={ LoginScreen } />
        <Route exact path="/register" component={ RegisterScreen } />
      </Switch>
    </AplicationProvider>
  );
}

export default App;
