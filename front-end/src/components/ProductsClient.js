import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ProductCard from './ProductCard';
import ClientMenu from './ClientMenu';
import './ProductsClients.css';

const getProductsList = () => {
  // replace this with API call
  const products = [
    {
      id: '1', product: 'Skol Lata 250ml', price: 2.20, image: 'http://localhost:3001/images/Skol Lata 350ml.jpg',
    },
    {
      id: '2', product: 'Heineken 600ml', price: 7.50, image: 'http://localhost:3001/images/Heineken 600ml.jpg',
    },
    {
      id: '3', product: 'Antarctica Pilsen 300ml', price: 2.49, image: 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg',
    },
    {
      id: '4', product: 'Brahma 600ml', price: 7.50, image: 'http://localhost:3001/images/Brahma 600ml.jpg',
    },
    {
      id: '5', product: 'Skol 269ml', price: 2.19, image: 'http://localhost:3001/images/Skol 269ml.jpg',
    },
    {
      id: '6', product: 'Skol Beats Senses 313ml', price: 4.49, image: 'http://localhost:3001/images/Skol Beats Senses 313ml.jpg',
    },
    {
      id: '7', product: 'Becks 330ml', price: 4.99, image: 'http://localhost:3001/images/Becks 330ml.jpg',
    },
    {
      id: '8', product: 'Brahma Duplo Malte 350ml', price: 2.79, image: 'http://localhost:3001/images/Brahma Duplo Malte 350ml.jpg',
    },
    {
      id: '9', product: 'Becks 600ml', price: 8.89, image: 'http://localhost:3001/images/Becks 600ml.jpg',
    },
    {
      id: '10', product: 'Skol Beats Senses 269ml', price: 3.57, image: 'http://localhost:3001/images/Skol Beats Senses 269ml.jpg',
    },
    {
      id: '11', product: 'Stella Artois 275ml', price: 3.49, image: 'http://localhost:3001/images/Stella Artois 275ml.jpg',
    }];

  return products;
};

const cartTotal = (cart) => cart.reduce((acc, item) => acc + (item.product.price * item.qnt), 0);

function ProductsClient() {
  const products = getProductsList();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const disabled = cart.length < 1 ? true : false;
  return (
    <div className="products-page-div">
      { user === null && <Redirect to="/login"/>}
      <ClientMenu />
      <div className="products-list">
        {products.map((p, index) => ProductCard(p, index, cart))}
      </div>
        <div className="checkout-bottom">
        <Link to="/checkout"><button data-testid="checkout-bottom-btn" disabled={ disabled }>Ver Carrinho</button></Link>
          <p data-testid="checkout-bottom-btn-value">
            R$
            {` ${cartTotal(cart).toFixed(2).toString().replace('.', ",")}`}
          </p>
        </div>
    </div>
  );
}

export default ProductsClient;
