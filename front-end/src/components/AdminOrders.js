import React, { useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import './AdminOrders.css';

const two = 2;

const apiCall = () => ({
  data: [{
    id: 1,
    user: 1,
    address: 'Rua 1, numero 2',
    products: [{
      id: 1, name: 'Skol Lata 250ml', price: 2.20, qnt: 2,
    }, {
      id: 4, name: 'Brahma 600ml', price: 7.50, qnt: 4,
    }],
    total: 34.40,
    status: 'Pendente',
  }, {
    id: 2,
    user: 2,
    address: 'Rua 4A, numero 5',
    products: [{
      id: 1, name: 'Skol Lata 250ml', price: 2.20, qnt: 10,
    }, {
      id: 4, name: 'Brahma 600ml', price: 7.50, qnt: 5,
    }],
    total: 59.50,
    status: 'Entregue',
  }],
});

const getOrdersList = async () => {
  // const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await apiCall();
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
          <Link to={ `/admin/orders/${o.id}` } key={ o.id } className="order-card">
            <div>
              <p data-testid={ `${index}-order-number` }>
                Pedido
                {` ${o.id}`}
              </p>
              <p data-testid={ `${index}-order-address` }>
                Endereço:
                {` ${o.address}`}
              </p>
              <p data-testid={ `${index}-order-total-value` }>
                R$
                {` ${o.total.toFixed(two).toString().replace('.', ',')}`}
              </p>
              <p data-testid={ `${index}-order-status` } className="order-status">
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
