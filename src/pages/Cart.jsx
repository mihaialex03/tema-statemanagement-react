import React, { useContext } from 'react';
import { CartContext } from '../store/Cart/context';
import { removeFromCart } from '../store/Cart/actions';
import { Button } from 'react-bootstrap';

export function Cart() {
  // extrag state ul global de cart si functia care il modifica state ul de cart
  const { cartState, cartDispatch } = useContext(CartContext);
  function handleProductRemove(productId){
    // apelez actiunea de stergere a produsului
    const actionResult = removeFromCart(productId);
    cartDispatch(actionResult);
  } 
  
  return (
    <div className='mx-2'>
      {/* afisam continutul state ului global de cart */}
      { cartState.products.length === 0 ? (
        <p>Nu sunt produse in cos</p>
      ) : (
        cartState.products.map((product)=>{
          
          const totalProductPrice = product.price * product.quantity;
          
          return(
            <div key={product.id} className='m-3'>
              <div className='d-flex align-items justify-content-between mx-4'>
              <img src={product.image} alt="" />
              <strong>{product.name}</strong>
              <p>
                Pret: {product.price}$ x Cantitate: {product.quantity} = {totalProductPrice}$
                
              </p>
              <Button variant='danger' onClick={()=>{
                handleProductRemove(product.id)
              }}>Remove</Button>
              </div>
            </div>
          )
        })
      )}
    </div>
  );
}
