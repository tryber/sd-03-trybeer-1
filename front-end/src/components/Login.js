import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { ContextAplication } from '../context/ContextAplication';
import './Login.css';

const handleSignIn = async (e, email, password, setError, history) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/login', {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    setError('');
    return history.push(response.data.role === 'client' ? '/products' : '/admin/orders');
  } catch (err) {
    return setError('Senha ou email inválidos');
  }
};

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
  } = useContext(ContextAplication);

  // validation based on code from https://github.com/tryber/sd-04-recipes-app-4/blob/master/src/pages/Login.jsx
  const [informations, setInformations] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const validEmailRegEx = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    const pLength = 6;

    if (!validEmailRegEx.test(email)
      || (password.length < pLength)) return setInformations(true);

    return setInformations(false);
  }, [email, password]);

  return (
    <div className="page-login">
      <form className="form-login">
        <TextField
          type="email"
          id="email"
          label="Email"
          onChange={ (event) => setEmail(event.target.value) }
          data-testid="email-input"
          variant="outlined"
          required
          size="medium"
        />
        <TextField
          type="password"
          id="password"
          label="Senha"
          minLength="6"
          onChange={ (event) => setPassword(event.target.value) }
          required
          data-testid="password-input"
          variant="outlined"
          size="medium"
        />
        { error && <p className="error-message">{ error }</p> }
        <Button
          disabled={ informations }
          color="primary"
          contained
          type="submit"
          onClick={ (event) => handleSignIn(event, email, password, setError, history) }
          data-testid="signin-btn"
          className="button-login"
        >
          ENTRAR
        </Button>
      </form>
      <Link to="/register"><button type="button" data-testid="no-account-btn" className="register-login">Ainda não tenho conta</button></Link>
    </div>
  );
}

export default Login;
