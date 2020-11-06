import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import cheers from '../../images/cheers.png';
import './AdminMenu.css';

const logout = (e, history) => {
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/login');
};

function AdminMenu() {
  const history = useHistory();
  return (
    <aside className="admin-side-bar-container">
      <img src={ cheers } className="logo" alt="Cheers Logo" />
      <div className="menu-links-div">
        <Link to="/admin/orders" data-testid="side-menu-item-orders">
          <Button variant="outlined" color="primary" id="button-link">
            Pedidos
          </Button>
        </Link>
        <Link to="/admin/profile" data-testid="side-menu-item-profile">
          <Button variant="outlined" color="primary" id="button-link">
            Perfil
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="primary"
          data-testid="side-menu-item-logout"
          onClick={ (e) => logout(e, history) }
        >
          Sair
        </Button>
      </div>
    </aside>
  );
}

export default AdminMenu;
