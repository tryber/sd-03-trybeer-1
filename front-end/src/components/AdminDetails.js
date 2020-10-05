import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import axios from 'axios';

const filterOrder = (id, orders) => {
  const orderSelected = orders.filter((order) => parseInt(order.id, 10) === parseInt(id, 10));
  return orderSelected[0];
};

const getOrder = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`http://localhost:3001/admin/orders/${id}`, { headers: { authorization: token } });
  return response.data;
}

const changeStatus = (order, orders, setOrders) => {
  let ordersUpdate = orders.reduce((acc, o) => {
    if (parseInt(o.id, 10) !== parseInt(order.id, 10)) { acc.push(o); }
    return acc;
  }, []);
  order.status = 'Entregue';
  ordersUpdate = [...ordersUpdate, order];
  setOrders(ordersUpdate);
};

async function AdminDetails(props) {
  const { id } = props.props.match.params;
  const { orders, setOrders, order, setOrder } = useContext(ContextAplication);
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const getData = async () => {
    try {
      const data = await getOrder(id) || [];
      setOrder(data);
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
      <h1>
        Pedido
        { order.saleId }
        {' '}
        -
        { order.status }
      </h1>
      { order.saleProducts.map((p) => (<div key={ p.soldProductId }>
        <p>{ p.soldQuantity }</p>
        <p>{ p.productName }</p>
        <p>{ `R$ ${p.productPrice * p.soldQuantity}` }</p>
        <p>{ `(R$ ${p.productPrice})` }</p>
      </div>)) }
      <h3>
        Total:
        { order.total }
      </h3>
      { order.status === 'Pendente' && <button onClick={ () => changeStatus(order, orders, setOrders) } type="button">Marcar como entregue</button>}
    </div>
  );
}

export default AdminDetails;
