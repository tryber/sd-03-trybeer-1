import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { ContextAplication } from '../context/ContextAplication';
import './Register.css';

async function submitRegister(e, email, password, name, checkbox, history, setError) {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/register', {
      email,
      password,
      name,
      role: checkbox,
    });
    localStorage.setItem('user', JSON.stringify(response.data.token));
    setError('');
    return history.push(checkbox ? 'admin/orders' : '/products');
  } catch (err) {
    return setError('E-mail already in database.');
  }
}

export default function Register() {
  const {
    setError,
    error = ' ',
  } = useContext(ContextAplication);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const validEmailRegEx = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    const pLength = 6;
    const nameLength = 14;
    const testName = /^[ a-z]+$/i.test(name);

    if (!validEmailRegEx.test(email)
      || (password.length < pLength || name.length < nameLength || !testName)) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [name, email, password.length, setError]);
  const history = useHistory();

  return (
    <div className="page-register">
      <form className="form-register">
        <label htmlFor="error">
          <h3 name="error">{ error }</h3>
        </label>
        <TextField
          type="text"
          value={ name }
          label="Nome"
          onChange={ ({ target }) => setName(target.value) } data-testid="signup-name"
          required
          variant="outlined"
          size="medium"
        />
        <TextField
          type="email"
          id="email"
          label="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) } data-testid="signup-email"
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
        <FormControlLabel
        control={
          <Checkbox
            onChange={ ({ target }) => setCheckbox(target.value) }
            name="checkedB"
            color="primary"
            value={ checkbox }
          />
        }
        label="Quero Vender"
        />
        <Button
          disabled={ disabled }
          color='primary'
          contained
          type="submit"
          onClick={
            (e) => submitRegister(e, email, password, name, checkbox, history, setError, error)
          }
          data-testid="signup-btn"
          className="button-register"
        >
          Cadastrar
        </Button>

      </form>
    </div>
  );
}
