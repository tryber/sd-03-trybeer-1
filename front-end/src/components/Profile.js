import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ContextAplication } from '../context/ContextAplication';
import { ClientMenu, AdminMenu } from './Menu/index';

const handlePerfilChange = async (e, name, setError) => {
  e.preventDefault();
  try {
    const notFound = 404;
    const { token, email } = JSON.parse(localStorage.getItem('user'));
    const headers = { authorization: token };
    const response = await axios.post(
      'http://localhost:3001/profile', { name, email }, { headers },
    );
    if (response.status === notFound) throw Error;
    localStorage.setItem('user', JSON.stringify({ ...response.data, token }));
    return setError('');
  } catch (err) {
    return setError('Não foi possível efetuar a troca de nome');
  }
};

function Profile() {
  const {
    error,
    setError,
  } = useContext(ContextAplication);

  // validation based on code from https://github.com/tryber/sd-04-recipes-app-4/blob/master/src/pages/Profile.jsx
  const { name: nameStored, email, role } = JSON.parse(localStorage.getItem('user'));
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState(nameStored);

  useEffect(() => {
    const testName = /^[ a-z]+$/i.test(name);
    // const nameLength = 14;

    if (!testName || nameStored === name
    /* || name.length < nameLength */
    ) return setDisabled(true);

    return setDisabled(false);
  }, [nameStored, name]);

  return (
    <div>
      {role === 'admin' ? <AdminMenu /> : <ClientMenu />}
      <h1 data-testid="top-title">Meu perfil</h1>
      {error && <h3>{ error }</h3>}
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="profile-email-input"
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="name"
            id="name"
            value={ name }
            onChange={ (event) => setName(event.target.value) }
            required
            data-testid="profile-email-input"
          />
        </label>

        <button
          disabled={ disabled }
          type="submit"
          onClick={ (event) => handlePerfilChange(event, name, setError) }
          data-testid="profile-save-btn"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Profile;
