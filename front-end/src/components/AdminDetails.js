import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import axios from 'axios';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import currency from '../helpers/currency';
import './AdminDetails.css';

const getOrder = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`http://localhost:3001/admin/orders/${id}`, {
    headers: { authorization: token },
  });
  const answer = { ...response.data, total: currency(response.data.total) };
  return answer;
};

const changeStatus = async (id, order, setOrder) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  await axios.put(
    `http://localhost:3001/admin/orders/${id}`,
    { status: 'Entregue' },
    { headers: { authorization: token } },
  );

  const newOrder = { ...order, status: 'Entregue' };
  setOrder(newOrder);
};

const AdminDetails = () => {
  const { order, setOrder, id } = useContext(ContextAplication);
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await getOrder(id)) || [];
        setOrder(data);
      } catch (e) {
        return e;
      }
      return false;
    }
    fetchData();
  }, [id, setOrder]);

  return (
    <div>
      {user === null && <Redirect to="/login" />}
      <AdminMenu />
      <div className="order-details-admin">
        <h1 data-testid="order-number">
          Pedido
          {order.saleId}
        </h1>
        <h1 data-testid="order-status">
          Status:
          {order.status}
        </h1>
        <Table className="order-details-table">
          <TableHead>
            <TableRow>
              <TableCell>Unidades</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço Unitário</TableCell>
              <TableCell>Preço Total</TableCell>
            </TableRow>
          </TableHead>
          {order.saleProducts.map((p, index) => (
            <TableRow key={ p.productName }>
              <TableCell data-testid={ `${index}-product-qtd` }>
                {p.soldQuantity}
              </TableCell>
              <TableCell data-testid={ `${index}-product-name` }>
                {p.productName}
              </TableCell>
              <TableCell
                data-testid={ `${index}-order-unit-price` }
              >
                {`(${currency(p.productPrice)})`}
              </TableCell>
              <TableCell data-testid={ `${index}-product-total-value` }>
                {currency(p.productPrice * p.soldQuantity)}
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <h3 data-testid="order-total-value">
          Total:
          {order.total}
        </h3>
        {order.status === 'Pendente' && (
          <Button
            variant="outlined"
            color="primary"
            onClick={ () => changeStatus(id, order, setOrder) }
            data-testid="mark-as-delivered-btn"
          >
            Marcar como entregue
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminDetails;
