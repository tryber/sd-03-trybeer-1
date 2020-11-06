import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './ClientMenu.css';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import cheers from '../../images/cheers.png';

const drawerWidth = 240;
const three = 3;
const zero = 0;
const two = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(two),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(zero, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(three),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const logout = (e, history) => {
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/login');
};

function ClientMenu() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={ classes.root }>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="white"
        className={ clsx(classes.appBar, {
          [classes.appBarShift]: open,
        }) }
      >
        <div className="top-menu">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <FontAwesomeIcon icon={ faBars } size="1x" data-testid="top-hamburguer" id="main-icon" />
          </IconButton>
          <img src={ cheers } alt="Cheers Logo" />
        </div>
      </AppBar>
      <Drawer
        className={ classes.drawer }
        variant="persistent"
        anchor="left"
        open={ open }
        classes={ {
          paper: classes.drawerPaper,
        } }
      >
        <div className={ classes.drawerHeader }>
          <FontAwesomeIcon icon={ faBars } size="2x" data-testid="top-hamburguer" onClick={ handleDrawerClose } />
        </div>
        <div className="menu-links">
          <Link to="/products" data-testid="side-menu-item-products">
            <Button variant="outlined" color="primary" id="button-link-client">
              Produtos
            </Button>
          </Link>
          <Link to="/orders" data-testid="side-menu-item-my-orders">
            <Button variant="outlined" color="primary" id="button-link-client">
              Meus Pedidos
            </Button>
          </Link>
          <Link to="/profile" data-testid="side-menu-item-my-profile">
            <Button variant="outlined" color="primary" id="button-link-client">
              Meu Perfil
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="primary"
            data-testid="side-menu-item-logout"
            className="logout-button"
            onClick={ (e) => logout(e, history) }
          >
            Sair
          </Button>
        </div>
      </Drawer>
      <main
        className={ clsx(classes.content, {
          [classes.contentShift]: open,
        }) }
      >
        <div className={ classes.drawerHeader } />
      </main>
    </div>
  );
}

export default ClientMenu;
