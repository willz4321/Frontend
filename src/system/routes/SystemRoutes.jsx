import { Navigate, Route, Routes } from "react-router-dom"
import { SystemPage, Productos, Categorias, Usuarios, User } from "../pages/"
import MenuApp from "../pages/MenuApp"
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";

export const SystemRoutes = () => {
  const { products, categories, starGetProducts, starGetUsers, starGetCategories, user, users } = useContext(AppContext);
   
   useEffect(() => {
        const fetch = async() => {
           await starGetCategories()
           await starGetProducts()
           if (user.rol == 0 || user.rol == 'ADMIN') {
            await starGetUsers()
           }
        }
        fetch()
   }, [])
   
  return (
    <>
    <MenuApp />
    <Routes>
        <Route path="/" element={ <SystemPage /> } />
        <Route path="/productos" element={ <Productos Productos={products} /> } />
        <Route path="/categorias" element={ <Categorias Categorias={categories} /> } />
        <Route path="/usuarios" element={ <Usuarios usuarios={users} /> } />
        <Route path="/perfil" element={ <User /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
    </> 
  )
}
