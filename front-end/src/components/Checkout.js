import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ClientMenu } from './Menu/index';
import CheckoutCard from './CheckoutCard';
import toBRCurrency from '../helpers/currency';
import totalPrice from '../helpers/reduceCart';

const localCart = JSON.parse(localStorage.getItem('cart')) || [];
const zero = 0;
const user = JSON.parse(localStorage.getItem('user')) || null;

function itemIndexAndCopyCart(id) {
  const copyCart = [...localCart];
  const item = copyCart.find((product) => id === product.id);
  const indexOfItem = copyCart.indexOf(item);
  return { copyCart, indexOfItem };
}

async function submitBuy(e, cart, street, streetNumber, setMessage) {
  e.preventDefault();
  try {
    const { token } = user;
    const headers = { authorization: token };
    const response = await axios.post(
      'http://localhost:3001/profile', { cart, street, streetNumber }, { headers },
    );
    if (!response) throw Error;
    return setMessage('Compra realizada com sucesso!');
  } catch (_error) {
    return setMessage('Algum Erro aconteceu com sua compra, tente novamente maisa tarde.');
  }
}

export default function Checkout() {
  const [cart, setCart] = useState(localCart);
  const [disabled, setDisabled] = useState(true);
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [message, setMessage] = useState('');

  function changeQuantity(id, value) {
    const { copyCart, indexOfItem } = itemIndexAndCopyCart(id);
    copyCart[indexOfItem].quantity = parseInt(value, 10);
    localStorage.setItem('cart', JSON.stringify(copyCart));
    setCart(copyCart);
  }

  function removeItem(target, id) {
    const { copyCart, indexOfItem } = itemIndexAndCopyCart(id);
    copyCart.splice(indexOfItem, 1);
    localStorage.setItem('cart', JSON.stringify(copyCart));
    setCart(copyCart);
    target.parentNode.remove();
  }

  useEffect(() => {
    if (!cart.lenght) setMessage('Não há produtos no carrinho');
    if (totalPrice(cart) <= zero || street.lenght || streetNumber.lenght) setDisabled(true);
    setDisabled(false);
  }, [cart, streetNumber, street]);

  return (
    <div>
      { !user && <Redirect to="/login" />}
      <ClientMenu />
      <h3>Produtos</h3>
      <h2>{ message }</h2>
      {cart.map((product, index) => CheckoutCard(product, index, removeItem, changeQuantity))}
      <h6 data-testid="order-total-value">{toBRCurrency(totalPrice(cart))}</h6>
      <h3>Endereço</h3>
      <form>
        <input type="text" data-testid="checkout-street-input" value={ street } onChange={ ({ target }) => setStreet(target.value) } />
        <input type="number" data-testid="checkout-house-number-input" min="1" value={ streetNumber } onChange={ ({ target }) => setStreetNumber(target.value) } />
        <button
          type="submit"
          data-testid="checkout-finish-btn"
          disabled={ disabled }
          onClick={ (e) => submitBuy(e, cart, street, streetNumber, setMessage) }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
