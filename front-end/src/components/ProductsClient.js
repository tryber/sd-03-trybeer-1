import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductsClients.css';

const getProductsList = () => {
  // replace this with API call
  const products = [
    { id: '1', product: 'Skol Lata 250ml', price: 2.20, image: 'http://localhost:3001/images/Skol Lata 350ml.jpg' },
    { id: '2', product: 'Heineken 600ml', price: 7.50, image: 'http://localhost:3001/images/Heineken 600ml.jpg' },
    { id: '3', product: 'Antarctica Pilsen 300ml', price: 2.49, image: 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg' },
    { id: '4', product: 'Brahma 600ml', price: 7.50, image: 'http://localhost:3001/images/Brahma 600ml.jpg' },
    { id: '5', product: 'Skol 269ml', price: 2.19, image: 'http://localhost:3001/images/Skol 269ml.jpg' },
    { id: '6', product: 'Skol Beats Senses 313ml', price: 4.49, image: 'http://localhost:3001/images/Skol Beats Senses 313ml.jpg' },
    { id: '7', product: 'Becks 330ml', price: 4.99, image: 'http://localhost:3001/images/Becks 330ml.jpg' },
    { id: '8', product: 'Brahma Duplo Malte 350ml', price: 2.79, image: 'http://localhost:3001/images/Brahma Duplo Malte 350ml.jpg' },
    { id: '9', product: 'Becks 600ml', price: 8.89, image: 'http://localhost:3001/images/Becks 600ml.jpg' },
    { id: '10', product: 'Skol Beats Senses 269ml', price: 3.57, image: 'http://localhost:3001/images/Skol Beats Senses 269ml.jpg' },
    { id: '11', product: 'Stella Artois 275ml', price: 3.49, image: 'http://localhost:3001/images/Stella Artois 275ml.jpg' }]

  return products;
};

const deleteProduct = (p, cart) => {
  const newCart = cart.reduce((acc, product) => {
    if (product.product.id !== p.id) {
      acc.push(product);
    }
    return acc;
  }, [])
  localStorage.setItem('cart', JSON.stringify(newCart))
}

const updateCart = (add, qnt, setQnt, p) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (qnt + add > 0) {
    setQnt(qnt + add);
    const answer = cart.some((item) => item.product.product === p.product);
    if (answer) {
      const newCart = cart.reduce((acc, product) => {
        if (product.product.id !== p.id) {
          acc.push(product);
        }
        return acc;
      }, [])
      localStorage.setItem('cart', JSON.stringify([...newCart, { product: p, qnt: qnt + add }]))
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { product: p, qnt: qnt + add }]))
    }
  } else {
    setQnt(0);
    deleteProduct(p, cart);
  }
}

const defineQnt = (p, cart) => {
  const answer = cart.filter((item) => item.product.product === p.product);
  if (answer.length !== 0) {
    return answer[0].qnt
  }
  return 0
}

const ProductCard = (p, index, cart) => {
  const { product, price, image } = p;
  const [qnt, setQnt] = useState(defineQnt(p, cart));

  return (
    <div className="product-card">
      <img src={image} alt={product} data-testid={`${index}-product-img`} />
      <h3 data-testid={`${index}-product-name`}>{product}</h3>
      <p data-testid={`${index}-product-price`}>R$ {price.toFixed(2)}</p>
      <div className="quantity-div">
        <button data-testid={`${index}-product-minus`} onClick={() => updateCart(-1, qnt, setQnt, p)}> - </button>
        <p data-testid={`${index}-product-qtd`}>{qnt}</p>
        <button data-testid={`${index}-product-plus`} onClick={() => updateCart(  1, qnt, setQnt, p)}> + </button>
      </div>
    </div>
  )
}

const cartTotal = (cart) => {
  return cart.reduce((acc, item) => {
    return acc + (item.product.price * item.qnt)
  }, 0)
}

function ProductsClient() {

  const products = getProductsList();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return (
    <div>
      <div className="products-list">
        {products.map((p, index) => ProductCard(p, index, cart))}
      </div>
        {cart.length !== 0 &&
          <div>
            <Link to="/checkout"><h2 data-testid="checkout-bottom-btn">Ver carrinho</h2></Link>
            <p data-testid="checkout-bottom-btn-value">R$ {cartTotal(cart).toFixed(2)}</p>
          </div>
        }
    </div>
  )
}

export default ProductsClient
