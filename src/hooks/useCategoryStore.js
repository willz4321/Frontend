import React, { useCallback } from 'react'
import { systemApi } from '../api';
import Swal from 'sweetalert2';

export const useCategoryStore = (state, setState) => {

  const getCategories = useCallback((categories) => {
    setState(prevState => ({
        ...prevState,
        categories
      }));
  },[setState]) 

  const pushCategories = useCallback((category) => {
    setState(prevState => ({
        ...prevState,
        categories: [...prevState.categories, category]
      }));
  },[setState])
 
  const editCategories = useCallback((editCategory) => {
    setState(prevState => ({
        ...prevState,
        categories: prevState.categories.map(category => 
            category.id === editCategory.id ? editCategory : category
          )
      }))
  },[setState])

  const deleteCategories = useCallback((categoryIdToDelete) => {
    setState(prevState => ({
      ...prevState,
      categories: prevState.categories.filter(category => category.id !== categoryIdToDelete)
    }));
  }, [setState]);
  

  const starGetCategories = useCallback( async() => {
         try {
            const { data } = await systemApi.get('Categories');
            getCategories(data)
         } catch (error) {
          Swal.fire({
            title: 'Error',
            text: `Error al cargar las categorías: ${error}`,
            icon: 'error',
            customClass: {
              container: 'swal2-container'
            }
          });
         }
  },[getCategories])

  const starAddCategory = useCallback( async(categoria) => {
    try {
          const { data } = await systemApi.post('Categories', categoria);
          pushCategories(data)
          Swal.fire({
            title: 'Perfecto',
            text: 'Categoría creado con éxito',
            icon: 'success',
            customClass: {
              container: 'swal2-container'
            }
          });              
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: `Error al guardar la categoría: ${error}`,
            icon: 'error',
            customClass: {
              container: 'swal2-container'
            }
          });
        }
  },[pushCategories])

  const starEditeCategory = useCallback( async(categoria) => {
      try {
        const { data } = await systemApi.put(`Categories/${categoria.id}`, categoria);
        editCategories(data)
        Swal.fire({
          title: 'Perfecto',
          text: 'Categoría editada con éxito',
          icon: 'success',
          customClass: {
            container: 'swal2-container'
          }
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: `Error al editar la categoria: ${error}`,
          icon: 'error',
          customClass: {
            container: 'swal2-container'
          }
        });
      }
  },[editCategories])
 
  const starDeleteCategory = useCallback( async(categoria) => {
    try {
        await systemApi.delete(`Categories/${categoria.id}`);
        deleteCategories(categoria.id)
        Swal.fire({
          title: 'Perfecto',
          text: 'Categoría eliminada con éxito',
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
  },[deleteCategories]) 
  return {
    categories: state.categories,

    starDeleteCategory,
    starGetCategories,
    starEditeCategory,
    starAddCategory,
  }
}
