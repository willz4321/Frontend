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
 
  const getUsers = useCallback((users) => {
    setState(prevState => ({
      ...prevState,
      users
    }));
  })

  const pushUser = useCallback((user) => {
    setState(prevState => ({
      ...prevState,
      users: [...prevState.users, user]
    }));
  }, [setState])

  const editUsers = useCallback((editUser) => {
    setState(prevState => ({
        ...prevState,
        users: prevState.users.map(user => 
          user.id === editUser.id ? editUser : user
          )
      }))
  },[setState])

  const editMyUser = useCallback((editUser) => {
    setState(prevState => ({
        ...prevState,
        user: editUser,
        users: prevState.users.map(user => 
          user.id === editUser.id ? editUser : user
          )
      }))
  },[setState])

  const deleteUsers = useCallback((userDelete) => {
    setState(prevState => ({
      ...prevState,
      users: prevState.users.filter(user => user.id !== userDelete)
    }));
  }, [setState]);
  
  const starGetUsers = useCallback(async () => {
      try {
        const {data} = await authApi.get('users')
        getUsers(data)
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: `Error  los usuarios: ${error}`,
          icon: 'error',
          customClass: {
            container: 'swal2-container'
          }
        });
      }
  },[getUsers])

  const startLogin = useCallback(async ({ Correo, Password }) => {
    try {
      const { data } = await authApi.post('login', { correo: Correo , password: Password });
      localStorage.setItem('x-token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      onLogin({
        id: data.user.id,
        nombre: data.user.nombre,
        correo: data.user.correo,
        rol: data.user.rol,
        edad: data.user.edad,
        avatar: data.user.avatar,
      });
    } catch (error) {
      onLogout(error.response.data);
    }
  }, [onLogin, onLogout]);

  const startRegister = useCallback(async ({ Nombre, Correo, Password, Edad }) => {
    try {
      await authApi.post('register', { Nombre, Correo, Password, Edad, Avatar: '' });
      Swal.fire('Registro exitoso', 'Usuario registrado correctamente', 'success');
      await startLogin({Correo, Password}); 
    } catch (error) {
      Swal.fire('Error', `Hubo un error al registrar el usuario: ${error.response.data}`, 'error');
    }
  }, [startLogin]);

  const startCreateUser = useCallback(async ({ nombre, correo, password, edad, rol }) => {
    try {
     const {data} = await authApi.post('create', { nombre, correo, password, edad, Avatar: '', rol });
     Swal.fire({
      title: 'Perfecto',
      text: `Usuario creado con exito`,
      icon: 'success',
      customClass: {
        container: 'swal2-container'
      }
    });
       pushUser(data); 
    } catch (error) {
      Swal.fire('Error', `Hubo un error al registrar el usuario: ${error.response.data}`, 'error');
    }
  }, [pushUser]);

  const startEditUser = useCallback(async (usuario) => {
    try {
     const {data} = await authApi.put(`edituser/${usuario.id}`, usuario);
     Swal.fire({
      title: 'Perfecto',
      text: `Usuario editado con éxito`,
      icon: 'success',
      customClass: {
        container: 'swal2-container'
      }
    });
      editUsers(data); 
    } catch (error) {
      Swal.fire('Error', `Hubo un error al editar el usuario: ${error.response.data}`, 'error');
    }
  }, [editUsers]);

  const startEditMyUser = useCallback(async (usuario) => {
    try {
     const {data} = await authApi.put(`editmyuser/${usuario.id}`, {...usuario, password:''});
     Swal.fire({
      title: 'Perfecto',
      text: `Editaste tu Usuario`,
      icon: 'success',
      customClass: {
        container: 'swal2-container'
      }
    });
     editMyUser(data); 
    } catch (error) {
      console.log(error)
      Swal.fire('Error', `Hubo un error al editar tu usuario: ${error.response.data}`, 'error');
    }
  }, [editMyUser]);
 
  const starDeleteUser = useCallback( async(usuario) => {
    try {
        await authApi.delete(`deleteuser/${usuario.id}`);
        deleteUsers(usuario.id)
        Swal.fire({
          title: 'Perfecto',
          text: 'Usuario eliminada con éxito',
          icon: 'warning',
          customClass: {
            container: 'swal2-container'
          }
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: `Error al eliminar la categoria: ${error}`,
          icon: 'error',
          customClass: {
            container: 'swal2-container'
          }
        });  
      }
  },[deleteUsers]) 

  const checkAuthToken = useCallback(async () => {
    const token = localStorage.getItem('x-token');
    if (!token) return onLogout();
  
    try {
      const { data } = await authApi.get('renew');
      localStorage.setItem('x-token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      onLogin({
        id: data.user.id,
        nombre: data.user.nombre,
        correo: data.user.correo,
        rol: data.user.rol,
        edad: data.user.edad,
        avatar: data.user.avatar,
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
    users: state.users,
    
    startLogin,
    startRegister,
    starDeleteUser,
    startCreateUser,
    startEditMyUser,
    checkAuthToken,
    startEditUser,
    starGetUsers,
    onLogout,
  };
};
