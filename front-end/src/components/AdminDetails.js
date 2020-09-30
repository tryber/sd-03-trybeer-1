import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';

const filterOrder = (id, orders) => {
  const orderSelected = orders.filter((order) => parseInt(order.id, 10) === parseInt(id, 10));
  return orderSelected[0];
};

const changeStatus = (order, orders, setOrders) => {
  let ordersUpdate = orders.reduce((acc, o) => {
    if (parseInt(o.id, 10) !== parseInt(order.id, 10)) { acc.push(o); }
    return acc;
  }, []);
  order.status = 'Entregue';
  ordersUpdate = [...ordersUpdate, order];
  setOrders(ordersUpdate);
};

function AdminDetails(props) {
  const { id } = props.props.match.params;
  const { orders, setOrders } = useContext(ContextAplication);
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const order = filterOrder(id, orders) || [];

  return (
    <div>
      { user === null && <Redirect to="/login" />}
      <AdminMenu />
      <h1>
        Pedido
        { order.id }
        {' '}
        -
        { order.status }
      </h1>
      { order.products.map((p) => (<div key={ p.id }>
        <p>{ p.qnt }</p>
        <p>{ p.name }</p>
        <p>{ `R$ ${p.price * p.qnt}` }</p>
        <p>{ `(R$ ${p.price})` }</p>
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
