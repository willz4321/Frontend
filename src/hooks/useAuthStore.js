import { useCallback } from 'react';
import Swal from 'sweetalert2';
import { authApi } from '../api';

export const useAuthStore = (state, setState) => {

  const onLogin = useCallback((user) => {
    setState(prevState => ({
      ...prevState,
      status: 'authenticated',
      user,
      errorMenssage: null,
    }));
  }, [setState]);

  const onLogout = useCallback((error) => {
    setState(prevState => ({
      ...prevState,
      status: 'not-authenticated',
      user: null,
      errorMenssage: error,
    }));
    setTimeout(() => {
      setState(prevState => ({ ...prevState, errorMenssage: null }));
    }, 10);
  }, [setState]);

  const startLogin = useCallback(async ({ correo, password }) => {
    try {
      const { data } = await authApi.post('login', { correo, password });
      localStorage.setItem('x-token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      onLogin({
        id: data.id,
        name: data.userName,
        email: data.correo,
        rol: data.rol,
        edad: data.edad,
        avatar: data.avatar,
      });
    } catch (error) {
      console.log(error);
      onLogout(error.response.data);
    }
  }, [onLogin, onLogout]);

  const startRegister = useCallback(async ({ Nombre, Correo, Password, Edad }) => {
    try {
      const response = await authApi.post('register', { Nombre, Correo, Password, Edad });
      Swal.fire('Registro exitoso', 'Usuario registrado correctamente', 'success');
      console.log(response.data)
      console.log(response.data.user)
      await startLogin(response.data.user); 

    } catch (error) {
      console.error('Error en el registro:', error);
      Swal.fire('Error', 'Hubo un error al registrar el usuario', 'error');
    }
  }, [startLogin]);
  const checkAuthToken = useCallback(async () => {
    const token = localStorage.getItem('x-token');
    if (!token) return onLogout();

    try {
      const { data } = await authApi.get('renew');
      localStorage.setItem('x-token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      let nacimiento = data.nacimiento.join('-');
      onLogin({
        id: data.id,
        name: data.userName,
        apellido: data.apellido,
        email: data.correo,
        rol: data.rol,
        edad: data.edad,
        nacimiento: nacimiento,
        avatar: data.avatar,
      });
    } catch (error) {
      console.log(error);
      localStorage.clear();
      onLogout();
    }
  }, [onLogin, onLogout]);

  return {
    status: state.status,
    user: state.user,
    errorMenssage: state.errorMenssage,

    startLogin,
    startRegister,
    checkAuthToken,
    onLogout,
  };
};
