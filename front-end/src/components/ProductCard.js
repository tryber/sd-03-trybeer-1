import React, { useState } from 'react';

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
  if (qnt + add > 0) {
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
    setQnt(0);
    deleteProduct(p, cart);
  }
};

const defineQnt = (p, cart) => {
  const answer = cart.filter((item) => item.product.product === p.product);
  if (answer.length !== 0) {
    return answer[0].qnt;
  }
  return 0;
};

const ProductCard = (p, index, cart) => {
  const { product, price, image } = p;
  const [qnt, setQnt] = useState(defineQnt(p, cart));

  return (
    <div className="product-card">
      <img src={ image } alt={ product } data-testid={ `${index}-product-img` } />
      <h3 data-testid={ `${index}-product-name` }>{ product }</h3>
      <p data-testid={ `${index}-product-price` }>
        R$
        { ` ${price.toFixed(2).toString().replace('.', ",")}` }
      </p>
      <div className="quantity-div">
        <button type="button" data-testid={ `${index}-product-minus` } onClick={ () => updateCart(-1, qnt, setQnt, p) }> - </button>
        <p data-testid={ `${index}-product-qtd` }>{ qnt }</p>
        <button type="button" data-testid={ `${index}-product-plus` } onClick={ () => updateCart(1, qnt, setQnt, p) }> + </button>
      </div>
    </div>
  );
};

export default ProductCard;
