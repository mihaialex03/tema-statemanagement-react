import React, { useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
import { initialThemeState, themeReducer } from "./store/Theme/reducer";
import { ThemeContext } from "./store/Theme/context";
import { cartReducer, initialCartState } from "./store/Cart/reducer";
import { CartContext } from "./store/Cart/context";
import {
  favoritesReducer,
  initialFavoritesState,
} from "./store/Favorites/reducer";
import { FavoritesContext } from "./store/Favorites/context";
import { Favorites } from "./pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: "/favorites",
    element: (
      <>
        <Header />
        <Favorites />
      </>
    ),
  },
]);

export default function App() {
  // initializez reducerul pt tema
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    initialFavoritesState
  );
  // initializez reducerul pentru cosul de cumparaturi
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const themeContextValue = {
    themeState,
    themeDispatch,
  };
  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };
  const cartContextValue = {
    cartState,
    cartDispatch,
  };
  return (
    // fac disponibil catre toata aplicatia mea state-urile globale: state pt tema
    <FavoritesContext.Provider value={favoritesContextValue}>
      <CartContext.Provider value={cartContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="App primary">
            <RouterProvider router={router} />
          </div>
        </ThemeContext.Provider>
      </CartContext.Provider>
    </FavoritesContext.Provider>
  );
}
