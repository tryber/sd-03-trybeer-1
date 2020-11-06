import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { ClientMenu, AdminMenu } from './Menu/index';
import toBRCurrency from '../helpers/currency';
import './Orders.css';

const getOrders = async (setOrders, setMessage) => {
  try {
    const lastStorage = JSON.parse(localStorage.getItem('user'));
    const { token } = lastStorage;
    const headers = { authorization: token };
    const response = await axios.get('http://localhost:3001/orders', {
      headers,
    });
    if (!response) throw Error;
    if (!response.data) return setMessage('Não há pedidos');
    return setOrders(response.data);
  } catch (err) {
    return setMessage('Algum erro aconteceu');
  }
};

const orderCard = (index, { saleDate, totalPrice, id }) => {
  const startingOrderNumber = 1;
  return (
    <Grid item>
      <Paper className="orderCard">
        <Link to={ `/orders/${id}` } key={ `order-${index}` }>
          <div data-testid={ `${index}-order-container` }>
            <h3 data-testid={ `${index}-order-number` }>
              {`Pedido ${index + startingOrderNumber}`}
            </h3>
            <h4 data-testid={ `${index}-order-date` }>
              {new Date(saleDate).toLocaleDateString('pt-BR')}
            </h4>
            <h4 data-testid={ `${index}-order-total-value` }>
              {toBRCurrency(totalPrice)}
            </h4>
          </div>
        </Link>
      </Paper>
    </Grid>
  );
};

export default function Orders() {
  const [message, setMessage] = useState('');
  const lastStorage = JSON.parse(localStorage.getItem('user')) || {};
  const { role } = lastStorage;
  const history = useHistory();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!lastStorage || !lastStorage.token) history.push('/login');
    // if (!orders || !orders.length) getOrders(setOrders, setMessage);
  }, [lastStorage, orders, history, setMessage]);
  useEffect(() => {
    getOrders(setOrders, setMessage);
  }, []);

  return (
    <div>
      {role === 'admin' ? <AdminMenu /> : <ClientMenu />}
      <h1 data-testid="top-title">Meus Pedidos</h1>
      {message && <h3>{message}</h3>}
      <Grid
        container
        spacing={ 6 }
        className="ordersContainer"
        direction="column"
        justify="center"
        alignItems="center"
      >
        {orders && orders.map((order, index) => orderCard(index, order))}
      </Grid>
    </div>
  );
}
