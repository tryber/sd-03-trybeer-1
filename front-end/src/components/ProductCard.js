import React from 'react';
import { Card, Button, Paper, CardContent } from '@material-ui/core';

const minusOne = -1;
const plusOne = 1;
const zero = 0;
const two = 2;

const defineQnt = (p, cart) => {
  const answer = cart.filter((item) => item.id === p.id);
  if (answer.length !== zero) {
    return answer[0].quantity;
  }
  return zero;
};

const ProductCard = (p, index, cart, addItem) => {
  const { name, price, image } = p;
  return (
    <Card className='product-card' key={`${p}-${index}`}>
      <Paper height='33vh' variant="outlined">
        <img src={image} alt={name} data-testid={`${index}-product-img`} />
      </Paper>
      <h3 data-testid={`${index}-product-name`}>{name}</h3>
      <p data-testid={`${index}-product-price`}>
        R$
        {` ${price.toFixed(two).toString().replace('.', ',')}`}
      </p>
      <CardContent className='quantity-div'>
        <Button
          variant='contained'
          color='secondary'
          data-testid={`${index}-product-minus`}
          onClick={() => addItem(p, minusOne)}
        >
          {' '}
          -{' '}
        </Button>
        <p data-testid={`${index}-product-qtd`}>{defineQnt(p, cart)}</p>
        <Button
          variant='contained'
          color='primary'
          data-testid={`${index}-product-plus`}
          onClick={() => addItem(p, plusOne)}
        >
          {' '}
          +{' '}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
