export const initialFavoritesState = {
    products: []
};

export function favoritesReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_FAVORITES": {
            const foundProduct = state.products.find(product => product.id === action.payload.id);
            if (foundProduct) {
                return state;
            } else {
                const newProduct = {
                    ...action.payload
                };
                return {
                    products: [...state.products, newProduct]
                };
            }
        }
        case "REMOVE_FROM_FAVORITES": {
            const filteredProducts = state.products.filter(product => product.id !== action.payload);
            return {
                products: filteredProducts
            };
        }
        default: {
            return state;
        }
    }
}
