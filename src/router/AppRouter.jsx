import React, { useContext, useEffect, useState } from 'react'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { SystemRoutes } from '../system/routes/SystemRoutes'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

export const AppRouter = () => {
  const { state, checkAuthToken } = useContext(AppContext);
  const [status, setStatus] = useState('not-authenticated');

  useEffect(() => {
    setStatus(state.status);
  }, [state]);

  useEffect(() => {
    checkAuthToken()
  }, [])
  
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
