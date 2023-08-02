import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function UnprivateRoute() {
  const isLogin = localStorage.getItem('access_token');
  return !isLogin ? <Outlet /> : <Navigate to={'/todo'} replace={true} />;
}

export default UnprivateRoute;
