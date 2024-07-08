import React from 'react'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { SystemRoutes } from '../system/routes/SystemRoutes'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AppRouter = () => {

    const status = 'not-authenticated'
  return (
    <Routes>
        {
          (status === 'not-authenticated')
            ?  <Route path="/auth/*" element={ <AuthRoutes /> } />
            :  <Route path="/*" element={ <SystemRoutes /> } />
        }
        <Route path="/*" element={ <Navigate to='/auth/login'/> } />
    </Routes>
  )
}
