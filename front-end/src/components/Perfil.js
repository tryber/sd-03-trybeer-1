import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ContextAplication } from '../context/ContextAplication';

const handlePerfilChange = async (e, name, setError) => {
  e.preventDefault();
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post('http://localhost:3001/profile', {
      name,
      token,
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    return setError('');
  } catch (err) {
    return setError('Não foi possível efetuar a troca de nome');
  }
};

function Login() {
  const {
    error,
    setError,
  } = useContext(ContextAplication);

  // validation based on code from https://github.com/tryber/sd-04-recipes-app-4/blob/master/src/pages/Login.jsx
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState(true);
  const { name: nameStored, email } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const testName = /^[ a-z]+$/i.test(name);

    if (!testName || nameStored === name) return setDisabled(true);

    return setDisabled(false);
  }, [nameStored, name]);

  return (
    <div>
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
            minLength="6"
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
          ENTRAR
        </button>
      </form>
      <button type="button" data-testid="profile-save-btn">Salvar</button>
    </div>
  );
}

export default Login;
