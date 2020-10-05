import React, { useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import './AdminOrders.css';
import axios from 'axios';

const two = 2;

const getOrdersList = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get('http://localhost:3001/admin/orders', { headers: { authorization: token } });
  const orders = response.data;
  return orders;
};

function AdminOrders() {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const { orders, setOrders } = useContext(ContextAplication);

  const getData = async () => {
    try {
      const data = await getOrdersList() || [];
      setOrders(data);
    } catch (e) {
      return e;
    }
    return false;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      { user === null && <Redirect to="/login" />}
      <AdminMenu />
      <div className="orders-list">
        {orders.map((o, index) => (
          <Link to={ `/admin/orders/${o.saleId}` } key={ o.saleId }>
            <div className="order-card">
              <p data-testid={ `${index}-order-number` }>
                Pedido
                {o.saleId}
              </p>
              <p data-testid={ `${index}-order-address` }>
                {' '}
                {`${o.address}, ${o.number}`}
              </p>
              <p data-testid={ `${index}-order-total-value` }>
                R$
                {` ${o.total.toFixed(two).toString().replace('.', ',')}`}
              </p>
              <p data-testid={ `${index}-order-status` }>
                {' '}
                {o.status}
              </p>
            </div>
          </Link>))}
      </div>
    </div>
  );
}

export default AdminOrders;
