import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import { ClientMenu } from './Menu/index';
import './ProductsClients.css';

const zero = 0;
const two = 2;
const plusOne = 1;
const minusOne = -1;

const getProductsList = async () => {
  // replace this with API call
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get('http://localhost:3001/products', { headers: { authorization: token } });
  const products = response.data;
  return products;
};

const cartTotal = (cart) => cart.reduce((acc, item) => acc + (item.price * item.quantity), zero);

const ProductsClient = () => {
  // cart handling based in https://medium.com/javascript-in-plain-english/creating-a-persistent-cart-in-react-f287ed4b4df0
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const localCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(localCart);
  const disabled = cart.length < plusOne;

  const editItem = (itemID, amount) => {
    const cartCopy = [...cart];
    const existentItem = cartCopy.find((item) => item.id === itemID);
    existentItem.quantity += amount;

    if (existentItem.quantity <= zero) {
      const indexOfItem = cartCopy.indexOf(existentItem.id === itemID);
      cartCopy.splice(indexOfItem, plusOne);
    }

    setCart(cartCopy);

    const cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  };

  const addItem = (item, qnt) => {
    const cartCopy = [...cart];
    const { id, price } = item;
    const existingItem = cartCopy.some((cartItem) => cartItem.id === id);

    if (existingItem) {
      return editItem(id, qnt);
    }

    if (qnt === minusOne) return false;

    cartCopy.push({ id, price, quantity: 1 });
    setCart(cartCopy);

    const stringCart = JSON.stringify(cartCopy);
    return localStorage.setItem('cart', stringCart);
  };

  const [products, setProducts] = useState([]);
  const getData = async () => {
    try {
      const data = await getProductsList() || [];
      setProducts(data);
    } catch (e) {
      return e;
    }
    return false;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="products-page-div">
      { user === null && <Redirect to="/login" />}
      <ClientMenu />
      <div className="products-list">
        {products.length && products.map((p, index) => ProductCard(p, index, cart, addItem))}
      </div>
      <div className="checkout-bottom">
        <Link to="/checkout"><button type="button" data-testid="checkout-bottom-btn" disabled={ disabled }>Ver Carrinho</button></Link>
        <p data-testid="checkout-bottom-btn-value">
          R$
          {` ${cartTotal(cart).toFixed(two).toString().replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
};

export default ProductsClient;
