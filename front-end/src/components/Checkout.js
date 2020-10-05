import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ClientMenu } from './Menu/index';
import CheckoutCard from './CheckoutCard';
import toBRCurrency from '../helpers/currency';
import totalPrice from '../helpers/reduceCart';

// const localCart = JSON.parse(localStorage.getItem('cart'));
const zero = 0;
const fadeOut = 5000;
async function submitBuy(e, cart, street, streetNumber, setMessage, history) {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  try {
    const { token } = user;
    const headers = { authorization: token };
    const response = await axios.post(
      'http://localhost:3001/checkout', { cart, street, streetNumber }, { headers },
    );
    if (!response) throw Error;
    setMessage('Compra realizada com sucesso!');
    return setTimeout(() => history.push('/products'), fadeOut);
  } catch (_error) {
    return setMessage('Algum Erro aconteceu com sua compra, tente novamente mais tarde.');
  }
}

export default function Checkout() {
  const localCart = JSON.parse(localStorage.getItem('cart')) || null;
  function itemIndexAndCopyCart(id) {
    const copyCart = [...localCart];
    const item = copyCart.find((product) => id === product.id);
    const indexOfItem = copyCart.indexOf(item);
    return { copyCart, indexOfItem };
  }
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const [cart, setCart] = useState(localCart);
  const [disabled, setDisabled] = useState(true);
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  function removeItem(id) {
    const { copyCart, indexOfItem } = itemIndexAndCopyCart(id);
    copyCart.splice(indexOfItem, 1);
    localStorage.setItem('cart', JSON.stringify(copyCart));
    setCart(copyCart);
    if (!copyCart.lenght) setMessage('Não há produtos no carrinho');
  }

  useEffect(() => {
    if (totalPrice(localCart || []) <= zero || !street || !streetNumber) return setDisabled(true);
    return setDisabled(false);
  }, [streetNumber, street, localCart]);

  useEffect(() => {
    if (totalPrice(localCart || []) <= zero) setMessage('Não há produtos no carrinho');
  }, [cart, localCart]);

  useEffect(() => {

  }, [message])

  return !user ? <Redirect to="/login" /> : (
    <div>
      <ClientMenu />
      <div style={ { padding: '10vh 20vh' } }>
        <h3>Produtos</h3>
        <h2>{ message }</h2>
        <div>
          {cart && cart.map((product, index) => CheckoutCard(product, index, removeItem))}
        </div>
        <h6 data-testid="order-total-value">
          {' '}
          { toBRCurrency(totalPrice(cart)) }
        </h6>
        <h3>Endereço</h3>
        <form display="block">
          <input type="text" data-testid="checkout-street-input" value={ street } onChange={ ({ target }) => setStreet(target.value) } />
          <input type="number" data-testid="checkout-house-number-input" min="1" value={ streetNumber } onChange={ ({ target }) => setStreetNumber(target.value) } />
          <button
            type="submit"
            data-testid="checkout-finish-btn"
            disabled={ disabled }
            onClick={ (e) => submitBuy(e, cart, street, streetNumber, setMessage, history) }
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
