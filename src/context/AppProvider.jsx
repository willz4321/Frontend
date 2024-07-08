import React, { createContext, useState } from 'react';
import { useAuthStore } from '../hooks';

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    products: [],
    categories: [],
    status: 'not-authenticated',
    errorMenssage: null,
  });

  const setUser = (user) => setState(prevState => ({ ...prevState, user }));
  const setProducts = (products) => setState(prevState => ({ ...prevState, products }));
  const setCategories = (categories) => setState(prevState => ({ ...prevState, categories }));
  const setStatus = (status) => setState(prevState => ({ ...prevState, status }));
  const setErrorMessage = (errorMenssage) => setState(prevState => ({ ...prevState, errorMenssage }));

  // Importa y usa los métodos de useAuthStore
  const authStore = useAuthStore(state, setState);

  return (
    <AppContext.Provider value={{ ...state, setUser, setProducts, setCategories, ...authStore }}>
      {children}
    </AppContext.Provider>
  );
};