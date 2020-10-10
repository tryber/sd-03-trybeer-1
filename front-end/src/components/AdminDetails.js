import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import './AdminDetails.css';

const two = 2;

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

const adjustNumber = (number) => {
  return number.toFixed(two).toString().replace('.', ',');
}

function AdminDetails(props) {
  const { id } = props.props.match.params;
  const { orders, setOrders } = useContext(ContextAplication);
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const order = filterOrder(id, orders) || [];

  return (
    <div>
      { user === null && <Redirect to="/login" />}
      <AdminMenu />
      <div className="details-div">
        <h1>
          Pedido
          {' '}
          {order.id}
          {' '}
          -
          {' '}
          {order.status}
        </h1>
        <h2>Produtos</h2>
        <div className="admin-details-list">
          {order.products.map((p) => (<div key={ p.id } className="admin-details-div">
          <p>{p.qnt}</p>
          <p>{p.name}</p>
          <p>{`R$ ${adjustNumber(p.price * p.qnt)}`}</p>
          <p>{`(R$ ${adjustNumber(p.price)})`}</p>
        </div>))}
        </div>
        
        <h3>
          Total: R$
          {adjustNumber(order.total)}
        </h3>
        {order.status === 'Pendente' && <button onClick={ () => changeStatus(order, orders, setOrders) } type="button">Marcar como entregue</button>}
      </div>

    </div>
  );
}

export default AdminDetails;
