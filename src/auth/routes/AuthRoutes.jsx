import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, ResetPasswordPage } from '../pages';


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/reset-password" element={ <ResetPasswordPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />

        <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
