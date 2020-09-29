import React from 'react';
import toBRCurrency from '../helpers/currency';

export default function card(
  {
    id, name, price, quantity,
  },
  index, removeItem, changeQuantity,
) {
  return (
    <div>
      <div>
        <input type="number" min="0" data-testid={ `${index}-product-qtd-input` } onChange={ ({ target: { value } }) => changeQuantity(id, value) } value={ quantity } />
        <h6 data-testid={ `${index}-product-name` }>{name}</h6>
        <h6 data-testid={ `${index}-product-total-value` }>{toBRCurrency(quantity * price)}</h6>
        <p data-testid={ `${index}-product-unit-price` }>{`(${toBRCurrency(price)} un)`}</p>
        <button data-testid={ `${index}-removal-button` } type="button" onClick={ ({ target }) => removeItem(target) }>X</button>
      </div>
    </div>
  );
}
