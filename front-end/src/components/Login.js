import React, { useContext } from 'react';
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
    if (await response.message) {
    }
    localStorage.setItem('user', JSON.stringify(response.data));
    setError('');
    history.push(
      response.data.role === 'client' ? '/products' : '/admin/profile'
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
  const history = useHistory();
  return (
    <div>
      {error && <h3>{ error }</h3>}
      <form>
<<<<<<< HEAD
        <label htmlFor="email">
          E-Mail
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
          type="submit"
          onClick={ (event) => handleSignIn(event, email, password, setError, history) }
          data-testid="signin-btn"
=======
        <label htmlFor='email'>E-Mail</label>
        <input
          type='email'
          name='email'
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          name='password'
          minLength='6'
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button
          onClick={(event) =>
            handleSignIn(event, email, password, setError, history)
          }
>>>>>>> 1d6aeea636a55d240ab724a597020aca5c95b6ed
        >
          Entrar
        </button>
      </form>
<<<<<<< HEAD
      <Link to="/register"><button type="button" data-testid="no-account-btn">Ainda não tenho conta</button></Link>
=======
      <Link to='/register'>
        <button>Ainda não tenho conta</button>
      </Link>
>>>>>>> 1d6aeea636a55d240ab724a597020aca5c95b6ed
    </div>
  );
}

export default Login;
