import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import axios from 'axios';
import { ClientMenu } from './Menu/index';
import toBRCurrency from '../helpers/currency';
import './OrderDetails'
async function getOrder(id, setMessage, setOrder) {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  try {
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
    productName, productPrice, soldQuantity,
  },
  index,
) {
  return (
    <TableRow key={ productName }>
      <TableCell data-testid={ `${index}-product-qtd` }>{soldQuantity}</TableCell>
      <TableCell data-testid={ `${index}-product-name` }>{productName}</TableCell>
      <TableCell data-testid={ `${index}-product-total-value` }>{toBRCurrency(soldQuantity * productPrice)}</TableCell>
    </TableRow>
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
  if (!user) return <Redirect to="/login" />;
  return (
    <div>
      <ClientMenu />
      <div style={ { padding: '10vh' } }>
        <h3 data-testid="top-title">Detalhes de Pedido</h3>
        <h2>{ message }</h2>
        <h4 data-testid="order-number">
          Pedido
          {' '}
          { order.saleId }
        </h4>
        <h4 data-testid="order-date">
          {' '}
          {new Date(order.saleDate).toLocaleDateString('pt-BR')}
          {' '}
        </h4>
        <Table>
        <TableHead>
        <TableRow>
          <TableCell>Unidades</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Preço Total</TableCell>
        </TableRow>
      </TableHead>
          {
            order.saleProducts
            && order.saleProducts.map((product, index) => productRow(product, index))
          }
        </Table>
        <h4 data-testid="order-total-value">
          Total:
          {' '}
          { order.total && toBRCurrency(order.total) }
        </h4>
      </div>
    </div>
  );
}
