import { Navigate, Route, Routes } from "react-router-dom"
import { SystemPage, Productos, Categorias, Usuarios, User } from "../pages/"
import MenuApp from "../pages/MenuApp"

export const SystemRoutes = () => {
  return (
    <>
    <MenuApp />
    <Routes>
        <Route path="/" element={ <SystemPage /> } />
        <Route path="/productos" element={ <Productos /> } />
        <Route path="/categorias" element={ <Categorias /> } />
        <Route path="/usuarios" element={ <Usuarios /> } />
        <Route path="/perfil" element={ <User /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
    </> 
  )
}
