import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ClientMenu } from './Menu/index';
import './ProductsClients.css';

const zero = 0;
const two = 2;

const getProductsList = async (url) => {
  // replace this with API call
  const user = JSON.parse(localStorage.getItem('user'))
  const { data } = await axios.get(url, { headers: { authorization: user.token }});
  return data;
};

const cartTotal = (cart) => cart.reduce((acc, item) => acc + (item.product.price * item.qnt), zero);

function ProductsClient() {
  const [memo] = useState('http://localhost:3001/products') 
  const [products, setProducts]= useState([]);

  useEffect(() => {
    async function getData(url) {
      try {
        const data = await getProductsList(url) || [];
        setProducts(data)
      } catch (e) {
        console.log(e);
      }
    }
    getData(memo);
  },[memo])
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const disabled = cart.length < 1;
  return (
    <div className="products-page-div">
      { user === null && <Redirect to="/login" />}
      <ClientMenu />
      <div className="products-list">
        {products.length && products.map((p, index) => ProductCard(p, index, cart))}
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
}

export default ProductsClient;
