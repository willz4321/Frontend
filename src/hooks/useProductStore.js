import React, { useCallback } from 'react'
import Swal from 'sweetalert2';
import { systemApi } from '../api';

export const useProductStore = (state, setState) => {

    const getProducts = useCallback((products) => {
        setState(prevState => ({
            ...prevState,
            products
          }));
      },[setState]) 
    
      const pushProducts = useCallback((product) => {
        setState(prevState => ({
            ...prevState,
            products: [...prevState.products, product]
          }));
      },[setState])
     
      const editProducts = useCallback((editProduct) => {
        setState(prevState => ({
            ...prevState,
            products: prevState.products.map(product => 
                product.id === editProduct.id ? editProduct : product
              )
          }))
      },[setState])
    
      const deleteProducts = useCallback((productIdToDelete) => {
        setState(prevState => ({
          ...prevState,
          products: prevState.products.filter(product => product.id !== productIdToDelete.id)
        }));
      }, [setState]);
    
      const starGetProducts = useCallback( async() => {
             try {
                const { data } = await systemApi.get('Products');
                getProducts(data)
             } catch (error) {
              Swal.fire({
                title: 'Error',
                text: `Error al solicitar los productos: ${error}`,
                icon: 'error',
                customClass: {
                  container: 'swal2-container'
                }
              });
              
             }
      },[getProducts])
    
      const starAddProduct = useCallback( async(product) => {
        const {category, ...p} = product
        const producto = {
          ...product,
          categoryId: category.id
        }
        try {
              const { data } = await systemApi.post('Products', producto);
              pushProducts(data)
              Swal.fire({
                title: 'Perfecto',
                text: 'Producto creado con éxito',
                icon: 'success',
                customClass: {
                  container: 'swal2-container'
                }
              });              
            } catch (error) {
              console.log(error)
              Swal.fire({
                title: 'Error al guardar',
                text: `Error al guardar el producto: ${error}`,
                icon: 'error',
                customClass: {
                  container: 'swal2-container'
                }
              });
              
            }
      },[pushProducts])
    
      const starEditeProduct = useCallback( async(producto) => {
          try {
            const { data } = await systemApi.put(`Products/${producto.id}`, producto);
            editProducts(data)
            Swal.fire({
              title: 'Perfecto',
              text: 'Producto editado con éxito',
              icon: 'success',
              customClass: {
                container: 'swal2-container'
              }
            });              
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: `Error al editar el producto: ${error}`,
              icon: 'error',
              customClass: {
                container: 'swal2-container'
              }
            });
            
          }
      },[editProducts])
     
      const starDeleteProduct = useCallback( async(producto) => {
        try {
            await systemApi.delete(`Products/${producto.id}`);
            deleteProducts(producto)
            Swal.fire({
              title: 'Perfecto',
              text: 'Producto eliminado con éxito',
              icon: 'warning',
              customClass: {
                container: 'swal2-container'
              }
            });              
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: `Error al eliminar el producto: ${error}`,
              icon: 'error',
              customClass: {
                container: 'swal2-container'
              }
            });
            
          }
      },[deleteProducts]) 

  return {
     products: state.products,

     starAddProduct,
     starGetProducts,
     starEditeProduct,
     starDeleteProduct,
  }
}
