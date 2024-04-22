// actiunile pe care le identific : adaug si scot din cos
// functia de addToCart trebuie sa aiba ca parametru si produsul ptc eu sa pot sa il trimit mai departe catre reducer(deoarece reducerul o sa imi modifice state ul)
export function addToCart(product){
    return{
        type:"ADD_TO_CART",
        payload: product
    }
}

export function removeFromCart(productId){
    return{
        type: "REMOVE_FROM_CART",
        payload: productId
    }
}