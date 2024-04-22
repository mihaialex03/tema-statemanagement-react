export function addToFavorites(product){
    return {
        type: "ADD_TO_FAVORITES",
        payload: product
    }
}
export function removeFromFavorites(productID){
    return {
        type:"REMOVE_FROM_FAVORITES",
        payload: productID
    }
}