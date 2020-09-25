import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import menuIcon from '../../images/hamburguer-menu.png';
import './ClientMenu.css';

const logout = (e, history) => {
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/login');
};

const sidebarVisibility = (sidebar, setSidebar) => {
  if (sidebar === 'sidebar-hidden') return setSidebar('sidebar');
  return setSidebar('sidebar-hidden');
};

function ClientMenu() {
  const [sidebar, setSidebar] = useState('sidebar-hidden');
  const history = useHistory();
  return (
    <div>
      <navbar className="top-menu">
        <button type="button" onClick={ () => sidebarVisibility(sidebar, setSidebar) }>
          <img
            className="menu-icon"
            src={ menuIcon }
            alt="menu icon"
            data-testid="top-hamburguer"
          />
        </button>
        <h1 data-testid="top-title">TryBeer</h1>
      </navbar>
      <aside className={ `${sidebar} side-menu-container` }>
        <div>
          <Link to="/products" data-testid="side-menu-item-products"><button type="button">Produtos</button></Link>
          <Link to="/orders" data-testid="side-menu-item-my-orders"><button type="button">Meus Pedidos</button></Link>
          <Link to="/profile" data-testid="side-menu-item-my-profile"><button type="button">Meu Perfil</button></Link>
          <button type="submit" data-testid="side-menu-item-logout" onClick={ (e) => logout(e, history) }>Sair</button>
        </div>
      </aside>
    </div>
  );
}

export default ClientMenu;
