export const initialCartState = {
  products: [],
};
// definesc reducerul
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      // aici punem logica care trateaza produsul
      let updatedProducts;
      let newState;
      // verific mai intai daca produsul exista deja in cos
      const foundProduct = state.products.find((product) => {
        return product.id === action.payload.id;
      });
      // daca produsul deja exista in cos, ii maresc cantitatea cu 1
      if (foundProduct) {
        updatedProducts = state.products.map((product)=>{
            // ma uit daca produsul iterat este cel pe care l am primit ca payload
            if(foundProduct.id === product.id){
                return {
                    ...product, 
                    quantity: product.quantity + 1
                }
            } else {
                return product;
            }

        })
      } else {
        // daca produsul nu exista in cos, il adaug fara sa modificam state ul curent
        const newProduct = {
            ...action.payload,
            quantity: 1
        };
        updatedProducts = [...state.products, newProduct ];
      }
      newState = {
        products: updatedProducts
      }
      return newState;
    }
    case "REMOVE_FROM_CART":{
        // pt a sterge un produs din cos, filtram din state ul curent de products produsul care are id ul primit pe payload
        const filterProducts = state.products.filter((product)=>{
            return product.id !== action.payload;
        })
        const newState ={
            products: filterProducts
        }
        return newState;
    }
    default:{
        return state;
    }
  }
}
