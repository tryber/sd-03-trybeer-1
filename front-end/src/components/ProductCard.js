import React, { useState } from 'react';

const zero = 0;
const plusOne = 1;
const minusOne = -1;
const two = 2;

const deleteProduct = (p, cart) => {
  const newCart = cart.reduce((acc, product) => {
    if (product.product.id !== p.id) {
      acc.push(product);
    }
    return acc;
  }, []);
  localStorage.setItem('cart', JSON.stringify(newCart));
};

const updateCart = (add, qnt, setQnt, p) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (qnt + add > zero) {
    setQnt(qnt + add);
    const answer = cart.some((item) => item.product.product === p.product);
    if (answer) {
      const newCart = cart.reduce((acc, product) => {
        if (product.product.id !== p.id) {
          acc.push(product);
        }
        return acc;
      }, []);
      localStorage.setItem('cart', JSON.stringify([...newCart, { product: p, qnt: qnt + add }]));
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { product: p, qnt: qnt + add }]));
    }
  } else {
    setQnt(zero);
    deleteProduct(p, cart);
  }
};

const defineQnt = (p, cart) => {
  const answer = cart.filter((item) => item.product.product === p.product);
  if (answer.length !== zero) {
    return answer[0].qnt;
  }
  return zero;
};

const ProductCard = (p, index, cart) => {
  const { name, price, image } = p;

  return (
    <div className="product-card" key={`product-${index}`}>
      <img src={ image } alt={ name } data-testid={ `${index}-product-img` } />
      <h3 data-testid={ `${index}-product-name` }>{ name }</h3>
      <p data-testid={ `${index}-product-price` }>
        R$
        { ` ${price.toFixed(two).toString().replace('.', ',')}` }
      </p>
      <div className="quantity-div">
        <button type="button" data-testid={ `${index}-product-minus` } onClick={ () => updateCart(minusOne, qnt, setQnt, p) }> - </button>
        <p data-testid={ `${index}-product-qtd` }>{ qnt }</p>
        <button type="button" data-testid={ `${index}-product-plus` } onClick={ () => updateCart(plusOne, qnt, setQnt, p) }> + </button>
      </div>
    </div>
  );
};

export default ProductCard;
