import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { ClientMenu, AdminMenu } from './Menu/index';
import toBRCurrency from '../helpers/currency';

const orderMock = [
  {
    id: 1,
    totalPrice: 20,
    date: 'hoje',
    cart: [{ name: 'litrão', price: 7, id: 7 }],
  },
  {
    id: 2,
    totalPrice: 20,
    date: 'hoje',
    cart: [
      {
        name: 'litrão', price: 7, id: 7, quantity: 2,
      },
      {
        name: 'mandioquinha firta', id: 2, price: 14, quantity: 1,
      },
    ],
  },
];

const getOrders = async (setOrders, setMessage) => {
  try {
    console.log('to pegando mãe');
    const lastStorage = JSON.parse(localStorage.getItem('user'));
    const { token } = lastStorage;
    const headers = { authorization: token };
    const response = await axios.get('http://localhost:3001/orders', {
      headers,
    });
    if (!response) throw Error;
    if (!response.data) return setMessage('Não há pedidos');
    setOrders(response.data);
    return setMessage('Atualização concluída com sucesso');
  } catch (err) {
    return setOrders(orderMock.cart);
    // return setMessage('Algum erro aconteceu');
  }
};

const orderCard = (index, { date, totalPrice, id }) => {
  const startingOrderNumber = 1;
  return (
    <Link to={ `/orders/${id}` }>
      <div data-testid={ `${index}-order-container` }>
        <h3 data-testid={ `${index}-order-number` }>
          {index + startingOrderNumber}
        </h3>
        <h4 data-testid={ `${index}-order-date` }>{date}</h4>
        <h4 data-testid={ `${index}-order-value` }>{toBRCurrency(totalPrice)}</h4>
      </div>
    </Link>
  );
};

export default function Orders() {
  const [message, setMessage] = useState('');
  const lastStorage = JSON.parse(localStorage.getItem('user')) || {};
  const { role } = lastStorage;
  const history = useHistory();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(orders);
    if (!lastStorage || !lastStorage.token) history.push('/login');
    if (!orders.length) getOrders(setOrders, setMessage);
  }, [lastStorage, orders, history, setMessage]);

  return (
    <div>
      {role === 'admin' ? <AdminMenu /> : <ClientMenu />}
      <h1 data-testid="top-title">Meus Pedidos</h1>
      {message && <h3>{message}</h3>}
      <div>{orders.map((order, index) => orderCard(index, order))}</div>
    </div>
  );
}
