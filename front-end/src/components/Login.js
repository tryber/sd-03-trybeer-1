import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ContextAplication } from '../context/ContextAplication';
import axios from 'axios';

const handleSignIn = async (e, email, password, setError, history) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3001/login",{ email, password });
    if (response.error) {
      return setError(response.error)
    };
    localStorage.setItem('user', JSON.stringify(response.data));
    setError('');
    history.push(response.data.role === 'client' ? '/products' : '/admin/profile');
  } catch (err) {
    console.log('Deu ruim', err)
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
      {error && <h3>{error}</h3>}
      <form>
        <label htmlFor="email">E-Mail</label>
        <input type="email" name="email" onChange={(event) => setEmail(event.target.value)} required />

        <label htmlFor="password">Senha</label>
        <input type="password" name="password" minLength="6" onChange={(event) => setPassword(event.target.value)} required />

        <button onClick={(event) => handleSignIn(event, email, password, setError, history)}>Entrar</button>
      </form>
      <Link to="/register"><button>Ainda não tenho conta</button></Link>
    </div>
  )
}

export default Login
