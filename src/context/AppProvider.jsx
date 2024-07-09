import React, { createContext, useState } from 'react';
import { useAuthStore, useCategoryStore, useProductStore } from '../hooks';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    users:[],
    products: [],
    categories: [],
    status: 'not-authenticated',
    errorMessage: null,
  });

  const setUser = (user) => setState((prevState) => ({ ...prevState, user }));
  const setProducts = (products) => setState((prevState) => ({ ...prevState, products }));
  const setCategories = (categories) => setState((prevState) => ({ ...prevState, categories }));
  const setStatus = (status) => setState((prevState) => ({ ...prevState, status }));
  const setErrorMessage = (errorMessage) => setState((prevState) => ({ ...prevState, errorMessage }));

  // Importa y usa los métodos de useAuthStore
  const authStore = useAuthStore(state, setState);
  const productStore = useProductStore(state, setState);
  const categoryStore = useCategoryStore(state, setState);

  return (
    <AppContext.Provider value={{ state, setUser, setProducts, setCategories, setStatus, setErrorMessage, ...authStore, ...productStore, ...categoryStore }}>
      {children}
    </AppContext.Provider>
  );
};