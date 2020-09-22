import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ContextAplication } from '../context/ContextAplication';

const handleSignIn = async (e, email, password, setError, history) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/login', { email, password });
    if (response.error) {
      return setError(response.error);
    }
    localStorage.setItem('user', JSON.stringify(response.data));
    setError('');
    return history.push(response.data.role === 'client' ? '/products' : '/admin/profile');
  } catch (err) {
    return setError(err);
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
        <label htmlFor="email">
          E-Mail
          <input type="email" id="email" onChange={ (event) => setEmail(event.target.value) } required />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            minLength="6"
            onChange={ (event) => setPassword(event.target.value) }
            required
          />
        </label>

        <button type="submit" onClick={ (event) => handleSignIn(event, email, password, setError, history) }>Entrar</button>
      </form>
      <Link to="/register"><button type="button">Ainda não tenho conta</button></Link>
    </div>
  );
}

export default Login;