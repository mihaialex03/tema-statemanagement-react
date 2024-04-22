import React, { useContext } from 'react';
import { FavoritesContext } from '../store/Favorites/context';
import { removeFromFavorites } from '../store/Favorites/actions';
import { Button } from 'react-bootstrap';

export function Favorites() {
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);

  function handleProductRemove(productId) {
    const actionResult = removeFromFavorites(productId);
    favoritesDispatch(actionResult);
  }

  return (
    <div className='mx-2'>
      {favoritesState.products.length === 0 ? (
        <p>Nu sunt produse favorite</p>
      ) : (
        favoritesState.products.map((product) => {
          return (
            <div key={product.id} className='m-3'>
              <div className='d-flex align-items justify-content-between mx-4'>
                <img src={product.image} alt={product.name} />
                <strong>{product.name}</strong>
                <p>Pret: {product.price}$</p>
                <Button variant='danger' onClick={() => handleProductRemove(product.id)}>Remove</Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
