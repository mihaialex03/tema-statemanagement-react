import React, { useContext } from 'react';
import { useCol } from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';

export function Header() {
  const {cartState} = useContext(CartContext);
  const {favoritesState} = useContext(FavoritesContext);
  return (
    <header>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          <Link to="/cart" className="p-3">Coș ({cartState.products.length})</Link>
          <Link to="/favorites" className="p-3">Favorite ({favoritesState.products.length})</Link>
        </div>
      </div>
    </header>
  );
}
