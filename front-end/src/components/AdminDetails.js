import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import currency from '../helpers/currency';

const getOrder = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`http://localhost:3001/admin/orders/${id}`, { headers: { authorization: token } });
  return response.data;
};

const changeStatus = async (id, order, setOrder) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  await axios.put(`http://localhost:3001/admin/orders/${id}`, { status: 'Entregue' }, { headers: { authorization: token } });

  const newOrder = { ...order, status: 'Entregue' };
  setOrder(newOrder);
};

const AdminDetails = () => {
  const { order, setOrder, id } = useContext(ContextAplication);
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOrder(id) || [];
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
      { user === null && <Redirect to="/login" />}
      <AdminMenu />
      <h1>
        Pedido
        {' '}
        { order.saleId }
        {' '}
        -
        {' '}
        { order.status }
      </h1>
      { order.saleProducts.map((p) => (
        <div key={ p.soldProductId }>
          <p>{ p.soldQuantity }</p>
          <p>{ p.productName }</p>
          <p>{ `R$ ${currency(p.productPrice * p.soldQuantity)}` }</p>
          <p>{ `(R$ ${currency(p.productPrice)})` }</p>
        </div>)) }
      <h3>
        Total:
        {' '}
        { `R$ ${order.total}` }
      </h3>
      { order.status === 'Pendente' && <button onClick={ () => changeStatus(id, order, setOrder) } type="button">Marcar como entregue</button>}
    </div>
  );
};

export default AdminDetails;
