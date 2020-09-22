import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ContextAplication } from '../context/ContextAplication';

const handleSignIn = async (e, email, password, setError, history) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/login', {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    setError('');
    return history.push(
      response.data.role === 'client' ? '/products' : '/admin/profile',
    );
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

  const [informations, setInformations] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const validEmailRegEx = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    const pLength = 6;

    if (!validEmailRegEx.test(email)
      || (password.length <= pLength)) return setInformations(true);

    return setInformations(false);
  }, [email, password]);

  return (
    <div>
      {error && <h3>{ error }</h3>}
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            onChange={ (event) => setEmail(event.target.value) }
            required
            data-testid="email-input"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            minLength="6"
            onChange={ (event) => setPassword(event.target.value) }
            required
            data-testid="password-input"
          />
        </label>

        <button
          disabled={ informations }
          type="submit"
          onClick={ (event) => handleSignIn(event, email, password, setError, history) }
          data-testid="signin-btn"
        >
          Entrar
        </button>
      </form>
      <Link to="/register"><button type="button" data-testid="no-account-btn">Ainda não tenho conta</button></Link>
    </div>
  );
}

export default Login;
