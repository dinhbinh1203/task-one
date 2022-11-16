import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const DefaultRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem('current-user'));
  return currentUser ? <Navigate to="/" /> : <Outlet />;
};
