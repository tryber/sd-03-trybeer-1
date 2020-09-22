import React, { createContext, useState } from 'react';

export const ContextAplication = createContext();

const AplicationProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const context = {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
  };

  return (
    <ContextAplication.Provider value={context}>
      {children}
    </ContextAplication.Provider>
  );
};

export default AplicationProvider;
