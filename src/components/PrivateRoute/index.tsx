import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const isLogin = localStorage.getItem('access_token');
  return !!isLogin ? <Outlet /> : <Navigate to={'/signin'} replace={true} />;
}

export default PrivateRoute;
