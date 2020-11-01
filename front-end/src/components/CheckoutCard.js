import React from 'react';
import {
  TableRow,
  TableCell,Button
} from '@material-ui/core';
import toBRCurrency from '../helpers/currency';
import './CheckoutCard.css';
// /* type="text" min="0" */
export default function card({ name, price, quantity }, index, removeItem) {
  return (
    <TableRow key={name} className='card'>
      <TableCell>
        <p data-testid={`${index}-product-qtd-input`}>{quantity}</p>
      </TableCell>
      <TableCell>
      <h6 data-testid={`${index}-product-name`}>{name}</h6>
      </TableCell>
      <TableCell>
      <h6 data-testid={`${index}-product-total-value`}>
        {toBRCurrency(quantity * price)}
      </h6>
      </TableCell>
      <TableCell>
      <p data-testid={`${index}-product-unit-price`}>{`(${toBRCurrency(
        price
      )} un)`}</p>
      </TableCell>
      <TableCell>
      <Button 
        color='secondary'
        data-testid={`${index}-removal-button`}
        type='button'
        variant="contained"
        onClick={({ target }) => removeItem(target)}
      >
        X
      </Button>
      </TableCell>
      </TableRow>
  );
}
