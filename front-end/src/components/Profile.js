import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ClientMenu, AdminMenu } from './Menu/index';
import './Profile.css';

const handlePerfilChange = async (e, name, setError) => {
  e.preventDefault();
  try {
    const notFound = 404;
    const lastStorage = JSON.parse(localStorage.getItem('user'));
    const { token, email } = lastStorage;
    const headers = { authorization: token };
    const response = await axios.put(
      'http://localhost:3001/profile', { name, email }, { headers },
    );
    if (response.status === notFound) throw Error;
    localStorage.setItem('user', JSON.stringify({ ...response.data, token }));
    return setError('Atualização concluída com sucesso');
  } catch (err) {
    return setError('Não foi possível efetuar a troca de nome');
  }
};

function Profile() {
  // validation based on code from https://github.com/tryber/sd-04-recipes-app-4/blob/master/src/pages/Profile.jsx
  const lastStorage = JSON.parse(localStorage.getItem('user')) || {};
  const { email, role } = lastStorage;
  const history = useHistory();

  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState(lastStorage.name);

  useEffect(() => {
    if (!lastStorage || !lastStorage.token) return history.push('/login');

    const testName = /^[ a-z]+$/i.test(name);
    const nameLength = 14;

    if (!testName || lastStorage.name === name
    || name.length < nameLength
    ) return setDisabled(true);

    return setDisabled(false);
  }, [lastStorage.name, name, setMessage, history, lastStorage, setName]);

  return (
    <div>
      {role === 'administrator' ? <AdminMenu /> : <ClientMenu />}
      <h1 data-testid="top-title">Meu perfil</h1>
      {message && <h3>{ message }</h3>}
      <form>
        { role === 'administrator'
          ? (
            <TextField
              type="email"
              id="email"
              label="Email"
              value={ email }
              data-testid="profile-email-input"
              readOnly
              variant="outlined"
              size="medium"
            />
          )
          : (<TextField
            type="email"
            id="email"
            label="Email"
            value={ email }
            data-testid="profile-email-input"
            readOnly
            variant="outlined"
            size="medium"
          />)}

        { role === 'administrator'
          ? (
            <TextField
              type="name"
              label="Name"
              value={ name }
              onChange={ (event) => setName(event.target.value) }
              required
              data-testid={ role === 'administrator' ? 'profile-name' : 'profile-name-input' }
              variant="outlined"
              size="medium"
            />
          )
          : <TextField
            type="name"
            label="Name"
            value={ name }
            onChange={ (event) => setName(event.target.value) }
            required
            data-testid={ role === 'administrator' ? 'profile-name' : 'profile-name-input' }
            variant="outlined"
            size="medium"
          />}

        <Button
          disabled={ disabled }
          color="primary"
          contained
          type="submit"
          onClick={ (event) => handlePerfilChange(event, name, setMessage, history) }
          data-testid="profile-save-btn"
        >
          Salvar
        </Button>
      </form>
    </div>
  );
}

export default Profile;
