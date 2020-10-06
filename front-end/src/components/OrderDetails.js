import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import { ClientMenu } from './Menu/index';
import toBRCurrency from '../helpers/currency';

async function getOrder(id, setMessage, setOrder) {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  try {
    console.log('mae to na globo');
    const { token } = user;
    const headers = { authorization: token };
    const response = await axios.get(
      `http://localhost:3001/orders/${id}`, { headers },
    );
    if (!response) throw Error;
    return setOrder(response.data);
  } catch (_error) {
    // setOrder(orderMock.cart);
    return setMessage('Algum Erro aconteceu com seus pedidos, tente novamente mais tarde.');
  }
}

function productRow(
  {
    name, price, quantity,
  },
  index,
) {
  return (
    <div>
      <p data-testid={ `${index}-product-qtd` }>{quantity}</p>
      <h6 data-testid={ `${index}-product-name` }>{name}</h6>
      <h6 data-testid={ `${index}-product-total-value` }>{toBRCurrency(quantity * price)}</h6>
    </div>
  );
}

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const [message, setMessage] = useState('');
  const [order, setOrder] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (!order) getOrder(id, setMessage, setOrder);
  }, [order, id]);
  console.log(order);
  if (!user) return <Redirect to="/login" />;
  return order && (
    <div>
      <ClientMenu />
      <div style={ { padding: '10vh 20vh' } }>
        <h3 data-testid="top-title">Detalhes de Pedido</h3>
        <h2>{ message }</h2>
        <div>
          {order.length && order.map((product, index) => productRow(product, index))}
        </div>
        <h6 data-testid="order-total-value">
          Total:
          {' '}
          { toBRCurrency(order.total) }
        </h6>
      </div>
    </div>
  );
}
