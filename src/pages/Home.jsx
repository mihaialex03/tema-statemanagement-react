import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../store/Theme/context';
import { setThemeDark, setThemeLight } from '../store/Theme/actions';
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import {FavoritesContext} from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';

export function Home() {
  // Cerem 4 produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);
  // vom accesa si vom modifica state ul global de tema
  const {themeState, themeDispatch} = useContext(ThemeContext);
  const {cartDispatch} = useContext(CartContext);

  const {favoritesDispatch} = useContext(FavoritesContext);

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=4')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);
   const {theme} = themeState;
   function handleThemeChange(){
    let actionResult;
    if(theme === "light"){
      actionResult = setThemeDark();
      themeDispatch(actionResult);
    } else if(theme === "dark") {
      actionResult = setThemeLight();
      themeDispatch(actionResult);
    }
   }
   function handleAddToCart(product){
    // pas 1 apelez actiunea cu payload aferent
    const actionResult = addToCart(product);
    cartDispatch(actionResult);
   }
   function handleAddToFavorites(product) {
    const actionResult = addToFavorites(product); 
    favoritesDispatch(actionResult); 
  }
  // Afisam pe ecran produsele venite de la API.
  return (
    <div className={theme === 'light' ? 'bg-light' :'bg-dark'}>
      <div className="d-flex flex-column align-items-center">
        {/* adaug buton care sa modifice tema */}
        <Button variant='primary' className='mt-3' onClick={handleThemeChange}>Change theme</Button>
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
              {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url. */}
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button variant="primary" className="p-2" onClick={() => {
                handleAddToCart({
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice,
                });
              }}>Adaugă în coș</Button>
              <Button variant='secondary' className="p-2" onClick={() => {
                handleAddToFavorites({ 
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice,
                });
              }}>Adaugă la favorite</Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
